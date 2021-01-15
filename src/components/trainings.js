import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Customers from './customers'
import 'react-table/react-table.css';
import '../index.css';
import moment from 'moment';

export default function Tranings(){
  const [trainings, setTrainings] = useState([]);
  useEffect(() => fetchData(), []);


  const fetchData = () => {
    let getTrainings = 'https://customerrest.herokuapp.com/api/trainings'
    fetch(getTrainings)
    .then(response => response.json())
    .then(response => setTrainings(response.content))
    .catch(err => console.error(err))
  }


  const columns = [
    {
      Header: 'Activity',
      accessor: 'activity'
    },
    {
      Header: '',
      accessor: 'date',
      Cell: (props) => {const customDate = moment(props.value).format("MMMM Do YYYY, h:mm:ss"); return <span>{customDate}</span>}
    },
    {
      Header: 'Duration',
      accessor: 'duration'
    },
    {
      Header: 'Customer',
      accessor: 'links[2].href',
      sortable: false,
      Cell: row => <Customers customer={row.original}/>
    },
  ]
  return(
    <div style={{width: '1200px', margin: 'auto', marginTop: '5rem'}}>
        <ReactTable defaultPageSize={10} filterable={true} data={trainings} columns={columns} />
    </div>
  )
}
