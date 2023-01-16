import React from 'react'
import SmallCalendar from '../components/SmallCalendar';

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    SmallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    dispatchCalEvent: ({type, payload})=> {},
    savedEvents: [],
    setSelectedEvent: () => {},
    selectedEvent: null,
    setLabels: () => {},
    labels: [],
    updateLabel: () => {},
    filteredEvents: []
})

export default GlobalContext;
