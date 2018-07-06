import { observer } from "mobx-react";
import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as Rebass from "rebass";
import Routine from "./Routine.js";

class RoutineList extends Component {
  addRoutine = () => {
    this.props.routineStore.addRoutine();
  };
  removeRoutine = _id => {
    this.props.routineStore.removeRoutine(_id);
  };
  render() {
    const { listHeading } = this.props;
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
                onClick={this.addRoutine}
                bg="black"
              />
            </Rebass.Box>
          </Rebass.Flex>
        </Rebass.Panel.Header>
        <Rebass.Box p={1}>
          <TransitionGroup>
            {this.props.routineStore.routines.map(routine => {
              return (
                <CSSTransition
                  key={routine._id}
                  timeout={200}
                  classNames="fade"
                >
                  <Routine
                    routine={routine}
                    removeRoutine={this.removeRoutine}
                    plannerDate={this.props.plannerDate}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </Rebass.Box>
      </Rebass.Panel>
    );
  }
}

export default observer(RoutineList);
