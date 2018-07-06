import { observer } from "mobx-react";
import React, { Component, Fragment } from "react";
import ContentEditable from "react-contenteditable";
import * as Rebass from "rebass";
import HighlightDiv from "./HighlightDiv.js";

class Note extends Component {
  constructor(props) {
    super(props);
    this.contentEditableRef = React.createRef();
  }

  componentDidMount() {
    const { isSelected, note } = this.props;
    if (isSelected || note.content === "") {
      this.contentEditableRef.current.htmlEl.focus();
    }
  }

  removeNote = () => {
    this.props.removeNote(this.props.note._id);
  };

  setContent = e => {
    this.props.note.setContent(e.target.value);
  };

  render() {
    const { note } = this.props;
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
          alignItems="start"
        >
          <Rebass.Box width={[1, 29 / 30]} mx={1}>
            {this.props.isSelected ? (
              <HighlightDiv>
                <ContentEditable
                  html={note.content}
                  disabled={false}
                  onChange={this.setContent}
                  ref={this.contentEditableRef}
                  className="contentEditable"
                />
              </HighlightDiv>
            ) : (
              <ContentEditable
                html={note.content}
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
            onClick={this.removeNote}
            children="×"
          />
        </Rebass.Flex>
      </Fragment>
    );
  }
}

export default observer(Note);
