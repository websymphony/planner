import { observer } from "mobx-react";
import moment from "moment";
import React, { Component, Fragment } from "react";
import ContentEditable from "react-contenteditable";
import * as Rebass from "rebass";

class Routine extends Component {
  constructor(props) {
    super(props);
    this.contentEditableRef = React.createRef();
  }

  componentDidMount() {
    this.contentEditableRef.current.htmlEl.focus();
  }

  removeRoutine = () => {
    this.props.removeRoutine(this.props.routine._id);
  };

  increaseFrequency = () => {
    this.props.routine.increaseFrequency();
  };

  decreaseFrequency = () => {
    this.props.routine.decreaseFrequency();
  };

  completionChange = i => {
    this.props.routine.completionChange(this.props.plannerDate, i);
  };

  setTitle = e => {
    this.props.routine.setTitle(e.target.value);
  };

  isCompletionChecked = index => {
    const { routine, plannerDate } = this.props;
    let result = false;
    Object.entries(routine.completed).forEach(([key]) => {
      let momentDate = moment(key);
      if (routine.isMonthly) {
        if (
          momentDate.isSameOrAfter(moment(plannerDate).startOf("month")) &&
          momentDate.isSameOrBefore(moment(plannerDate).endOf("month")) &&
          routine.completed[key][index] === true
        ) {
          result = true;
        }
      } else {
        if (
          momentDate.isSameOrAfter(moment(plannerDate).startOf("week")) &&
          momentDate.isSameOrBefore(moment(plannerDate).endOf("week")) &&
          routine.completed[key][index] === true
        ) {
          result = true;
        }
      }
    });
    return result;
  };

  render() {
    const { routine } = this.props;
    return (
      <Fragment>
        <Rebass.Divider
          w={1}
          borderColor="gray"
          my={3}
          className="lighterGrayBorder"
        />
        <Rebass.Flex
          justifyContent="space-between"
          my={1}
          mx={0}
          alignItems="start"
        >
          <Rebass.Box width={[1, 19 / 20]} mx={1}>
            <ContentEditable
              html={routine.title}
              disabled={false}
              onChange={this.setTitle}
              ref={this.contentEditableRef}
              className="contentEditable"
            />
          </Rebass.Box>
          <Rebass.ButtonCircle
            py={0}
            px={2}
            bg="white"
            color="black"
            onClick={this.removeRoutine}
            children="×"
          />
        </Rebass.Flex>
        <Rebass.Flex my={1} alignItems="center">
          <Rebass.Box>
            <Rebass.ButtonCircle
              py={0}
              px={1}
              bg="white"
              color="black"
              onClick={this.decreaseFrequency}
              children="–"
              mt={-1}
            />
            <Rebass.ButtonCircle
              py={0}
              px={2}
              bg="white"
              color="black"
              onClick={this.increaseFrequency}
              children="+"
              mt={-1}
              mx={1}
            />
            {[...Array(routine.frequency)].map((x, i) => {
              let checked = this.isCompletionChecked(i);
              return (
                <Rebass.Checkbox
                  key={i}
                  onChange={() => {
                    this.completionChange(i);
                  }}
                  checked={checked}
                />
              );
            })}
          </Rebass.Box>
        </Rebass.Flex>
      </Fragment>
    );
  }
}

export default observer(Routine);
