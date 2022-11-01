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
const someTaskForToday = new Task('the today task', 'for todayyyy', 'High', '2022-11-01')

// Todo List
const todoList = new TodoList()

// Project
const testProject = new Project('test project')

// Add tasks
testProject.addTask(someTask)
testProject.addTask(otherTask)
testProject.addTask(someTaskForToday)

// Add Project to todo list
todoList.addProject(testProject)

// Save todo list
Storage.saveTodoList(todoList)


// STORAGE TESTING
console.log('Source:', Storage.getTodoList())

Storage.addProject(new Project('Storage test'))
Storage.addTask('Storage test', new Task('Test task', 'test', 'High', '2022-10-23'))
// Storage.deleteTask('Storage test', 'Test task')
// Storage.setTaskName('Storage test', 'Test task', 'Test task changed')
Storage.setTaskDescription('Storage test', 'Test task', 'New Test Description')
Storage.setTaskPriority('Storage test', 'Test task', 'Low')
Storage.setTaskDueDate('Storage test', 'Test task', '1999-01-07')
Storage.setTaskCompletion('Storage test', 'Test task', true)

Storage.updateTodayProject()
Storage.updateWeekProject()

console.log('Edited:', Storage.getTodoList())