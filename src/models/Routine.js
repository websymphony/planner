import { action, computed, decorate, observable } from "mobx";
import Lib from "../utils/lib.js";

class Routine {
  constructor(id, title, frequency, completed) {
    this._id = id;
    this.title = title;
    this.frequency = frequency;
    this.completed = completed;
  }

  setTitle(title) {
    this.title = title;
  }

  increaseFrequency() {
    this.frequency += 1;
    Object.entries(this.completed).forEach(([key]) =>
      this.completed[key].push(undefined)
    );
  }

  decreaseFrequency() {
    if (this.frequency > 1) {
      this.frequency -= 1;
      Object.entries(this.completed).forEach(([key]) =>
        this.completed[key].pop()
      );
    }
  }

  completionChange(momentDate, index) {
    let formattedDateKey = Lib.saveableDateFormat(momentDate);
    if (this.completed[formattedDateKey] === undefined) {
      this.completed[formattedDateKey] = [...Array(this.frequency)];
    }
    this.completed[formattedDateKey][index] = !this.completed[formattedDateKey][
      index
    ];
  }

  get isMonthly() {
    return this._id.startsWith("MONTHLY");
  }
}

export default decorate(Routine, {
  _id: observable,
  title: observable,
  frequency: observable,
  completed: observable,
  isMonthly: computed,
  setTitle: action,
  increaseFrequency: action,
  decreaseFrequency: action,
  completionChange: action
});
