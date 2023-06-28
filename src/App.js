import logo from './logo.svg';
import './App.css';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
// import {useState} from 'react';
import enUS from 'date-fns/locale/en-US'
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import withDragAndDrop, {withDragAndDropProps} from 'react-big-calendar/lib/addons/dragAndDrop';

const DnDCalendar = withDragAndDrop(Calendar);

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [
    {
        title: "Big Meeting",
        allDay: false,
        // start: new Date(2023, 5, 20),
        // end: new Date(2023, 5, 22),
        start: moment('2023-06-22T10:00:00').toDate(),
        end:moment('2023-06-22T11:00:00').toDate()
      
        // start:moment().format('June 24th 2023, 10:00:00 '),
        // end:moment().format('June 24th 2023, 11:00:00 ')
    },
    {
        title: "Vacation",
        start: new Date(2021, 6, 7),
        end: new Date(2021, 6, 10),
    },
    {
        title: "Conference",
        start: new Date(2021, 6, 20),
        end: new Date(2021, 6, 23),
    },
];

function App() {
  const [newEvent, setNewEvent] = useState({title:"", start:"", end:""})
  const [allEvents, setAllEvents] = useState(events);
  function handleAddEvent(){
    setAllEvents(...allEvents, newEvent)
  }
  function moveEvent(event, start, end){
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    // const nextEvents = [...events];
    setNewEvent(updatedEvent);
    handleAddEvent();
    // nextEvents.splice(idx, 1, updatedEvent);
  }
  // moveEvent({ event, start, end }) {
  //   const { events } = this.state;

  //   const idx = events.indexOf(event);
  //   const updatedEvent = { ...event, start, end };

  //   const nextEvents = [...events];
  //   nextEvents.splice(idx, 1, updatedEvent);

  //   this.setState({
  //     events: nextEvents
  //   });
  // }
  // const onEventDrop = ({event, start, end, isAllDay}) => {
  //   const updatedEvent = {...event, start, end, isAllDay};
  //   // Any other logic. If async saving your change, you'll probably
  //   // do the next line in a `.then()`
  //   setAllEvents((prevEvents) => {
  //     const filtered = prevEvents.filter((item) => item.id !== event.id);
  //     return [...filtered, updatedEvent];
  //   });
  // };
  // const onEventDrop = withDragAndDropProps['onEventDrop'] = data => {
  //   console.log(data)
  // }
  return (
    <div className="App">
      <h1>Calendar</h1>
      <h2>Add new event</h2>
      <div>
        <input type='text' placeholder='Add title' style={{width: "20%", marginRight: "10px"}} value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title:e.target.value})} />
        <DatePicker placeholderText='Start Date' style={{marginRight:"10px"}} selected={newEvent.start} onChange={(start)=>setNewEvent({...newEvent, start})} />
        <DatePicker placeholderText='End Date' style={{marginRight:"10px"}} selected={newEvent.end} onChange={(end)=>setNewEvent({...newEvent, end})} />
        <button style={{matginTop: "10px"}} onClick={handleAddEvent}>Add event</button>
      </div>
      <DnDCalendar localizer={localizer} events = {events} startAccessor="start" onEventDrop={moveEvent} endAccessor="end" style = {{height:500, margin:"50px"}} />
    </div>
  );
}

export default App;
