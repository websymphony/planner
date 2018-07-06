import moment from "moment";
import Lib from "./lib.js";

export default function(key, store) {
  const formattedTodayDate = Lib.saveableDateFormat(moment());
  if (key.startsWith("PLANNER_MONTHLY_ROUTINES")) {
    store.setRoutineType("MONTHLY");
    store.addRoutine(Lib.generateID("MONTHLY"), "Review Finances", 1, {
      [`${formattedTodayDate}`]: [true]
    });
    store.addRoutine(Lib.generateID("MONTHLY"), "Date Night");
    store.addRoutine(Lib.generateID("MONTHLY"), "Pay credit card bill");
  }
  if (key.startsWith("PLANNER_WEEKLY_ROUTINES")) {
    store.setRoutineType("WEEKLY");
    store.addRoutine(Lib.generateID("WEEKLY"), "Meditate", 7, {
      [`${formattedTodayDate}`]: [true, false, false, true, true, false, false]
    });
    store.addRoutine(Lib.generateID("WEEKLY"), "Workout", 5, {
      [`${formattedTodayDate}`]: [true, true, false, false, false]
    });
    store.addRoutine(Lib.generateID("WEEKLY"), "Write", 3, {
      [`${formattedTodayDate}`]: [false, false, false]
    });
  }
  if (key.startsWith("PLANNER_TODOS")) {
    store.addTodo(
      formattedTodayDate,
      Lib.generateID("TODO"),
      "With the arrow in the right of this box, move a todo to the backlog at the end of the day if you didn't get it done. Then, tomorrow, you can move it back to your day's plan, or choose a date on the calendar and move it there to plan for later.",
      false
    );
    store.addTodo(null, Lib.generateID("TODO"), "Clean out garage", false);
    store.addTodo(
      null,
      Lib.generateID("TODO"),
      "Return stuff to target",
      false
    );
    store.addTodo(null, Lib.generateID("TODO"), "Clean rain gutters", false);
    store.addTodo(null, Lib.generateID("TODO"), "Put rent on autopay", false);
  }
  if (key.startsWith("PLANNER_NOTES")) {
    store.addNote(
      formattedTodayDate,
      Lib.generateID("NOTE"),
      "Hey, Hi! 👋🏼: All of this text is editable. Go ahead and click here. Use this space to track your daily notes. Think of it more like a notebook than a productivity application."
    );
    store.addNote(
      formattedTodayDate,
      Lib.generateID("NOTE"),
      "For tasks you have to do routinely, add those tasks to Routines, then check the box when you complete it. Each week or month the boxes will empty again, waiting to be checked once more."
    );
    store.addNote(
      formattedTodayDate,
      Lib.generateID("NOTE"),
      "I like to tag my notes with #tags #like #this. Then you can use the search box to quickly find notes about that tag. Stuff I have is #some-project-name and #spouse-gift-idea."
    );
  }
}
