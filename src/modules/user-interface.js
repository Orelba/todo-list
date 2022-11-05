import { format } from 'date-fns'
import Storage from './storage'
import Project from './project'
import Task from './task'

export default class userInterface {
  static loadHomePage() {
    userInterface.loadProjects()
    userInterface.initButtons()
    userInterface.initDropdownMenus()
  }

  static loadProjects() {
    Storage.getTodoList()
      .getProjects()
      .forEach(project => {
        if (project.name !== 'Today' && project.name !== 'This week') {
          userInterface.createProject(project.name, project.color)
        }
      })
  }

  static loadTasks(projectName) {
    Storage.getTodoList()
      .getProject(projectName)
      .getTasks()
      .forEach(task =>
        userInterface.createTask(task.name, task.description, task.priority, task.dueDate, projectName)
      )
  }

  static getOriginProjectByTaskName(taskName) {
    let originProject

    Storage.getTodoList()
      .getProjects()
      .forEach(project => {
        if ((project.getName() !== 'Today' || project.getName() !== 'This week') && project.getTask(taskName)) {
          originProject = project
        }
      })

    return originProject
  }

  static getDateFormatted(date) {
    if (date !== 'No due date') {
      const year = date.split('-')[0]
      const month = date.split('-')[1]
      const day = date.split('-')[2]
      date = format(new Date(year, month - 1, day), 'PPP')
    }
    return date
  }

  static loadProjectContent(projectName) {
    const mainHeading = document.querySelector('.main-heading')
    mainHeading.textContent = projectName

    const tasksContainer = document.querySelector('.tasks-container')
    tasksContainer.innerHTML = ''

    const tasksHeading = document.createElement('h2')
    tasksHeading.textContent = 'Tasks'

    tasksContainer.appendChild(tasksHeading)

    userInterface.loadTasks(projectName)
  }

  static createProject(name, color) {
    const li = document.createElement('li')
    li.classList.add('project-btn')

    const bulletpoint = document.createElement('span')
    bulletpoint.classList.add('bulletpoint')
    bulletpoint.style.backgroundColor = color

    const projectNameP = document.createElement('p')
    projectNameP.textContent = name

    if (name !== 'General') {
      const dropdown = userInterface.createDropdown('vertical')
      li.append(bulletpoint, projectNameP, dropdown)
    } else {
      li.append(bulletpoint, projectNameP)
    }

    const projectList = document.querySelector('.project-list')
    const addNewProjectBtn = document.querySelector('.add-project')

    projectList.insertBefore(li, addNewProjectBtn)
  }

  static createTask(name, description, priority, dueDate, projectName) {
    const tasksContainer = document.querySelector('.tasks-container')

    const article = document.createElement('article')
    article.classList.add('task')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.name = 'task-checkbox'
    checkbox.id = 'task-checkbox'

    const collapseBtn = document.createElement('button')
    collapseBtn.classList.add('collapse-btn')

    const collapseBtnIcon = document.createElement('img')
    collapseBtnIcon.src = 'images/chevron-down.svg'
    collapseBtnIcon.alt = 'Collapse'
    collapseBtnIcon.height = 20
    collapseBtnIcon.width = 20

    collapseBtn.appendChild(collapseBtnIcon)

    const taskName = document.createElement('h3')
    taskName.classList.add('task-name')
    taskName.textContent = name

    const dropdown = userInterface.createDropdown('horizontal')

    const content = document.createElement('div')
    content.classList.add('content')
    content.textContent = description

    const priorityDiv = document.createElement('div')
    priorityDiv.classList.add('priority')

    const taskPriority = document.createElement('p')
    taskPriority.classList.add('task-priority')
    taskPriority.textContent = `${priority} priority`

    const taskDueDate = document.createElement('p')
    taskDueDate.classList.add('task-due-date')
    taskDueDate.textContent = userInterface.getDateFormatted(dueDate)

    priorityDiv.append(taskPriority, taskDueDate)

    const projectNameP = document.createElement('p')
    projectNameP.classList.add('task-project-name')
    projectNameP.textContent = projectName

    const projectBulletpoint = document.createElement('span')
    const projectColor = Storage.getTodoList().getProject(projectName).getColor()
    projectBulletpoint.classList.add('bulletpoint')
    projectBulletpoint.style.backgroundColor = projectColor

    projectNameP.appendChild(projectBulletpoint)

    article.append(checkbox, collapseBtn, taskName, dropdown, content, priorityDiv, projectNameP)

    tasksContainer.appendChild(article)
  }

