import { v4 as uuidv4 } from 'uuid'

export default class Task {
  constructor(name, description, priority, dueDate = 'No due date') {
    this.name = name
    this.description = description
    this.priority = priority
    this.dueDate = dueDate
    this.completed = false
    this.UUID = (this.UUID) ? this.UUID : uuidv4()
  }

  setName(name) {
    this.name = name
  }

  getName() {
    return this.name
  }

  setDescription(description) {
    this.description = description
  }

  getDescription() {
    return this.description
  }

  setPriority(priorityLevel) {
    this.priority = priorityLevel
  }

  getPriority() {
    return this.priority
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate
  }

  getDueDate() {
    return this.dueDate
  }

  setCompletion(state) {
    this.completed = state
  }

  isCompleted() {
    return this.completed
  }

  getUUID() {
    return this.UUID
  }

  getDateFormatted() {
    const year = this.dueDate.split('-')[0]
    const month = this.dueDate.split('-')[1]
    const day = this.dueDate.split('-')[2]
    return `${month}/${day}/${year}`
  }
}