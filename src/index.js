import userInterface from './modules/user-interface'

document.addEventListener('DOMContentLoaded', userInterface.loadHomePage)


// TESTING ZONE
import Task from './modules/task'
import Project from './modules/project'
import TodoList from './modules/todo-list'
import Storage from './modules/storage'

// Tasks
const someTask = new Task('some name', 'yada yada', 'Low')
const otherTask = new Task('other task', 'some desc', 'Normal', '2022-10-03')
const someTaskForToday = new Task('the today task', 'for todayyyy', 'High', '2022-11-10')
const testOthertask = new Task('other task', 'some description', 'Normal', '2022-11-07')

// Todo List
const todoList = new TodoList()

// Project
const testProject = new Project('Test project')
const otherTestProject = new Project('Other test project')

// Add tasks
testProject.addTask(someTask)
testProject.addTask(otherTask)
testProject.addTask(someTaskForToday)
otherTestProject.addTask(testOthertask)

// Add Project to todo list
todoList.addProject(testProject)
todoList.addProject(otherTestProject)

// Save todo list
Storage.saveTodoList(todoList)


// STORAGE TESTING
console.log('Source:', Storage.getTodoList())

Storage.addProject(new Project('Storage test'))
Storage.addTask('Storage test', new Task('Test task', 'test', 'High', '2022-11-07'))
// Storage.deleteTask('Storage test', 'Test task')
// Storage.setTaskName('Storage test', 'Test task', 'Test task changed')
Storage.setTaskDescription('Storage test', 'Test task', 'New Test Description')
Storage.setTaskPriority('Storage test', 'Test task', 'Low')
Storage.setTaskDueDate('Storage test', 'Test task', '1999-01-07')
Storage.setTaskCompletion('Storage test', 'Test task', true)

Storage.updateTodayProject()
Storage.updateWeekProject()

console.log('Edited:', Storage.getTodoList())
console.log('------------')


// HTML TESTING
const tasksContainer = document.querySelector('.tasks-container')

// tasksContainer.appendChild(userInterface.createTask('task created', 'that works yee', 'High', 'January 7th 1999', 'General', '#DF6161'))

// const projectList = document.querySelector('.project-list')
// const addNewProjectBtn = document.querySelector('.add-project')

// projectList.insertBefore(userInterface.createProject('New Project', '#5AE1C3'), addNewProjectBtn)
// projectList.insertBefore(userInterface.createProject('Other Project', '#8ECF66'), addNewProjectBtn)

const mainContent = document.querySelector('.main-content')

mainContent.appendChild(userInterface.createAddTaskForm())

// console.log(userInterface.getOriginProjectByTaskName('other task'))
// console.log(userInterface.getOriginProjectByTaskName('other task'))

// const modal = document.querySelector('dialog')
// modal.showModal()
Storage.addTask('General', someTask)