  static createAddTaskForm() {
    const addTaskForm = document.createElement('div')
    addTaskForm.classList.add('add-task-form')

    const taskNameInput = document.createElement('input')
    taskNameInput.type = 'text'
    taskNameInput.name = 'add-task-form-task-name'
    taskNameInput.id = 'add-task-form-task-name'
    taskNameInput.placeholder = 'Task name'

    const descriptionTextArea = document.createElement('textarea')
    descriptionTextArea.name = 'add-task-form-description'
    descriptionTextArea.id = 'add-task-form-description'
    descriptionTextArea.cols = 30
    descriptionTextArea.rows = 4
    descriptionTextArea.placeholder = 'Description'

    const dateAndPriorityContainerDiv = document.createElement('div')
    dateAndPriorityContainerDiv.classList.add('date-and-priority')

    const dateInput = document.createElement('input')
    dateInput.type = 'date'
    dateInput.name = 'add-task-form-due-date'
    dateInput.id = 'add-task-form-due-date'

    const priorityDropdownContainerDiv = document.createElement('div')
    priorityDropdownContainerDiv.classList.add('priority-dropdown-container')

    const priorityIcon = document.createElement('img')
    priorityIcon.src = 'images/priority.png'
    priorityIcon.alt = 'Priority'
    priorityIcon.height = 19
    priorityIcon.width = 19

    const selectDropdown = document.createElement('select')
    selectDropdown.name = 'priority-dropdown'
    selectDropdown.id = 'priority-dropdown'

    const selectOptionLow = document.createElement('option')
    selectOptionLow.value = 'low'
    selectOptionLow.textContent = 'Low'

    const selectOptionNormal = document.createElement('option')
    selectOptionNormal.value = 'normal'
    selectOptionNormal.textContent = 'Normal'
    selectOptionNormal.selected = true

    const selectOptionHigh = document.createElement('option')
    selectOptionHigh.value = 'high'
    selectOptionHigh.textContent = 'High'

    selectDropdown.append(selectOptionLow, selectOptionNormal, selectOptionHigh)

    priorityDropdownContainerDiv.append(priorityIcon, selectDropdown)

    dateAndPriorityContainerDiv.append(dateInput, priorityDropdownContainerDiv)

    const bottomContainerDiv = document.createElement('div')
    bottomContainerDiv.classList.add('add-task-form-bottom-container')

    const formButtonsDiv = document.createElement('div')
    formButtonsDiv.classList.add('add-task-form-buttons')

    const cancelButton = document.createElement('button')
    cancelButton.classList.add('add-task-form-cancel-btn')
    cancelButton.textContent = 'Cancel'

    const addButton = document.createElement('button')
    addButton.classList.add('add-task-form-add-btn')
    addButton.textContent = 'Add task'

    formButtonsDiv.append(cancelButton, addButton)

    bottomContainerDiv.appendChild(formButtonsDiv)

    addTaskForm.append(taskNameInput, descriptionTextArea, dateAndPriorityContainerDiv, bottomContainerDiv)

    return addTaskForm
  }

