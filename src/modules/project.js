import { toDate, isToday, isThisWeek, subDays } from "date-fns"

export default class Project {
  constructor(name, color) {
    this.name = name
    this.color = (color !== undefined) ? color : Project.pickRandomColor()
    this.tasks = []
  }

  setName(name) {
    this.name = name
  }

  getName() {
    return this.name
  }

  setTasks(tasks) {
    this.tasks = tasks
  }

  getTasks() {
    return this.tasks
  }

  getTask(taskName) {
    return this.tasks.find(task => task.getName() === taskName)
  }

  getTaskByUUID(taskUUID) {
    return this.tasks.find(task => task.getUUID() === taskUUID)
  }

  addTask(newTask) {
    if (this.tasks.find(task => task.getName() === newTask.name)) return
    this.tasks.push(newTask)
  }

  deleteTask(taskName) {
    this.tasks = this.tasks.filter(task => task.name !== taskName)
  }

  getTasksToday() {
    return this.tasks.filter(task => {
      const taskDate = new Date(task.getDateFormatted())
      return isToday(toDate(taskDate))
    })
  }

  getTasksThisWeek() {
    return this.tasks.filter(task => {
      const taskDate = new Date(task.getDateFormatted())
      return isThisWeek(subDays(toDate(taskDate), 1))
    })
  }

  setColor(color) { // Optional for adding a feature that allows changing project colors
    this.color = color
  }

  getColor() {
    return this.color
  }

  static pickRandomColor() {
    const colors = [
      '#DF6161', '#5959CA', '#FF5555', '#FF8A00', '#DA9A58',
      '#8ECF66', '#5AE1C3', '#4D9FFF', '#B37BE8', '#F980BA',
      '#AAB3BB', '#543A49', '#F9CA28'
    ]
    const random = Math.floor(Math.random() * colors.length)
    return colors[random]
  }
}