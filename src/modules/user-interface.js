import { format } from 'date-fns'
import Storage from './storage'
import Project from './project'
import Task from './task'

export default class userInterface {
  static loadHomePage() {
    userInterface.loadProjects()
    userInterface.initStaticButtons()
    userInterface.initDropdownMenus()
    userInterface.initTaskCollapse()
    // userInterface.openProject('General', document.querySelector('.project-list').firstElementChild)
    userInterface.openProject('Todo List', document.querySelector('.project-list').children[2]) // Remove
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
      .forEach(task => {
        if (projectName === 'Today' || projectName === 'This week') {
          const OriginProjectName = userInterface.getOriginProjectByTaskUUID(task.getUUID()).getName()
          userInterface.createTask(task.name, task.description, task.priority, task.dueDate, OriginProjectName)
        } else {
          userInterface.createTask(task.name, task.description, task.priority, task.dueDate, projectName)
        }
      })
  }

  static getOriginProjectByTaskUUID(taskUUID) {
    let originProject

    Storage.getTodoList()
      .getProjects()
      .forEach(project => {
        if (project.getName() !== 'Today' && project.getName() !== 'This week' && project.getTaskByUUID(taskUUID)) {
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

    userInterface.initProjectButtons()
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

    if (priority === 'low') taskPriority.style.color = '#112ba9'
    else if (priority === 'normal') taskPriority.style.color = '#17642f'
    else if (priority === 'high') taskPriority.style.color = '#bb0000'

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

    if (description === null) {
      article.append(checkbox, taskName, dropdown, content, priorityDiv, projectNameP)
    } else {
      article.append(checkbox, collapseBtn, taskName, dropdown, content, priorityDiv, projectNameP)
    }

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

    const mainContent = document.querySelector('.main-content')
    mainContent.appendChild(addTaskForm)

    userInterface.initAddTaskFormButtons()
  }

  static removeAddTaskForm() {
    const addTaskForm = document.querySelector('.add-task-form')
    addTaskForm.remove()
  }

  static initAddTaskFormButtons() {
    const cancelBtn = document.querySelector('.add-task-form-cancel-btn')
    const addTaskBtn = document.querySelector('.add-task-form-add-btn')

    cancelBtn.addEventListener('click', userInterface.exitAddTaskForm)
    addTaskBtn.addEventListener('click', userInterface.addTask)
  }

  static exitAddTaskForm() {
    userInterface.removeAddTaskForm()
    userInterface.showAddTaskButton()
  }

  // static handleAddTaskFormAddButton() {
  //   userInterface.addTask()
  // }

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

  static clearProjects() {
    const projectList = document.querySelector('.project-list')
    const addProject = `
    <li class="add-project">
      <img src="images/plus.png" alt="Add" height="19" width="19">
      Add New
    </li>
    `
    projectList.innerHTML = addProject
  }

  static initDropdownMenus() {
    const contentContainer = document.querySelector('#content')

    contentContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('drop-btn')) {
        userInterface.handleDropdowns(e)
      }
    }, true)

    window.addEventListener('click', userInterface.closeAllDropdowns)
  }

