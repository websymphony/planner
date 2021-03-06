import { observer } from "mobx-react";
import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as Rebass from "rebass";
import Lib from "../utils/lib.js";
import Note from "./Note.js";

class NoteList extends Component {
  addNote = () => {
    this.props.noteStore.addNote(
      Lib.saveableDateFormat(this.props.plannerDate)
    );
  };
  removeNote = _id => {
    this.props.noteStore.removeNote(_id);
  };
  render() {
    const { plannerDate, listHeading, selectedItem } = this.props;
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
                onClick={this.addNote}
                bg="black"
              />
            </Rebass.Box>
          </Rebass.Flex>
        </Rebass.Panel.Header>
        <Rebass.Box p={1}>
          <TransitionGroup>
            {this.props.noteStore.notes.map(note => {
              if (note.date === Lib.saveableDateFormat(plannerDate)) {
                return (
                  <CSSTransition key={note._id} timeout={200} classNames="fade">
                    <Note
                      note={note}
                      removeNote={this.removeNote}
                      plannerDate={plannerDate}
                      isSelected={selectedItem === note._id}
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

export default observer(NoteList);