  static createDropdown(iconType) {
    const dropdown = document.createElement('div')
    dropdown.classList.add('dropdown')

    const dropButton = document.createElement('button')
    dropButton.classList.add('drop-btn')

    const buttonIcon = document.createElement('img')
    if (iconType === 'vertical') buttonIcon.src = 'images/three-dots.svg'
    else if (iconType === 'horizontal') buttonIcon.src = 'images/three-dots-horizontal.svg'
    buttonIcon.alt = 'Dropdown Menu'
    buttonIcon.height = 15
    buttonIcon.width = 15

    dropButton.appendChild(buttonIcon)

    const dropdownContent = document.createElement('div')
    dropdownContent.classList.add('dropdown-content')

    const editBtnDiv = document.createElement('div')
    editBtnDiv.classList.add('dropdown-edit')

    const editBtnIcon = document.createElement('img')
    editBtnIcon.src = 'images/pen.svg'
    editBtnIcon.alt = 'Edit'
    editBtnIcon.height = 13
    editBtnIcon.width = 13

    const editBtnText = document.createElement('p')
    editBtnText.textContent = 'Edit'

    editBtnDiv.append(editBtnIcon, editBtnText)

    const deleteBtnDiv = document.createElement('div')
    deleteBtnDiv.classList.add('dropdown-delete')

    const deleteBtnIcon = document.createElement('img')
    deleteBtnIcon.src = 'images/trash.svg'
    deleteBtnIcon.alt = 'Delete'
    deleteBtnIcon.height = 13
    deleteBtnIcon.width = 13

    const deleteBtnText = document.createElement('p')
    deleteBtnText.textContent = 'Delete'

    deleteBtnDiv.append(deleteBtnIcon, deleteBtnText)

    dropdownContent.append(editBtnDiv, deleteBtnDiv)

    dropdown.append(dropButton, dropdownContent)

    return dropdown
  }

  static initDropdownMenus() {
    const dropdownBtns = document.querySelectorAll('.drop-btn')

    dropdownBtns.forEach(btn =>
      btn.addEventListener('click', userInterface.handleDropdowns)
    )
    window.addEventListener('click', userInterface.closeAllDropdowns)
  }

  static handleDropdowns(e) {
    // Show dropdown
    const dropdownContent = e.target.parentElement.querySelector('.dropdown-content')
    dropdownContent.classList.toggle('show')

    // Close all other open dropdown menus
    const openDropdownMenus = document.querySelectorAll('.show')
    openDropdownMenus.forEach(menu => {
      if (menu !== dropdownContent)
        menu.classList.remove('show')
    })
  }

  static closeAllDropdowns(e) {
    // Close the dropdown menu if the user clicks outside of it
    if (!e.target.matches('.drop-btn')) { // && !e.target.parentNode.contains('.dropdown-content')
      const dropdowns = document.getElementsByClassName('dropdown-content')
      // console.log(e.target)
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i]
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show')
        }
      }
    }
  }

  static initButtons() {
    const todayBtn = document.querySelector('.today-tab')
    const weekBtn = document.querySelector('.week-tab')

    todayBtn.addEventListener('click', userInterface.openTodayProject)
    weekBtn.addEventListener('click', userInterface.openWeekProject)
  }

  static initTaskButtons() {
    const collapseBtns = document.querySelectorAll('.collapse-btn')

    collapseBtns.forEach(btn =>
      btn.addEventListener('click', userInterface.handleTaskCollapseButton)
    )
  }

  static handleTaskCollapseButton() {
    const content = this.parentElement.querySelector('.content')

    if (content.style.maxHeight) {
      this.classList.remove('rotate')
      content.style.maxHeight = null
      content.style.marginBottom = null
    } else {
      if (content.childNodes.length !== 0) {
        this.classList.add('rotate')
        content.style.maxHeight = content.scrollHeight + 'px'
        content.style.marginBottom = '4px'
      }
    }
  }

  static hideAddTaskButton() {
    const addTaskBtn = document.querySelector('.add-task-btn')
    addTaskBtn.classList.add('hidden')
  }

  static showAddTaskButton() {
    const addTaskBtn = document.querySelector('.add-task-btn')
    addTaskBtn.classList.remove('hidden')
  }

  static openProject(projectName, projectButton) {
    const NavBtns = document.querySelectorAll('nav li')

    NavBtns.forEach(btn => btn.classList.remove('active'))
    projectButton.classList.add('active')

    userInterface.loadProjectContent(projectName)

    if (projectName === 'Today' || projectName === 'This week') {
      userInterface.hideAddTaskButton()
    } else {
      userInterface.showAddTaskButton()
    }

    userInterface.initTaskButtons()
  }

  static openTodayProject() {
    Storage.updateTodayProject()
    userInterface.openProject('Today', this)
  }

  static openWeekProject() {
    Storage.updateWeekProject()
    userInterface.openProject('This week', this)
  }
}