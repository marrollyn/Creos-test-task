//import { useState } from 'react'
//import './App.css'
//import React, { useState, useEffect } from 'react';

function Header() {
    
    function getWeekNumber() {
        const currentDate = new Date();
        const currentYear = new Date(currentDate.getFullYear(), 0, 0);
        const currentWorkWeek = Math.floor((currentDate.valueOf() - currentYear.valueOf() - 10*60*60*1000)/(1000*60*60*24*7) + 1)

        // const startOfYear = new Date(now.getFullYear(), 0, 0);
        // const diff = now - startOfYear;
        // const oneWeek = 1000 * 60 * 60 * 24 * 7;
        // const weekNumber = Math.floor(diff / oneWeek);
        return currentWorkWeek;
    }

    // const [weekNumber, setWeekNumber] = useState(getWeekNumber());

    // function getWorkWeekNumber () {
    //     const currentDate = Date.now();
    // }

    return (
        <header>
            <h1>GraphTrack CRM</h1> 
            <button>RU</button>
            <button>EN</button>
            <p>Week Number {getWeekNumber()}</p>
        </header>
    );
}

export default Header
