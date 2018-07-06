import { observer } from "mobx-react";
import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as Rebass from "rebass";
import Lib from "../utils/lib.js";
import Todo from "./Todo.js";

class TodoList extends Component {
  addTodo = () => {
    const { plannerDate, isBacklog } = this.props;
    if (isBacklog) {
      this.props.todoStore.addTodo(null);
    } else {
      this.props.todoStore.addTodo(Lib.saveableDateFormat(plannerDate));
    }
  };

  removeTodo = _id => {
    this.props.todoStore.removeTodo(_id);
  };

  render() {
    const { plannerDate, isBacklog, listHeading, selectedItem } = this.props;
    return (
      <Rebass.Panel my={2}>
        <Rebass.Panel.Header color="black" borderBottom={0} py={2}>
          <Rebass.Flex flexwrap="wrap">
            <Rebass.Box width={[1, 9 / 10]}>
              <Rebass.Caps fontWeight="bold" fontSize={2}>
                {listHeading}
              </Rebass.Caps>
            </Rebass.Box>
            <Rebass.Box width={[1, 1 / 10]} style={{ textAlign: "right" }}>
              <Rebass.Button
                children="Add"
                px={2}
                py={1}
                onClick={this.addTodo}
                bg="black"
              />
            </Rebass.Box>
          </Rebass.Flex>
        </Rebass.Panel.Header>
        <Rebass.Box p={1}>
          <TransitionGroup>
            {this.props.todoStore.todos.map(todo => {
              if (
                (isBacklog && todo.date === null) ||
                (!isBacklog &&
                  todo.date === Lib.saveableDateFormat(plannerDate))
              ) {
                return (
                  <CSSTransition key={todo._id} timeout={200} classNames="fade">
                    <Todo
                      todo={todo}
                      removeTodo={this.removeTodo}
                      isBacklog={isBacklog}
                      plannerDate={plannerDate}
                      isSelected={selectedItem === todo._id}
                    />
                  </CSSTransition>
                );
              } else {
                return null;
              }
            })}
          </TransitionGroup>
        </Rebass.Box>
      </Rebass.Panel>
    );
  }
}

export default observer(TodoList);
