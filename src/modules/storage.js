import Task from './task'
import Project from './project'
import TodoList from './todo-list'

export default class Storage {
  static saveTodoList(list) {
    localStorage.setItem('todoList', JSON.stringify(list))
  }

  static getTodoList() {
    const todoList = Object.assign(
      new TodoList,
      JSON.parse(localStorage.getItem('todoList'))
    )

    todoList.setProjects(
      todoList
        .getProjects()
        .map(project => Object.assign(new Project, project))
    )

    todoList.getProjects()
      .forEach(project =>
        project.setTasks(
          project.getTasks().map(task => Object.assign(new Task, task))
        )
      )

    return todoList
  }

  static addProject(project) {
    const todoList = Storage.getTodoList()
    todoList.addProject(project)
    Storage.saveTodoList(todoList)
  }

  static deleteProject(projectName) {
    const todoList = Storage.getTodoList()
    todoList.deleteProject(projectName)
    Storage.saveTodoList(todoList)
  }

  static addTask(projectName, task) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).addTask(task)
    Storage.saveTodoList(todoList)
  }

  static deleteTask(projectName, taskName) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).deleteTask(taskName)
    Storage.saveTodoList(todoList)
  }

  static setTaskName(projectName, taskName, newTaskName) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTask(taskName).setName(newTaskName)
    Storage.saveTodoList(todoList)
  }

  static setTaskDescription(projectName, taskName, newTaskDescription) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTask(taskName).setDescription(newTaskDescription)
    Storage.saveTodoList(todoList)
  }

  static setTaskPriority(projectName, taskName, newTaskPriorityLevel) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTask(taskName).setPriority(newTaskPriorityLevel)
    Storage.saveTodoList(todoList)
  }

  static setTaskDueDate(projectName, taskName, newTaskDueDate) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTask(taskName).setDueDate(newTaskDueDate)
    Storage.saveTodoList(todoList)
  }

  static setTaskCompletion(projectName, taskName, completionState) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTask(taskName).setCompletion(completionState)
    Storage.saveTodoList(todoList)
  }

  static updateTodayProject() {
    const todoList = Storage.getTodoList()
    todoList.updateTodayProject()
    Storage.saveTodoList(todoList)
  }

  static updateWeekProject() {
    const todoList = Storage.getTodoList()
    todoList.updateWeekProject()
    Storage.saveTodoList(todoList)
  }
}