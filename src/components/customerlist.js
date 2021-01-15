import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import ModifyCustomer from './modifycustomer'
import AddTraining from './addtraining'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import 'react-table/react-table.css';
import '../index.css';
import moment from 'moment';

export default function CustomerList(){
  const [customers, setCustomers] = useState([]);
  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(response => setCustomers(response.content))
    .catch(err => console.error(err))
  }

  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure?')){
      fetch(link, {method: 'DELETE'})
      .then(response => fetchData())
      .catch(err => console.error(err))
    }
  }

  const modifyCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
  }

  const addTraining = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "date": moment(customer.date).toISOString(),
        "activity": customer.activity,
        "duration": customer.duration,
        "customer": customer.link
      })
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
  }

  const columns = [
    {
      Header: 'First Name',
      accessor: 'firstname'
    },
    {
      Header: 'Last Name',
      accessor: 'lastname'
    },
    {
      Header: 'Email',
      accessor: 'email',
      width: 200
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    {
      Header: 'Address',
      accessor: 'streetaddress'
    },
    {
      Header: 'Postcode',
      accessor: 'postcode',
      width: 90
    },
    {
      Header: 'City',
      accessor: 'city'
    },
    {
    Header: 'Add',
    sortable: false,
    filterable: false,
    accessor: 'links[2].href',
    width: 50,
    Cell: row => <AddTraining addTraining={addTraining} customer={row.original}/>
    },
    {
      Header: 'Remove',
      sortable: false,
      filterable: false,
      accessor: 'links[0].href',
      width: 100,
      Cell: ({value}) => <IconButton style={{ margin:'auto'}} size='small' color='secondary' onClick={() => deleteCustomer(value)}><DeleteIcon style={{margin: 'auto'}}/></IconButton>
    },
    {
      Header: 'Edit',
      sortable: false,
      filterable: false,
      accessor: 'links[0].href',
      width: 50,
      Cell: row => <ModifyCustomer modifyCustomer={modifyCustomer} customer={row.original}/>
    },
  ]

  return (
    <div style={{width: '1200px', margin: 'auto', marginTop: '5rem'}}>
        <ReactTable defaultPageSize={10} filterable={true} data={customers} columns={columns} />
    </div>
  );

}
