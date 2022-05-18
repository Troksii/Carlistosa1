import React, { useState, useEffect } from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import moment from 'moment'

export default function TrainingsCalendar () {
  const localizer = momentLocalizer(moment);
  const [session, setSession] = useState([]);

  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(trainings => {
        return setSession(
          trainings.map((training, id) => ({
            id: id,
            title: training.activity + " - " + training.customer.firstname,
            start: moment(training.date)._d,
            end: moment(training.date).add(training.duration, 'minutes')._d
          }))
        )
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getTrainings();
  }, [])

  return (
    <div>
    <Calendar localizer = {localizer}
              events = {session}
              startAccessor = "start"
              endAccessor = "end"
              style = {
                {
                  height: '1000px',
                  width: '80%',
                  margin: 'auto'
                }
              } />
    </div>
  )
}