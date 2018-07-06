import { action, computed, decorate, observable } from "mobx";
import Todo from "../models/Todo.js";
import autoSave from "./../utils/autoSave.js";
import Lib from "./../utils/lib.js";

class TodoStore {
  constructor() {
    this.todos = [];
    autoSave("TODOS", this);
  }

  addTodo(date, id = Lib.generateID("TODO"), content = "", completed = false) {
    this.todos.push(new Todo(id, date, content, completed));
  }

  removeTodo(_id) {
    this.todos = this.todos.filter(todo => {
      return todo._id !== _id;
    });
  }

  get todosWithDates() {
    return this.todos.filter(todo => {
      return todo.date !== null;
    });
  }

  get todoDates() {
    return this.todosWithDates.map(todo => {
      return todo.date;
    });
  }
}

export default decorate(TodoStore, {
  todos: observable,
  addTodo: action,
  removeTodo: action,
  todoDates: computed,
  todosWithDates: computed
});