  static initTaskCollapse() {
    const tasksContainer = document.querySelector('.tasks-container')

    tasksContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('collapse-btn')) {
        userInterface.handleTaskCollapseButton(e)
      }
    })
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

    // Prevent event from being fired on the project button underneath the dropdown button
    e.stopImmediatePropagation()
    e.stopPropagation()
  }

  static closeAllDropdowns(e) {
    // Close the dropdown menu if the user clicks outside of it
    if (!e.target.matches('.drop-btn')) {
      const dropdowns = document.getElementsByClassName('dropdown-content')
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i]
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show')
        }
      }
    }
  }

  static initStaticButtons() {
    const todayBtn = document.querySelector('.today-tab')
    const weekBtn = document.querySelector('.week-tab')
    const addProjectBtn = document.querySelector('.add-project')
    const addTaskBtn = document.querySelector('.add-task-btn')

    todayBtn.addEventListener('click', userInterface.openTodayProject)
    weekBtn.addEventListener('click', userInterface.openWeekProject)
    addProjectBtn.addEventListener('click', userInterface.openProjectModal.bind(this, 'add'))
    addTaskBtn.addEventListener('click', userInterface.handleAddTaskButton)
  }

  static handleAddTaskButton() {
    userInterface.hideAddTaskButton()
    userInterface.createAddTaskForm()
  }

  static hideAddTaskButton() {
    const addTaskBtn = document.querySelector('.add-task-btn')
    addTaskBtn.classList.add('hidden')
  }

  static showAddTaskButton() {
    const addTaskBtn = document.querySelector('.add-task-btn')
    addTaskBtn.classList.remove('hidden')
  }

  static initProjectButtons() {
    const projectBtns = document.querySelectorAll('.project-btn')

    projectBtns.forEach(btn =>
      btn.addEventListener('click', userInterface.handleProjectButton)
    )
  }

  static initModalEvents() {
    const modalCancelBtn = document.querySelector('.modal-cancel-btn')
    const modalAddProjectBtn = document.querySelector('.modal-add-project-btn')
    const modalProjectNameInput = document.querySelector('#modal-project-name-input')

    modalCancelBtn.addEventListener('click', userInterface.closeProjectModal)
    modalAddProjectBtn.addEventListener('click', userInterface.handleAddProjectButton)
    modalProjectNameInput.addEventListener('input', userInterface.removeModalErrorMessage)
  }

  static createModalContent(modalType) { // modalType: String, 'add' or 'edit'
    const modalContent = document.querySelector('.modal-content')

    const heading = document.createElement('h3')

    const modalInputContainer = document.createElement('div')
    modalInputContainer.classList.add('modal-input-container')

    const projectNameInput = document.createElement('input')
    projectNameInput.type = 'text'
    projectNameInput.name = 'modal-project-name'
    projectNameInput.id = 'modal-project-name-input'
    projectNameInput.maxLength = 40

    const modalErrorSpan = document.createElement('span')
    modalErrorSpan.classList.add('modal-error')

    const modalButtonsContainer = document.createElement('div')
    modalButtonsContainer.classList.add('modal-buttons')

    const cancelButton = document.createElement('button')
    cancelButton.classList.add('modal-cancel-btn')
    cancelButton.textContent = 'Cancel'

    const addProjectButton = document.createElement('button')
    addProjectButton.classList.add('modal-add-project-btn')

    if (modalType === 'add') {
      heading.textContent = 'Add new project'
      projectNameInput.placeholder = 'Project name'
      addProjectButton.textContent = 'Add project'
    } else if (modalType === 'edit') {
      heading.textContent = 'Edit project'
      projectNameInput.placeholder = 'New project name'
      addProjectButton.textContent = 'Edit project'
    }

    modalInputContainer.append(projectNameInput, modalErrorSpan)
    modalButtonsContainer.append(cancelButton, addProjectButton)

    userInterface.clearModalContent()

    modalContent.append(heading, modalInputContainer, modalButtonsContainer)

    userInterface.initModalEvents()
  }

  static clearModalContent() {
    const modalContent = document.querySelector('.modal-content')
    modalContent.innerHTML = ''
  }

  static openProjectModal(modalType) {
    const dialog = document.querySelector('.modal')

    userInterface.createModalContent(modalType)
    dialog.showModal()
  }

  static closeProjectModal() {
    const dialog = document.querySelector('.modal')

    dialog.close()
  }

  static handleAddProjectButton() {
    const modalProjectNameInputValue = document.querySelector('#modal-project-name-input').value

    if (!userInterface.validateModalProjectName(modalProjectNameInputValue)) return

    userInterface.addProject(modalProjectNameInputValue)
    userInterface.closeProjectModal()

    const projectBtns = document.querySelectorAll('.project-btn')
    const lastAddedProjectBtn = projectBtns.item(projectBtns.length - 1)

    userInterface.openProject(modalProjectNameInputValue, lastAddedProjectBtn)
  }

  static validateModalProjectName(projectName) {
    const modalErrorSpan = document.querySelector('.modal-error')

    if (projectName === '') {
      modalErrorSpan.textContent = 'Project name cannot be empty!'
      return
    }
    if (Storage.getTodoList().contains(projectName)) {
      modalErrorSpan.textContent = 'Project already exists, please choose a different name!'
      return
    }

    return true
  }

  static removeModalErrorMessage() {
    const modalErrorSpan = document.querySelector('.modal-error')
    modalErrorSpan.textContent = ''
  }

  static handleTaskCollapseButton(e) {
    const content = e.target.parentElement.querySelector('.content')

    if (content.style.maxHeight) {
      e.target.classList.remove('rotate')
      content.style.maxHeight = null
      content.style.marginBottom = null
    } else {
      if (content.childNodes.length !== 0) {
        e.target.classList.add('rotate')
        content.style.maxHeight = content.scrollHeight + 'px'
        content.style.marginBottom = '4px'
      }
    }
  }

  static openProject(projectName, projectButton) {
    const NavBtns = document.querySelectorAll('nav li')

    NavBtns.forEach(btn => btn.classList.remove('active'))
    projectButton.classList.add('active')

    userInterface.loadProjectContent(projectName)

    if (document.querySelector('.add-task-form')) userInterface.removeAddTaskForm()

    if (projectName === 'Today' || projectName === 'This week') {
      userInterface.hideAddTaskButton()
    } else {
      userInterface.showAddTaskButton()
    }

  }

  static addProject(projectName) {
    Storage.addProject(new Project(projectName))
    const newProject = Storage.getTodoList().getProject(projectName)
    userInterface.createProject(newProject.getName(), newProject.getColor())
  }

  static deleteProject(projectName, button) {
    if (projectName === 'General') return
    if (button.classList.contains('active')) {
      userInterface.openProject('General', document.querySelector('.project-list').firstElementChild)
    }

    Storage.deleteProject(projectName)
    userInterface.clearProjects()
    userInterface.loadProjects()
  }

  static openTodayProject() {
    Storage.updateTodayProject()
    userInterface.openProject('Today', this)
  }

  static openWeekProject() {
    Storage.updateWeekProject()
    userInterface.openProject('This week', this)
  }

  static handleProjectButton(e) {
    // Pressing the dropdown edit or delete makes this trigger
    if (e.target.classList.contains('dropdown-edit') || e.target.classList.contains('dropdown-delete')) return

    const projectName = e.target.querySelector('p').textContent
    userInterface.openProject(projectName, this)
  }

  static validateAddTaskForm(formType, taskElement = null) { // formType: String, 'add' or 'edit'
    const projectName = document.querySelector('.main-heading').textContent
    const taskName = document.querySelector('#add-task-form-task-name').value
    let taskDescription = document.querySelector('#add-task-form-description').value

    if (taskName === '') {
      // make 'task name cannot be empty' error message
      return
    }

    if (formType === 'add') {
      if (Storage.getTodoList().getProject(projectName).getTask(taskName)) {
        // make 'task name already exists' error message
        console.error('Task name already exists')
        return
      }
    } else if (formType === 'edit') {
      // get original task name from TaskElement and only approve same task name if it's the same task being edited
    }
    return true
  }

  static addTask() {
    const projectName = document.querySelector('.main-heading').textContent
    const taskName = document.querySelector('#add-task-form-task-name').value
    const taskPriority = document.querySelector('#priority-dropdown').value
    let taskDescription = document.querySelector('#add-task-form-description').value
    let taskDueDate = document.querySelector('#add-task-form-due-date').value

    if (taskDescription === '') taskDescription = null
    if (taskDueDate === '') taskDueDate = 'No due date'

    if (!userInterface.validateAddTaskForm('add')) return

    Storage.addTask(projectName, new Task(taskName, taskDescription, taskPriority, taskDueDate))

    userInterface.createTask(taskName, taskDescription, taskPriority, taskDueDate, projectName)

    userInterface.exitAddTaskForm()
  }
}