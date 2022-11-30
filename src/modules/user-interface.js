import { format } from 'date-fns'
import Storage from './storage'
import Project from './project'
import Task from './task'

export default class UserInterface {
  static loadHomePage() {
    UserInterface.loadTheme()
    UserInterface.loadProjects()
    UserInterface.initDynamicBodyHeightAdjustment()
    UserInterface.initStaticButtons()
    UserInterface.initDropdownMenus()
    UserInterface.initTaskCollapse()
    UserInterface.initTaskCheckboxEvents()
    UserInterface.initModalBackdropEvent()
    UserInterface.initNavbar()
    UserInterface.openProject('General', document.querySelector('.project-list').firstElementChild)
  }

  static loadProjects() {
    Storage.getTodoList()
      .getProjects()
      .forEach(project => {
        if (project.name !== 'Today' && project.name !== 'This week') {
          UserInterface.createProject(project.name, project.color)
        }
      })
  }

  static loadTasks(projectName) {
    Storage.getTodoList()
      .getProject(projectName)
      .getTasks()
      .forEach(task => {
        if (projectName === 'Today' || projectName === 'This week') {
          const OriginProjectName = UserInterface.getOriginProjectByTaskUUID(task.getUUID()).getName()
          UserInterface.createTask(task.name, task.description, task.priority, task.dueDate, OriginProjectName, task.completed)
        } else {
          UserInterface.createTask(task.name, task.description, task.priority, task.dueDate, projectName, task.completed)
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

    UserInterface.loadTasks(projectName)

    UserInterface.toggleEmptyPagePlaceholderIfNeeded()
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
      const dropdown = UserInterface.createDropdown('vertical')
      li.append(bulletpoint, projectNameP, dropdown)
    } else {
      li.append(bulletpoint, projectNameP)
    }

    const projectList = document.querySelector('.project-list')
    const addNewProjectBtn = document.querySelector('.add-project')

    projectList.insertBefore(li, addNewProjectBtn)

    UserInterface.initProjectButtons()
  }

  static createTask(name, description, priority, dueDate, projectName, isCompleted = false) {
    const tasksContainer = document.querySelector('.tasks-container')

    const article = document.createElement('article')
    article.classList.add('task')

    const checkbox = document.createElement('input')
    checkbox.classList.add('task-checkbox')
    checkbox.type = 'checkbox'
    checkbox.name = 'task-checkbox'
    checkbox.checked = isCompleted

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
    if (isCompleted) taskName.style.textDecoration = 'line-through'

    const dropdown = UserInterface.createDropdown('horizontal')

    const content = document.createElement('div')
    content.classList.add('content')
    content.textContent = description

    const priorityDiv = document.createElement('div')
    priorityDiv.classList.add('priority')

    const taskPriority = document.createElement('p')
    taskPriority.classList.add('task-priority')
    taskPriority.textContent = `${priority} priority`

    if (priority === 'low') taskPriority.style.color = 'var(--low-priority-color)'
    else if (priority === 'normal') taskPriority.style.color = 'var(--normal-priority-color)'
    else if (priority === 'high') taskPriority.style.color = 'var(--high-priority-color)'

    const taskDueDate = document.createElement('p')
    taskDueDate.classList.add('task-due-date')
    taskDueDate.textContent = UserInterface.getDateFormatted(dueDate)

    priorityDiv.append(taskPriority, taskDueDate)

    const projectNameDiv = document.createElement('div')
    projectNameDiv.classList.add('task-project-wrapper')

    const projectNameP = document.createElement('p')
    projectNameP.classList.add('task-project-name', 'truncate')
    projectNameP.textContent = projectName

    const projectBulletpoint = document.createElement('span')
    const projectColor = Storage.getTodoList().getProject(projectName).getColor()
    projectBulletpoint.classList.add('bulletpoint')
    projectBulletpoint.style.backgroundColor = projectColor

    projectNameDiv.append(projectNameP, projectBulletpoint)

    if (description === null) {
      article.append(checkbox, taskName, dropdown, content, priorityDiv, projectNameDiv)
    } else {
      article.append(checkbox, collapseBtn, taskName, dropdown, content, priorityDiv, projectNameDiv)
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
    priorityIcon.src = 'images/priority.svg'
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
      UserInterface.removeTaskForm()
      UserInterface.showAddTaskButton()
    } else {
      UserInterface.removeTaskForm()
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

    cancelBtn.addEventListener('click', UserInterface.exitTaskForm)
    addTaskBtn.addEventListener('click', UserInterface.addTask)
    taskNameInput.addEventListener('input', UserInterface.hideTaskFormError)
  }

  static initEditTaskFormEvents(taskUUID) {
    const cancelBtn = document.querySelector('.add-task-form-cancel-btn')
    const editTaskBtn = document.querySelector('.add-task-form-add-btn')
    const taskNameInput = document.querySelector('#add-task-form-task-name')

    cancelBtn.addEventListener('click', UserInterface.exitTaskForm)
    editTaskBtn.addEventListener('click', UserInterface.editTask.bind(this, taskUUID))
    taskNameInput.addEventListener('input', UserInterface.hideTaskFormError)
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
        UserInterface.handleDropdowns(e)
      }
      if (e.target.classList.contains('dropdown-delete')) {
        UserInterface.handleDropdownDeleteButton(e)
      }
      if (e.target.classList.contains('dropdown-edit')) {
        UserInterface.handleDropdownEditButton(e)
      }
    }, true)

    window.addEventListener('click', UserInterface.closeAllDropdowns)
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

  static handleDropdownDeleteButton(e) {
    if (document.querySelector('.tasks-container').contains(e.target)) {
      const taskElement = e.target.closest('.task')
      const taskName = taskElement.querySelector('.task-name').textContent
      const projectName = taskElement.querySelector('.task-project-name').textContent

      Storage.deleteTask(projectName, taskName)
      taskElement.remove()
      UserInterface.exitTaskForm()
      UserInterface.toggleEmptyPagePlaceholderIfNeeded()
    } else if (document.querySelector('.project-list').contains(e.target)) {
      const projectElement = e.target.closest('.project-btn')
      UserInterface.openProjectModal('delete', projectElement)
    }
  }

  static handleDropdownEditButton(e) {
    if (e.target.closest('.task')) {
      UserInterface.openEditTaskForm(e.target.closest('.task'))
    } else if (e.target.closest('.project-btn')) {
      UserInterface.openProjectModal('edit', e.target.closest('.project-btn'))
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

  static initDynamicBodyHeightAdjustment() { // A 'height: 100vh' on body bug solution for mobile devices
    // Set initial Height
    document.querySelector('body').style.height = window.innerHeight + "px"
    
    // Fix body height 100vh bug on mobile phones by setting the height on resize
    window.addEventListener('resize', () => {
      let deviceWidth = window.matchMedia("(max-width: 1024px)")
      if (deviceWidth.matches) {
        document.querySelector('body').style.height = window.innerHeight + "px"
      } else {
        document.querySelector('body').style.height = '100vh'
      }
    })
  }

  static initTaskCollapse() {
    const tasksContainer = document.querySelector('.tasks-container')

    tasksContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('collapse-btn')) {
        UserInterface.handleTaskCollapseButton(e)
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
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const todayBtn = document.querySelector('.today-tab')
    const weekBtn = document.querySelector('.week-tab')
    const addProjectBtn = document.querySelector('.add-project')
    const addTaskBtn = document.querySelector('.add-task-btn')


    toggleSwitch.addEventListener('change', UserInterface.switchTheme, false);
    todayBtn.addEventListener('click', UserInterface.openTodayProject)
    weekBtn.addEventListener('click', UserInterface.openWeekProject)
    addProjectBtn.addEventListener('click', UserInterface.openProjectModal.bind(this, 'add'))
    addTaskBtn.addEventListener('click', UserInterface.handleAddTaskButton)
  }

  static handleAddTaskButton() {
    UserInterface.hideAddTaskButton()
    UserInterface.createTaskForm()
    UserInterface.initAddTaskFormEvents()
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
      btn.addEventListener('click', UserInterface.handleProjectButton)
    )
  }

  static initModalBackdropEvent() {
    const dialog = document.getElementsByTagName('dialog')[0]

    dialog.addEventListener('click', function (event) {
      const rect = dialog.getBoundingClientRect()
      const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
        && rect.left <= event.clientX && event.clientX <= rect.left + rect.width)
      if (!isInDialog) {
        dialog.close()
      }
    })
  }

  static initAddModalEvents() {
    const modalCancelBtn = document.querySelector('.modal-cancel-btn')
    const modalActionBtn = document.querySelector('.modal-action-btn')
    const modalProjectNameInput = document.querySelector('#modal-project-name-input')

    modalCancelBtn.addEventListener('click', UserInterface.closeProjectModal)
    modalActionBtn.addEventListener('click', UserInterface.handleAddProjectButton)
    modalProjectNameInput.addEventListener('input', UserInterface.removeModalErrorMessage)
  }

  static initEditModalEvents(sourceProjectName, button) {
    const modalCancelBtn = document.querySelector('.modal-cancel-btn')
    const modalActionBtn = document.querySelector('.modal-action-btn')
    const modalProjectNameInput = document.querySelector('#modal-project-name-input')

    modalCancelBtn.addEventListener('click', UserInterface.closeProjectModal)
    modalActionBtn.addEventListener('click', UserInterface.handleEditProjectButton.bind(this, sourceProjectName, button))
    modalProjectNameInput.addEventListener('input', UserInterface.removeModalErrorMessage)
  }

  static initDeleteModalEvents(projectName, button) {
    const modalCancelBtn = document.querySelector('.modal-cancel-btn')
    const modalActionBtn = document.querySelector('.modal-action-btn')

    modalCancelBtn.addEventListener('click', UserInterface.closeProjectModal)
    modalActionBtn.addEventListener('click', UserInterface.deleteProject.bind(this, projectName, button))
  }

  static createModalContent(modalType) {
    const modalContent = document.querySelector('.modal-content')

    const heading = document.createElement('h3')

    const modalInnerContainer = document.createElement('div')
    modalInnerContainer.classList.add('modal-input-container')

    const projectNameInput = document.createElement('input')
    projectNameInput.type = 'text'
    projectNameInput.name = 'modal-project-name'
    projectNameInput.id = 'modal-project-name-input'
    projectNameInput.maxLength = 40

    const modalErrorSpan = document.createElement('span')
    modalErrorSpan.classList.add('modal-error')

    const modalProjectDeleteWarning = document.createElement('p')
    modalProjectDeleteWarning.classList.add('modal-project-delete-warning')

    const modalButtonsContainer = document.createElement('div')
    modalButtonsContainer.classList.add('modal-buttons')

    const cancelButton = document.createElement('button')
    cancelButton.classList.add('modal-cancel-btn')
    cancelButton.textContent = 'Cancel'

    const actionButton = document.createElement('button')
    actionButton.classList.add('modal-action-btn')

    if (modalType === 'add') {
      heading.textContent = 'Add new project'
      projectNameInput.placeholder = 'Project name'
      actionButton.textContent = 'Add project'
      modalInnerContainer.append(projectNameInput, modalErrorSpan)
    } else if (modalType === 'edit') {
      heading.textContent = 'Edit project'
      projectNameInput.placeholder = 'New project name'
      actionButton.textContent = 'Edit project'
      modalInnerContainer.append(projectNameInput, modalErrorSpan)
    } else if (modalType === 'delete') {
      heading.textContent = 'Delete Project'
      actionButton.textContent = 'Delete project'
      actionButton.style.backgroundColor = 'var(--delete-color)'
      modalInnerContainer.append(modalProjectDeleteWarning)
    }

    modalButtonsContainer.append(cancelButton, actionButton)

    UserInterface.clearModalContent()

    modalContent.append(heading, modalInnerContainer, modalButtonsContainer)
  }

  static clearModalContent() {
    const modalContent = document.querySelector('.modal-content')
    modalContent.innerHTML = ''
  }

  static openProjectModal(modalType, projectElement = null) {
    const dialog = document.querySelector('.modal')

    UserInterface.createModalContent(modalType)

    if (modalType === 'add') {
      UserInterface.initAddModalEvents()
    } else if (modalType === 'edit') {
      const projectName = projectElement.querySelector('p').textContent
      const projectNameInput = document.querySelector('#modal-project-name-input')

      projectNameInput.value = projectName
      UserInterface.initEditModalEvents(projectName, projectElement)
    } else if (modalType === 'delete') {
      const projectName = projectElement.querySelector('p').textContent
      const modalProjectDeleteWarning = document.querySelector('.modal-project-delete-warning')

      modalProjectDeleteWarning.textContent = `Are you sure you want to delete "${projectName}"?`
      UserInterface.initDeleteModalEvents(projectName, projectElement)
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

    if (!UserInterface.validateModalProjectName('add', projectNameInputValue)) return

    UserInterface.addProject(projectNameInputValue)
    UserInterface.closeProjectModal()

    const projectBtns = document.querySelectorAll('.project-btn')
    const lastAddedProjectBtn = projectBtns.item(projectBtns.length - 1)

    UserInterface.openProject(projectNameInputValue, lastAddedProjectBtn)
  }

  static handleEditProjectButton(projectName, button) {
    const projectNameInputValue = (document.querySelector('#modal-project-name-input').value).trim()
    const projectButtonName = button.querySelector('p')

    if (!UserInterface.validateModalProjectName('edit', projectNameInputValue, projectButtonName.textContent)) return

    Storage.setProjectName(projectName, projectNameInputValue)

    projectButtonName.textContent = projectNameInputValue
    UserInterface.closeProjectModal()
    UserInterface.loadProjectContent(projectNameInputValue)
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

    UserInterface.loadProjectContent(projectName)

    if (document.querySelector('.add-task-form')) UserInterface.removeTaskForm()

    if (projectName === 'Today' || projectName === 'This week') {
      UserInterface.hideAddTaskButton()
    } else {
      UserInterface.showAddTaskButton()
    }
  }

  static addProject(projectName) {
    Storage.addProject(new Project(projectName))
    const newProject = Storage.getTodoList().getProject(projectName)
    UserInterface.createProject(newProject.getName(), newProject.getColor())
  }

  static deleteProject(projectName, button) {
    Storage.deleteProject(projectName)
    button.remove()

    UserInterface.closeProjectModal()

    const currentlyOpenedProjectName = document.querySelector('.main-heading').textContent
    if (currentlyOpenedProjectName === projectName) {
      UserInterface.openProject('General', document.querySelector('.project-list').firstElementChild)
    } else {
      Storage.updateTodayProject()
      Storage.updateWeekProject()
      UserInterface.loadProjectContent(currentlyOpenedProjectName)
    }
  }

  static openTodayProject() {
    Storage.updateTodayProject()
    UserInterface.openProject('Today', this)
  }

  static openWeekProject() {
    Storage.updateWeekProject()
    UserInterface.openProject('This week', this)
  }

  static handleProjectButton(e) {
    // Pressing the dropdown edit or delete makes this trigger
    if (e.target.classList.contains('dropdown-edit') || e.target.classList.contains('dropdown-delete')) return

    const projectName = e.currentTarget.querySelector('p').textContent
    UserInterface.openProject(projectName, this)
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

  static validateTaskForm(formType, taskUUID = null) {
    const projectName = document.querySelector('.main-heading').textContent
    const taskName = (document.querySelector('#add-task-form-task-name').value).trim()

    if (taskName === '') {
      UserInterface.showTaskFormError('Task name cannot be empty!')
      return
    }

    if (formType === 'add') {
      if (Storage.getTodoList().getProject(projectName).getTask(taskName)) {
        UserInterface.showTaskFormError('Task name already exists!')
        return
      }
    } else if (formType === 'edit') {
      const originProject = UserInterface.getOriginProjectByTaskUUID(taskUUID)
      const formTaskName = document.querySelector('#add-task-form-task-name').value

      originProject.getTasks().forEach(task => {
        if (task.getName() === formTaskName && task.getUUID() !== taskUUID) {
          UserInterface.showTaskFormError('Other task already has this name!')
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

    if (!UserInterface.validateTaskForm('add')) return

    Storage.addTask(projectName, new Task(taskName, taskDescription, taskPriority, taskDueDate))

    UserInterface.createTask(taskName, taskDescription, taskPriority, taskDueDate, projectName)

    UserInterface.exitTaskForm()

    UserInterface.toggleEmptyPagePlaceholderIfNeeded()
  }

  static openEditTaskForm(taskElement) {
    const projectName = taskElement.querySelector('.task-project-name').textContent
    const taskName = taskElement.querySelector('.task-name').textContent
    const taskUUID = Storage.getTodoList().getProject(projectName).getTask(taskName).getUUID()
    const task = Storage.getTodoList().getProject(projectName).getTaskByUUID(taskUUID)
    const taskPriority = task.getPriority()
    const taskDescription = task.getDescription()
    const taskDueDate = task.getDueDate()

    if (document.querySelector('.add-task-form')) UserInterface.removeTaskForm()

    UserInterface.hideAddTaskButton()
    UserInterface.createTaskForm()
    UserInterface.populateEditTaskForm(taskName, taskDescription, taskDueDate, taskPriority)
    UserInterface.initEditTaskFormEvents(taskUUID)

    const form = document.querySelector('.add-task-form')
    form.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  static editTask(taskUUID) {
    const formTaskName = (document.querySelector('#add-task-form-task-name').value).trim()
    const formTaskPriority = document.querySelector('#priority-dropdown').value
    let formTaskDescription = (document.querySelector('#add-task-form-description').value).trim()
    let formTaskDueDate = document.querySelector('#add-task-form-due-date').value

    if (formTaskDescription === '') formTaskDescription = null
    if (formTaskDueDate === '') formTaskDueDate = 'No due date'
    if (!UserInterface.validateTaskForm('edit', taskUUID)) return

    // Get Origin project and task names
    const originProject = UserInterface.getOriginProjectByTaskUUID(taskUUID)
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
    UserInterface.loadProjectContent(currentlyOpenedProjectName)
    UserInterface.exitTaskForm()
  }

  static initTaskCheckboxEvents() {
    const tasksContainer = document.querySelector('.tasks-container')

    tasksContainer.addEventListener('click', e => {
      if (e.target.classList.contains('task-checkbox')) {
        UserInterface.setTaskCompletionState(e.target.parentElement)
      }
    })
  }

  static setTaskCompletionState(taskElement) {
    const taskName = taskElement.querySelector('.task-name')
    const projectName = taskElement.querySelector('.task-project-name').textContent
    const isTaskCompleted = Storage.getTodoList().getProject(projectName).getTask(taskName.textContent).isCompleted()

    if (isTaskCompleted) {
      Storage.setTaskCompletion(projectName, taskName.textContent, false)
      taskName.style.textDecoration = null
    } else {
      Storage.setTaskCompletion(projectName, taskName.textContent, true)
      taskName.style.textDecoration = 'line-through'
    }
  }

  static initNavbar() {
    const hamburgerButton = document.querySelector('.hamburger-lines')

    hamburgerButton.addEventListener('click', () => {
      if (hamburgerButton.classList.contains('opened')) {
        hamburgerButton.classList.remove('opened')
        UserInterface.closeNav()
      } else {
        hamburgerButton.classList.add('opened')
        UserInterface.openNav()
      }
    })
  }

  static openNav() {
    const nav = document.querySelector('nav')

    nav.style.width = '325px'
    nav.style.padding = '0 20px 30px'
    nav.style.left = '0'
  }

  static closeNav() {
    const nav = document.querySelector('nav')

    nav.style.width = '0'
    nav.style.padding = '0'
    nav.style.left = '-325px'
  }

  static switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark')
      Storage.setTheme('dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      Storage.setTheme('light')
    }
  }

  static loadTheme() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = Storage.getTheme() ? Storage.getTheme() : null

    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme)

      if (currentTheme === 'dark') {
        toggleSwitch.checked = true
      }
    }
  }

  static createEmptyPagePlaceholder() {
    const containerDiv = document.createElement('div')
    containerDiv.classList.add('page-placeholder')

    const Image = document.createElement('img')
    Image.src = 'images/empty-placeholder.png'
    Image.height = 450
    Image.width = 450
    Image.alt = 'Empty Page Placeholder'

    const textDiv = document.createElement('div')
    textDiv.classList.add('page-placeholder-text')

    const firstH2 = document.createElement('h2')
    firstH2.textContent = "It's pretty empty here..."

    const secondH2 = document.createElement('h2')
    secondH2.textContent = 'Add some tasks to your list'

    textDiv.append(firstH2, secondH2)

    containerDiv.append(Image, textDiv)

    const tasksContainer = document.querySelector('.tasks-container')

    tasksContainer.append(containerDiv)
  }

  static toggleEmptyPagePlaceholderIfNeeded() {
    const tasksContainer = document.querySelector('.tasks-container')
    const task = tasksContainer.querySelector('.task')
    const placeholder = tasksContainer.querySelector('.page-placeholder')

    if (!task && !placeholder) {
      UserInterface.createEmptyPagePlaceholder()
    } else if (task && placeholder) {
      placeholder.remove()
    }
  }
}