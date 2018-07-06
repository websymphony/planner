import { observer } from "mobx-react";
import React, { Component, Fragment } from "react";
import ContentEditable from "react-contenteditable";
import * as Rebass from "rebass";
import Lib from "../utils/lib.js";
import HighlightDiv from "./HighlightDiv.js";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.contentEditableRef = React.createRef();
  }

  componentDidMount() {
    const { isSelected, todo } = this.props;
    if (isSelected || todo.content === "") {
      this.contentEditableRef.current.htmlEl.focus();
    }
  }

  removeTodo = () => {
    this.props.removeTodo(this.props.todo._id);
  };

  setContent = e => {
    this.props.todo.setContent(e.target.value);
  };

  toggleCompleted = () => {
    this.props.todo.toggleCompleted();
  };

  removeDate = () => {
    this.props.todo.removeDate();
  };

  setDate = () => {
    this.props.todo.setDate(Lib.saveableDateFormat(this.props.plannerDate));
  };

  render() {
    const { todo, isBacklog } = this.props;
    return (
      <Fragment>
        <Rebass.Divider
          w={1}
          borderColor="gray"
          my={3}
          className="lighterGrayBorder"
        />
        <Rebass.Flex
          my={1}
          mx={0}
          justifyContent="space-between"
          alignItems="end"
        >
          {isBacklog ? (
            <Rebass.ButtonCircle
              py={0}
              px={2}
              mx={1}
              bg="white"
              color="black"
              onClick={this.setDate}
              children="←"
            />
          ) : null}
          <Rebass.Checkbox
            onChange={this.toggleCompleted}
            checked={todo.completed}
          />
          <Rebass.Box width={[1, 28 / 30]} mx={1}>
            {this.props.isSelected ? (
              <HighlightDiv>
                <ContentEditable
                  html={todo.content}
                  disabled={false}
                  onChange={this.setContent}
                  ref={this.contentEditableRef}
                  className="contentEditable"
                />
              </HighlightDiv>
            ) : (
              <ContentEditable
                html={todo.content}
                disabled={false}
                onChange={this.setContent}
                ref={this.contentEditableRef}
                className="contentEditable"
              />
            )}
          </Rebass.Box>
          <Rebass.ButtonCircle
            py={0}
            px={2}
            bg="white"
            color="black"
            onClick={this.removeTodo}
            children="×"
          />
          {!isBacklog && !todo.completed ? (
            <Rebass.ButtonCircle
              py={0}
              px={2}
              bg="white"
              color="black"
              onClick={this.removeDate}
              children="→"
            />
          ) : null}
        </Rebass.Flex>
      </Fragment>
    );
  }
}

export default observer(Todo);
