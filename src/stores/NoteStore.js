import { action, computed, decorate, observable } from "mobx";
import Note from "../models/Note.js";
import autoSave from "./../utils/autoSave.js";
import Lib from "./../utils/lib.js";

class NoteStore {
  constructor() {
    this.notes = [];
    autoSave("NOTES", this);
  }

  addNote(date, id = Lib.generateID("NOTE"), content = "") {
    this.notes.push(new Note(id, date, content));
  }

  removeNote(_id) {
    this.notes = this.notes.filter(note => {
      return note._id !== _id;
    });
  }

  get notesWithDates() {
    return this.notes.filter(note => {
      return note.date !== null;
    });
  }

  get noteDates() {
    return this.notesWithDates.map(note => {
      return note.date;
    });
  }
}

export default decorate(NoteStore, {
  notes: observable,
  addNote: action,
  removeNote: action,
  notesWithDates: computed,
  noteDates: computed
});
