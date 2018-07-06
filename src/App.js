import { observer } from "mobx-react";
import moment from "moment";
import "normalize.css";
import React, { Component } from "react";
import * as Rebass from "rebass";
import { injectGlobal } from "styled-components";
import NavigationBar from "./components/NavigationBar.js";
import NoteList from "./components/NoteList.js";
import RoutineList from "./components/RoutineList.js";
import TodoList from "./components/TodoList.js";
import NoteStore from "./stores/NoteStore.js";
import RoutineStore from "./stores/RoutineStore.js";
import TodoStore from "./stores/TodoStore.js";
import Lib from "./utils/lib.js";

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }

 .todayLink {
   color: #000;
  }

 .lighterGrayBorder {
   border-color: #fafafa !important;
  }

  .contentEditable {
    outline: none;
  }

 .fade-enter {
    opacity: 0.01;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0.01;
    transition: opacity 200ms ease-in;
  }

  .searchDropdownContainer {
    color: rgb(0, 0, 0);
    z-index: 1;
    position: absolute;
    top: 2.0em;
    right: 0px;
    width: 25vw;
    max-height: 90vh;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 20px;
    overflow: auto;
    background: rgb(255, 255, 255);
  }

  .searchResult{
    display: block;
    color: inherit;
    padding: 10px;
    border-bottom: 1px solid rgb(238, 238, 238);
    font: inherit;
  }
`;

const monthlyRoutineStore = new RoutineStore("MONTHLY");
const weeklyRoutineStore = new RoutineStore("WEEKLY");
const todoStore = new TodoStore();
const noteStore = new NoteStore();

class App extends Component {
  render() {
    const selectedItem =
      this.props.location && this.props.location.search.split("=")[1];
    let inputDate = moment(this.props.plannerDate, Lib.dateFormat, true);
    const plannerDate = inputDate.isValid() ? inputDate : moment();
    const todayDate = `/${Lib.saveableDateFormat(moment())}`;
    const prefixDate = plannerDate.format("dddd, MMMM Do");
    return (
      <Rebass.Provider
        theme={{
          fonts: {
            sans: "Helvetica, sans-serif"
          }
        }}
      >
        <NavigationBar
          plannerDate={plannerDate}
          todayDate={todayDate}
          noteStore={noteStore}
          todoStore={todoStore}
        />
        <Rebass.Flex flexWrap="wrap" justifyContent="space-around">
          <Rebass.Box width={[1, 25 / 90]}>
            <RoutineList
              listHeading="Monthly Routines"
              routineStore={monthlyRoutineStore}
              plannerDate={plannerDate}
            />
            <RoutineList
              listHeading="Weekly Routines"
              routineStore={weeklyRoutineStore}
              plannerDate={plannerDate}
            />
          </Rebass.Box>
          <Rebass.Box width={[1, 40 / 90]}>
            <TodoList
              todoStore={todoStore}
              plannerDate={plannerDate}
              isBacklog={false}
              listHeading={`TODOS for ${prefixDate} `}
              selectedItem={selectedItem}
            />
            <NoteList
              noteStore={noteStore}
              plannerDate={plannerDate}
              listHeading={`Notes for ${prefixDate} `}
              selectedItem={selectedItem}
            />
          </Rebass.Box>
          <Rebass.Box width={[1, 24 / 90]}>
            <TodoList
              todoStore={todoStore}
              plannerDate={plannerDate}
              isBacklog={true}
              listHeading={`Backlogged TODOS`}
            />
          </Rebass.Box>
        </Rebass.Flex>
      </Rebass.Provider>
    );
  }
}

export default observer(App);
