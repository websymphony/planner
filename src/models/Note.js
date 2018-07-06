import { action, decorate, observable } from "mobx";

class Note {
  constructor(id, date, content) {
    this._id = id;
    this.date = date;
    this.content = content;
  }

  setContent(content) {
    this.content = content;
  }
}

export default decorate(Note, {
  _id: observable,
  date: observable,
  content: observable,
  setContent: action
});
