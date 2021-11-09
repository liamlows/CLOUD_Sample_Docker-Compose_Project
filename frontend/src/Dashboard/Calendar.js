import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "daypilot-pro-react";
import "./CalendarStyles.css";

const styles = {
    wrap: {
        display: "flex"
    },
    left: {
        marginRight: "10px"
    },
    main: {
        flexGrow: "1"
    }
};

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewType: "Week",
            events: [
                {
                  id: 1,
                  text: "Event 1",
                  start: "2021-11-11T10:30:00",
                  end: "2021-10-11T13:00:00"
                },
                {
                  id: 2,
                  text: "Event 2",
                  start: "2021-11-12T09:30:00",
                  end: "2021-11-12T11:30:00",
                  backColor: "#38761d"
                },
                {
                  id: 2,
                  text: "Event 3",
                  start: "2021-11-12T12:00:00",
                  end: "2021-11-13T15:00:00",
                  backColor: "#cc4125"
                },
              ]
        };
    }

    render() {

        function handleAddEvent(e) {
            //TODO: figure out how to manually create an event
        }

        var {...config} = this.state;
        return (
            <div style={styles.wrap}>
                <button onClick={handleAddEvent}>Add Event</button>
                <div style={styles.left}>
                    <DayPilotNavigator
                        selectMode={"week"}
                        showMonths={1}
                        skipMonths={1}
                        onTimeRangeSelected={ args => {
                            this.setState({
                                startDate: args.day
                            });
                        }}
                    />
                    </div>
                    <div style={styles.main}>
                    <DayPilotCalendar
                        {...config}
                        ref={component => {
                            this.calendar = component && component.control;
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Calendar;