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
            viewType: "Week"
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