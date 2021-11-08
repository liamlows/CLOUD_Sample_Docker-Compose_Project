import React, { useEffect, useState } from 'react';
import Calendar from './Calendar';
import './Dashboard.css';

const Dashboard = () => {

    return (
        <div className="Dashboard">
            <header>
                head
            </header>
            <div>
                This Week's Schedule
            </div>
            <Calendar />
        </div>
    )
}

export default Dashboard;