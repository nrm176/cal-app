import React, { useState } from 'react';
import './Calendar.css';

interface DateInfo {
    name: string;
    activity: number;
    date: string;
}

interface Project {
    project_name: string;
    dates: DateInfo[];
}

const jsonData: { projects: Project[] } = {
    "projects": [
        {
            "project_name": "xyz",
            "dates": [
                {
                    "name": "Mike birthday",
                    "activity": 1,
                    "date": "2023-01-30"
                },
                {
                    "name": "John birthday",
                    "activity": 3,
                    "date": "2023-01-13"
                }
            ]
        },
        {
            "project_name": "abc",
            "dates": [
                {
                    "name": "Mike birthday",
                    "activity": 1,
                    "date": "2023-01-10"
                },
                {
                    "name": "John birthday",
                    "activity": 3,
                    "date": "2023-02-01"
                }
            ]
        }
    ]
};

const Calendar: React.FC = () => {
    const [numberOfDays, setNumberOfDays] = useState<number>(200);
    const [startDate, setStartDate] = useState<string>('2023-01-01');

    const generateCalendar = () => {
        const calendar: JSX.Element[] = [];
        const monthHeader: JSX.Element[] = [];
        const dayHeader: JSX.Element[] = [];
        const startDateObj = new Date(startDate);

        const project = jsonData.projects[0];
        const projectName = project.project_name;
        const dates = project.dates;

        const getMonthNames = () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formatDayNumber = (date: Date) => String(date.getDate()).padStart(2, '0');

        const monthNames = getMonthNames();

        monthHeader[0] = (
            <div className="project-name"></div>);

        for (let day = 0; day < numberOfDays; day++) {
            const date = new Date(startDateObj);
            date.setDate(startDateObj.getDate() + day);
            if (date.getDate() === 1 || day === 0) {
                monthHeader.push(<div key={`month-${day}`} className="month-header">{monthNames[date.getMonth()]}</div>);
            } else {
                monthHeader.push(<div key={`month-${day}`} className="month-header"></div>);
            }
        }

        dayHeader[0] = (
            <div className="project-name"></div>
        )

        for (let day = 0; day < numberOfDays; day++) {
            const date = new Date(startDateObj);
            date.setDate(startDateObj.getDate() + day);
            dayHeader.push(<div key={`day-${day}`} className="day-header">{formatDayNumber(date)}</div>);
        }

        for (let day = 0; day < numberOfDays; day++) {
            calendar.push(<div key={`day-${day}`} className="day activity-level-0"></div>);
        }

        dates.forEach(dateInfo => {
            const date = new Date(dateInfo.date);
            const dayIndex = Math.floor((date.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24));
            calendar[0] = (
                <div className="project-name">TEST</div>
            )
            if (dayIndex >= 1 && dayIndex < numberOfDays) {
                calendar[dayIndex] = (
                    <div key={`day-${dayIndex}`} className={`day activity-level-${dateInfo.activity}`} title={`${dateInfo.name}: ${dateInfo.date}`}></div>
                );
            }
        });

        return { monthHeader, dayHeader, calendar, projectName };
    };

    const { monthHeader, dayHeader, calendar, projectName } = generateCalendar();

    return (
        <div className="bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Dynamic Days Activity Calendar</h1>

                <div className="mb-4">
                    <label htmlFor="days-input" className="mr-2">Number of Days:</label>
                    <input
                        type="number"
                        id="days-input"
                        className="border p-1"
                        value={numberOfDays}
                        min="1"
                        onChange={(e) => setNumberOfDays(parseInt(e.target.value, 10))}
                    />
                    <label htmlFor="start-date-input" className="mr-2 ml-4">Start Date:</label>
                    <input
                        type="date"
                        id="start-date-input"
                        className="border p-1"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <button onClick={generateCalendar} className="bg-blue-500 text-white p-1 ml-2">Generate</button>
                </div>

                <div className="calendar-container">
                    <div className="project-name">{projectName}</div>
                    <div id="month-header">{monthHeader}</div>
                    <div id="day-header">{dayHeader}</div>
                    <div id="calendar">{calendar}</div>
                </div>
            </div>
        </div>
    );
};
export default Calendar;