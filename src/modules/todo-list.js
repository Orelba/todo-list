import { compareAsc, toDate } from 'date-fns'
import Project from './project'

export default class TodoList {
  constructor() {
    this.projects = []
    this.projects.push(new Project('General', '#DF6161'))
    this.projects.push(new Project('Today', null))
    this.projects.push(new Project('This week', null))
  }

  setProjects(projects) {
    this.projects = projects
  }

  getProjects() {
    return this.projects
  }

  getProject(projectName) {
    return this.projects.find(project => project.getName() === projectName)
  }

  contains(projectName) {
    return this.projects.some(project => project.getName() === projectName)
  }

  addProject(newProject) {
    if (this.projects.find(project => project.name === newProject.name)) return
    this.projects.push(newProject)
  }

  deleteProject(projectName) {
    const projectToDelete = this.projects.find(
      project => project.getName() === projectName
    )
    this.projects.splice(this.projects.indexOf(projectToDelete), 1)
  }

  updateTodayProject() {
    this.getProject('Today').tasks = []

    this.projects.forEach(project => {
      if (project.getName() === 'Today' || project.getName() === 'This week')
        return

      const todayTasks = project.getTasksToday()
      todayTasks.forEach(task => this.getProject('Today').addTask(task))
    })
  }

  updateWeekProject() {
    this.getProject('This week').tasks = []

    this.projects.forEach(project => {
      if (project.getName() === 'Today' || project.getName() === 'This week')
        return

      const weekTasks = project.getTasksThisWeek()
      weekTasks.forEach(task => this.getProject('This week').addTask(task))
    })

    this.getProject('This week').setTasks(
      this.getProject('This week')
        .getTasks()
        .sort((taskA, taskB) =>
          compareAsc(
            toDate(new Date(taskA.getDateFormatted())),
            toDate(new Date(taskB.getDateFormatted()))
          )
        )
    )
  }
}