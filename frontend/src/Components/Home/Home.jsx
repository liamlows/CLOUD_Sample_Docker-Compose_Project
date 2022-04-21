import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export const Home = () => {
    

    return (
        <Timeline>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined" color="primary"/>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Sell</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined" color="primary"/>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Buy</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot variant="outlined" color="primary"/>
                </TimelineSeparator>
                <TimelineContent>Connect</TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}