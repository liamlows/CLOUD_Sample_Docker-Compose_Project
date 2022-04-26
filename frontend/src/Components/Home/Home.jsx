import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import "./Home.css";
import LandingImage from '../../images/landing_img.jpg';
import LandingImageTwo from '../../images/farm_icon.png';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Grid, Slide, Typography, useMediaQuery, useTheme } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, NavLink, useNavigate } from 'react-router-dom';

export const Home = () => {
    const theme = createTheme({
        typography: {
            fontFamily: [
                'Josefin Slab'
            ].join(",")
        }
    });

    return (
        <>
            {<ThemeProvider theme={theme}>
                <div className="home-container">
                    <Card sx={{ display: 'flex' }}>
                        <div id="landingImg">
                            <CardMedia
                                component="img"
                                sx={{ width: 450 }}
                                image={LandingImage}
                                alt="Landing Img"
                            />
                        </div>

                        <div id="header">
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography variant='h2' textAlign={'center'} sx={{ fontWeight: '100', mb: 2, }}>
                                        Welcome to Farm
                                    </Typography>
                                    <Typography variant='h2' textAlign={'center'} sx={{ fontWeight: '100', mb: 2 }}>
                                        Finders
                                    </Typography>


                                    <div id="subheading">
                                        <Typography textAlign={'center'} sx={{ fontWeight: '100', mb: 2 }}>
                                            We help farmers connect with each
                                        </Typography>
                                        <Typography textAlign={'center'} sx={{ fontWeight: '100', mb: 2 }}>
                                            other to buy, sell, and host events!
                                        </Typography>
                                    </div>
                                    <Link to={'/login'}>
                                        <Button variant="contained" color="success" sx={{ pl: 5, pr: 5 }}>
                                            <Typography textAlign="center">Login</Typography>
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Box>
                        </div>
                    </Card>


                    <div id="secondLanding">
                        <Card sx={{ display: 'flex' }}>
                            <CardContent>
                                <Timeline id="timeline">
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>Create your account and choose if you are a farmer or not </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>Post items & buy items from other farmers in your area</TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                        </TimelineSeparator>
                                        <TimelineContent>Host or attend events from farms</TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                            </CardContent>
                            <div id="timelineimg">
                                <CardMedia
                                    component="img"
                                    sx={{ width: 350 }}
                                    image={LandingImageTwo}
                                    alt="Landing Img"
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </ThemeProvider> }

        </>



    );
} 