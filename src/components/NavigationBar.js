import { Link, navigate } from "@reach/router";
import { observer } from "mobx-react";
import moment from "moment";
import React, { Component } from "react";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import * as Rebass from "rebass";
import Lib from "./../utils/lib.js";
import Search from "./Search.js";

class NavigationBar extends Component {
  state = {
    currentTime: moment()
  };

  onDateChange = plannerDate => {
    navigate(`/${Lib.saveableDateFormat(plannerDate)}`);
  };

  tick = () => {
    this.setState({
      currentTime: moment()
    });
  };

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  isDayHighlighted = day => {
    const { todoStore, noteStore } = this.props;
    const formattedDate = Lib.saveableDateFormat(day);
    const allDates = todoStore.todoDates.concat(noteStore.noteDates);
    return (
      allDates.findIndex(date => {
        return date === formattedDate;
      }) !== -1
    );
  };

  render() {
    const { plannerDate, todayDate, todoStore, noteStore } = this.props;
    return (
      <Rebass.Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        mb={1}
        bg="gray"
      >
        <Rebass.Box width={[1, 15 / 100]}>
          <Rebass.Flex flexWrap="wrap" justifyContent="space-around">
            <Rebass.Box width={[1, 1 / 5]}>
              <Link to={todayDate} className="todayLink">
                Today:
              </Link>
            </Rebass.Box>
            <Rebass.Box width={[1, 4 / 5]}>
              <Rebass.Text my={0}>
                {this.state.currentTime.format("MM/DD/YY h:mm a")}
              </Rebass.Text>
            </Rebass.Box>
          </Rebass.Flex>
        </Rebass.Box>
        <Rebass.Box width={[1, 10 / 100]}>
          <SingleDatePicker
            date={plannerDate} // momentPropTypes.momentObj or null
            onDateChange={this.onDateChange} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            id="single_date_picker" // PropTypes.string.isRequired,
            small={true}
            readOnly={true}
            isOutsideRange={() => false}
            orientation="vertical"
            isDayHighlighted={day => this.isDayHighlighted(day)}
          />
        </Rebass.Box>
        <Rebass.Box width={[1, 10 / 100]}>
          <Search todoStore={todoStore} noteStore={noteStore} />
        </Rebass.Box>
      </Rebass.Flex>
    );
  }
}

export default observer(NavigationBar);
