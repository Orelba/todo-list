export default class Task {
  constructor(title, description=null, priority, dueDate='No due date') {
    this.title = title
    this.description = description
    this.priority = priority
    this.dueDate = dueDate
    this.completed = false
  }
}