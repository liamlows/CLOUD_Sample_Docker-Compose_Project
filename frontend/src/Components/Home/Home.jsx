import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import "./Home.css";
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export const Home = () => {


    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 5,
                width: '100%',
                fontFamily: 'Roboto',
                maxWidth: 500
            }}>
                <Typography variant="h1" component="div" gutterBottom>
                    Welcome To Farm Finders
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
            }}>
                <Typography variant="h5" component="div"
                    sx={{
                        display: 'flex',
                        width: '40%',
                        pl: 10,
                        justifyContent: 'right'
                    }}>
                    Farm Finders is an online community where users can sell, buy, and connect with other farmers.
                    It's as easy as 1, 2, 3!
                </Typography>
                <Timeline
                    sx={{
                        display: 'flex',
                        width: '10%',
                        justifyContent: 'left'
                    }}>
                    <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                            #1
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot variant="outlined" color="primary" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Sign Up</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                            #2
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot variant="outlined" color="primary" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Connect With Other Farmers</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                            #3
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot variant="outlined" color="primary" />
                        </TimelineSeparator>
                        <TimelineContent>Buy, Sell, and RSPV to Farm Events</TimelineContent>
                    </TimelineItem>
                </Timeline>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 5,
                width: '100%',
                fontFamily: 'Roboto',
                maxWidth: 500
            }}>
                <Typography variant="h1" component="div" gutterBottom>
                    Welcome To Farm Finders
                </Typography>
            </Box>






        </>



    );
}