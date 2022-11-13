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

  static createTaskForm() {
    const taskForm = document.createElement('div')
    taskForm.classList.add('add-task-form')

    const errorField = document.createElement('div')
    errorField.classList.add('add-task-form-error-field', 'hidden')

    const errorIcon = document.createElement('img')
    errorIcon.src = 'images/error-white.svg'
    errorIcon.alt = 'Priority'
    errorIcon.height = 19
    errorIcon.width = 19

    const taskErrorText = document.createElement('p')
    taskErrorText.classList.add('add-task-form-error-text')
    taskErrorText.textContent = 'Task name already exists!'

    errorField.append(errorIcon, taskErrorText)

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

    taskForm.append(errorField, taskNameInput, descriptionTextArea, dateAndPriorityContainerDiv, bottomContainerDiv)

    const mainContent = document.querySelector('.main-content')
    mainContent.appendChild(taskForm)

  }

  static removeTaskForm() {
    const TaskForm = document.querySelector('.add-task-form')
    if (TaskForm) TaskForm.remove()
  }

  static exitTaskForm() {
    const mainHeading = document.querySelector('.main-heading')
    if (mainHeading.textContent !== 'Today' && mainHeading.textContent !== 'This week') {
      userInterface.removeTaskForm()
      userInterface.showAddTaskButton()
    } else {
      userInterface.removeTaskForm()
    }
  }

  static populateEditTaskForm(taskName, taskDescription, taskDueDate, taskPriority) {
    const nameInput = document.querySelector('#add-task-form-task-name')
    const descriptionInput = document.querySelector('#add-task-form-description')
    const dueDateInput = document.querySelector('#add-task-form-due-date')
    const prioritySelect = document.querySelector('#priority-dropdown')
    const actionButton = document.querySelector('.add-task-form-add-btn')

    nameInput.value = taskName
    descriptionInput.value = taskDescription
    if (taskDueDate !== 'No due date') dueDateInput.value = taskDueDate
    prioritySelect.value = taskPriority

    actionButton.textContent = 'Edit task'
  }

  static initAddTaskFormEvents() {
    const cancelBtn = document.querySelector('.add-task-form-cancel-btn')
    const addTaskBtn = document.querySelector('.add-task-form-add-btn')
    const taskNameInput = document.querySelector('#add-task-form-task-name')

    cancelBtn.addEventListener('click', userInterface.exitTaskForm)
    addTaskBtn.addEventListener('click', userInterface.addTask)
    taskNameInput.addEventListener('input', userInterface.hideTaskFormError)
  }

  static initEditTaskFormEvents(taskUUID) {
    const cancelBtn = document.querySelector('.add-task-form-cancel-btn')
    const editTaskBtn = document.querySelector('.add-task-form-add-btn')
    const taskNameInput = document.querySelector('#add-task-form-task-name')

    cancelBtn.addEventListener('click', userInterface.exitTaskForm)
    editTaskBtn.addEventListener('click', userInterface.editTask.bind(this, taskUUID))
    taskNameInput.addEventListener('input', userInterface.hideTaskFormError)
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
      if (e.target.classList.contains('dropdown-delete')) {
        userInterface.handleDropdownDeleteButton(e)
      }
      if (e.target.classList.contains('dropdown-edit')) {
        userInterface.handleDropdownEditButton(e)
      }
    }, true)

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

    // Prevent event from being fired on the project button underneath the dropdown button
    e.stopImmediatePropagation()
    e.stopPropagation()
  }

  static handleDropdownDeleteButton(e) {
    if (document.querySelector('.tasks-container').contains(e.target)) {
      const taskElement = e.target.closest('.task')
      const taskName = taskElement.querySelector('.task-name').textContent
      const projectName = taskElement.querySelector('.task-project-name').textContent

      Storage.deleteTask(projectName, taskName)
      taskElement.remove()
      userInterface.exitTaskForm()
    } else if (document.querySelector('.project-list').contains(e.target)) {
      const projectElement = e.target.closest('.project-btn')
      const projectName = projectElement.querySelector('p').textContent

      Storage.deleteProject(projectName)
      projectElement.remove()

      const currentlyOpenedProjectName = document.querySelector('.main-heading').textContent
      if (currentlyOpenedProjectName === projectName) {
        userInterface.openProject('General', document.querySelector('.project-list').firstElementChild)
      } else {
        Storage.updateTodayProject()
        Storage.updateWeekProject()
        userInterface.loadProjectContent(currentlyOpenedProjectName)
      }
    }
  }

  static handleDropdownEditButton(e) {
    if (e.target.closest('.task')) {
      userInterface.openEditTaskForm(e.target.closest('.task'))
    } else if (e.target.closest('.project-btn')) {
      userInterface.openProjectModal('edit', e.target.closest('.project-btn'))
    }
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

  static initTaskCollapse() {
    const tasksContainer = document.querySelector('.tasks-container')

    tasksContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('collapse-btn')) {
        userInterface.handleTaskCollapseButton(e)
      }
    })

    // When window is resized: resize collapsed content height to fit
    window.addEventListener('resize', () => {
      const collapsedContent = document.querySelectorAll('.collapsed')
      collapsedContent.forEach((content) => {
        content.style.maxHeight = content.scrollHeight + 'px'
      })
    })
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
    userInterface.createTaskForm()
    userInterface.initAddTaskFormEvents()
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

  static initAddModalEvents() {
    const modalCancelBtn = document.querySelector('.modal-cancel-btn')
    const modalAddProjectBtn = document.querySelector('.modal-add-project-btn')
    const modalProjectNameInput = document.querySelector('#modal-project-name-input')

    modalCancelBtn.addEventListener('click', userInterface.closeProjectModal)
    modalAddProjectBtn.addEventListener('click', userInterface.handleAddProjectButton)
    modalProjectNameInput.addEventListener('input', userInterface.removeModalErrorMessage)
  }

  static initEditModalEvents(sourceProjectName, button) {
    const modalCancelBtn = document.querySelector('.modal-cancel-btn')
    const modalAddProjectBtn = document.querySelector('.modal-add-project-btn')
    const modalProjectNameInput = document.querySelector('#modal-project-name-input')

    modalCancelBtn.addEventListener('click', userInterface.closeProjectModal)
    modalAddProjectBtn.addEventListener('click', userInterface.handleEditProjectButton.bind(this, sourceProjectName, button))
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
  }

  static clearModalContent() {
    const modalContent = document.querySelector('.modal-content')
    modalContent.innerHTML = ''
  }

  static openProjectModal(modalType, projectElement = null) {
    const dialog = document.querySelector('.modal')

    userInterface.createModalContent(modalType)

    if (modalType === 'add') {
      userInterface.initAddModalEvents()
    } else if (modalType === 'edit') {
      const projectName = projectElement.querySelector('p').textContent
      const projectNameInput = document.querySelector('#modal-project-name-input')
      projectNameInput.value = projectName
      userInterface.initEditModalEvents(projectName, projectElement)
    }

    dialog.showModal()
  }

  static closeProjectModal() {
    const dialog = document.querySelector('.modal')

    dialog.close()
  }

  static validateModalProjectName(modalType, projectName, buttonProjectName = null) {
    const modalErrorSpan = document.querySelector('.modal-error')

    if (projectName === '') {
      modalErrorSpan.textContent = 'Project name cannot be empty!'
      return
    }

    if (modalType === 'add') {
      if (Storage.getTodoList().contains(projectName)) {
        modalErrorSpan.textContent = 'Project already exists, please choose a different name!'
        return
      }
    } else if (modalType === 'edit') {
      if (Storage.getTodoList().contains(projectName) && projectName !== buttonProjectName) {
        modalErrorSpan.textContent = 'Project already exists, please choose a different name!'
        return
      }
    }

    return true
  }

  static removeModalErrorMessage() {
    const modalErrorSpan = document.querySelector('.modal-error')
    modalErrorSpan.textContent = ''
  }

  static handleAddProjectButton() {
    const projectNameInputValue = (document.querySelector('#modal-project-name-input').value).trim()

    if (!userInterface.validateModalProjectName('add', projectNameInputValue)) return

    userInterface.addProject(projectNameInputValue)
    userInterface.closeProjectModal()

    const projectBtns = document.querySelectorAll('.project-btn')
    const lastAddedProjectBtn = projectBtns.item(projectBtns.length - 1)

    userInterface.openProject(projectNameInputValue, lastAddedProjectBtn)
  }

  static handleEditProjectButton(projectName, button) {
    const projectNameInputValue = (document.querySelector('#modal-project-name-input').value).trim()
    const projectButtonName = button.querySelector('p')

    if (!userInterface.validateModalProjectName('edit', projectNameInputValue, projectButtonName.textContent)) return

    Storage.setProjectName(projectName, projectNameInputValue)

    projectButtonName.textContent = projectNameInputValue
    userInterface.closeProjectModal()
    userInterface.loadProjectContent(projectNameInputValue)
  }

  static handleTaskCollapseButton(e) {
    const content = e.target.parentElement.querySelector('.content')

    if (content.style.maxHeight) {
      e.target.classList.remove('rotate')
      content.classList.remove('collapsed')
      content.style.maxHeight = null
      content.style.marginBottom = null
    } else {
      if (content.childNodes.length !== 0) {
        e.target.classList.add('rotate')
        content.classList.add('collapsed')
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

    if (document.querySelector('.add-task-form')) userInterface.removeTaskForm()

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

  static showTaskFormError(errorText) {
    const formError = document.querySelector('.add-task-form-error-field')
    const formErrorText = document.querySelector('.add-task-form-error-text')
    formErrorText.textContent = errorText
    formError.classList.remove('hidden')
  }

  static hideTaskFormError() {
    const formError = document.querySelector('.add-task-form-error-field')
    const formErrorText = document.querySelector('.add-task-form-error-text')
    formErrorText.textContent = ''
    formError.classList.add('hidden')
  }

  static validateTaskForm(formType, taskUUID = null) { // formType: String, 'add' or 'edit'
    const projectName = document.querySelector('.main-heading').textContent
    const taskName = (document.querySelector('#add-task-form-task-name').value).trim()

    if (taskName === '') {
      userInterface.showTaskFormError('Task name cannot be empty!')
      return
    }

    if (formType === 'add') {
      if (Storage.getTodoList().getProject(projectName).getTask(taskName)) {
        userInterface.showTaskFormError('Task name already exists!')
        return
      }
    } else if (formType === 'edit') {
      const originProject = userInterface.getOriginProjectByTaskUUID(taskUUID)
      const formTaskName = document.querySelector('#add-task-form-task-name').value

      originProject.getTasks().forEach(task => {
        if (task.getName() === formTaskName && task.getUUID() !== taskUUID) {
          userInterface.showTaskFormError('Other task already has this name!')
          return
        }
      })
    }

    return true
  }

  static addTask() {
    const projectName = document.querySelector('.main-heading').textContent
    const taskName = (document.querySelector('#add-task-form-task-name').value).trim()
    const taskPriority = document.querySelector('#priority-dropdown').value
    let taskDescription = (document.querySelector('#add-task-form-description').value).trim()
    let taskDueDate = document.querySelector('#add-task-form-due-date').value

    if (taskDescription === '') taskDescription = null
    if (taskDueDate === '') taskDueDate = 'No due date'

    if (!userInterface.validateTaskForm('add')) return

    Storage.addTask(projectName, new Task(taskName, taskDescription, taskPriority, taskDueDate))

    userInterface.createTask(taskName, taskDescription, taskPriority, taskDueDate, projectName)

    userInterface.exitTaskForm()
  }

  static openEditTaskForm(taskElement) {
    const projectName = taskElement.querySelector('.task-project-name').textContent
    const taskName = taskElement.querySelector('.task-name').textContent
    const taskUUID = Storage.getTodoList().getProject(projectName).getTask(taskName).getUUID()
    const task = Storage.getTodoList().getProject(projectName).getTaskByUUID(taskUUID)
    const taskPriority = task.getPriority()
    const taskDescription = task.getDescription()
    const taskDueDate = task.getDueDate()

    if (document.querySelector('.add-task-form')) userInterface.removeTaskForm()

    userInterface.hideAddTaskButton()
    userInterface.createTaskForm()
    userInterface.populateEditTaskForm(taskName, taskDescription, taskDueDate, taskPriority)
    userInterface.initEditTaskFormEvents(taskUUID)
  }

  static editTask(taskUUID) {
    const formTaskName = (document.querySelector('#add-task-form-task-name').value).trim()
    const formTaskPriority = document.querySelector('#priority-dropdown').value
    let formTaskDescription = (document.querySelector('#add-task-form-description').value).trim()
    let formTaskDueDate = document.querySelector('#add-task-form-due-date').value

    if (formTaskDescription === '') formTaskDescription = null
    if (formTaskDueDate === '') formTaskDueDate = 'No due date'
    if (!userInterface.validateTaskForm('edit', taskUUID)) return

    // Get Origin project and task names
    const originProject = userInterface.getOriginProjectByTaskUUID(taskUUID)
    const originProjectName = originProject.getName()

    // Edit task in storage
    Storage.setTaskName(originProjectName, taskUUID, formTaskName)
    Storage.setTaskDescription(originProjectName, taskUUID, formTaskDescription)
    Storage.setTaskDueDate(originProjectName, taskUUID, formTaskDueDate)
    Storage.setTaskPriority(originProjectName, taskUUID, formTaskPriority)

    // Update and reload tasks preview
    const currentlyOpenedProjectName = document.querySelector('.main-heading').textContent
    Storage.updateTodayProject()
    Storage.updateWeekProject()
    userInterface.loadProjectContent(currentlyOpenedProjectName)
    userInterface.exitTaskForm()
  }
}