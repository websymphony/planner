import { autorun, toJS } from "mobx";
import localforage from "localforage";
import seedData from "./seedData.js";

let hydrate = (key, existingStore, store) => {
  if (
    key.startsWith("PLANNER_MONTHLY_ROUTINES") ||
    key.startsWith("PLANNER_WEEKLY_ROUTINES")
  ) {
    store.setRoutineType(existingStore.routineType);
    existingStore.routines.map(routine => {
      return store.addRoutine(
        routine._id,
        routine.title,
        routine.frequency,
        routine.completed
      );
    });
  }
  if (key.startsWith("PLANNER_TODOS")) {
    existingStore.todos.map(todo => {
      return store.addTodo(todo.date, todo._id, todo.content, todo.completed);
    });
  }
  if (key.startsWith("PLANNER_NOTES")) {
    existingStore.notes.map(note => {
      return store.addNote(note.date, note._id, note.content);
    });
  }
};

localforage.config({
  name: "Planner App"
});

export default function(key, _this) {
  let firstRun = true;
  let keyWithPrefix = "PLANNER_" + key;

  autorun(() => {
    if (firstRun) {
      localforage
        .getItem(keyWithPrefix)
        .then(function(existingStore) {
          if (existingStore) {
            hydrate(keyWithPrefix, existingStore, _this);
          } else {
            seedData(keyWithPrefix, _this);
          }
        })
        .catch(function(err) {});
    }

    localforage.setItem(keyWithPrefix, toJS(_this));
  });

  firstRun = false;
}
