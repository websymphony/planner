import { action, decorate, observable } from "mobx";

class Todo {
  constructor(id, date, content, completed) {
    this._id = id;
    this.date = date;
    this.content = content;
    this.completed = completed;
  }

  setContent(content) {
    this.content = content;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  setDate(date) {
    this.date = date;
  }

  removeDate() {
    this.date = null;
  }
}

export default decorate(Todo, {
  _id: observable,
  date: observable,
  content: observable,
  completed: observable,
  setContent: action,
  toggleCompleted: action,
  setDate: action,
  removeDate: action
});
