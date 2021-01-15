import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';

const schedulerData = [
  { startDate: '2021-01-15T18:44', endDate: '2021-01-15T19:44', title: 'Fitness' },
  { startDate: '2021-01-15T16:44', endDate: '2021-01-15T17:44', title: 'Spinning' },
  { startDate: '2021-01-15T16:44', endDate: '2021-01-15T17:44', title: 'Gym training' },
  { startDate: '2021-01-15T17:40', endDate: '2021-01-15T18:25', title: 'Jogging' },
  { startDate: '2021-01-15T18:25', endDate: '2021-01-15T18:55', title: 'Cycling' },
  { startDate: '2021-01-21T12:00', endDate: '2021-01-21T13:00', title: 'Gaming' },
  { startDate: '2021-01-14T12:00', endDate: '2021-01-14T13:00', title: 'Running' },
  { startDate: '2021-01-12T12:00', endDate: '2021-01-12T13:00', title: 'Test for project' },

];



export default function Calendar() {

  const [ data, setData ] = useState([]);
  const [ cal, setCal] = useState({startDate: '', endDate:'', title:''});
  const [ status, setStatus] = useState(false);
  const { currentViewName, setCurrentViewName} = useState({currentViewName: 'week'});

  useEffect(() => {

  }, []);

  useEffect(() => {
    Object.keys(data).map((e, i) => {
      const date = moment(data[i].date.substring(0, 16));
      const mom = moment(date._i).add(90, 'minutes');
      setCal({...cal, startDate: date._i.toString(), endDate: mom.format().substring(0, 16), title: data[e].activity });
    })
  }, [data])

  const currentViewNameChange = (currentViewName) => {
    setCurrentViewName(currentViewName);
  }
    return (

      <div style={{marginTop: "5rem"}}>

        <Paper>
          <Scheduler
            data={schedulerData}
            currentViewName="week"
            height={660}
          >
            <ViewState
              defaultCurrentDate={new Date()}
            />

            <WeekView
              startDayHour={10}
              endDayHour={20}
            />
            <WeekView
              name="work-week"
              displayName="Work Week"
              excludedDays={[0, 6]}
              startDayHour={9}
              endDayHour={19}
            />
            <MonthView />
            <DayView />

            <Toolbar />
            <ViewSwitcher />
            <Appointments />
          </Scheduler>
        </Paper>

      </div>

    );

}
