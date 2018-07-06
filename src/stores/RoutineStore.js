import { action, decorate, observable } from "mobx";
import Routine from "../models/Routine.js";
import autoSave from "./../utils/autoSave.js";
import Lib from "./../utils/lib.js";

class RoutineStore {
  constructor(routineType) {
    this.routineType = routineType;
    this.routines = [];
    autoSave(routineType + "_ROUTINES", this);
  }

  setRoutineType(routineType) {
    this.routineType = routineType;
  }

  addRoutine(
    id = Lib.generateID(this.routineType),
    title = "",
    frequency = 2,
    completed = {}
  ) {
    this.routines.push(new Routine(id, title, frequency, completed));
  }

  removeRoutine(_id) {
    this.routines = this.routines.filter(routine => {
      return routine._id !== _id;
    });
  }
}

export default decorate(RoutineStore, {
  routines: observable,
  routineType: observable,
  setRoutineType: action,
  addRoutine: action,
  removeRoutine: action
});
