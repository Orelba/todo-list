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

  static setTaskName(projectName, taskUUID, newTaskName) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTaskByUUID(taskUUID).setName(newTaskName)
    Storage.saveTodoList(todoList)
  }

  static setTaskDescription(projectName, taskUUID, newTaskDescription) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTaskByUUID(taskUUID).setDescription(newTaskDescription)
    Storage.saveTodoList(todoList)
  }

  static setTaskPriority(projectName, taskUUID, newTaskPriorityLevel) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTaskByUUID(taskUUID).setPriority(newTaskPriorityLevel)
    Storage.saveTodoList(todoList)
  }

  static setTaskDueDate(projectName, taskUUID, newTaskDueDate) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTaskByUUID(taskUUID).setDueDate(newTaskDueDate)
    Storage.saveTodoList(todoList)
  }

  static setTaskCompletion(projectName, taskUUID, completionState) {
    const todoList = Storage.getTodoList()
    todoList.getProject(projectName).getTaskByUUID(taskUUID).setCompletion(completionState)
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