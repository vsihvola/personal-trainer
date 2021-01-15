import React, { useState, useEffect } from 'react';

export default function Customers(props){

  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetch(props.customer.links[2].href)
    .then(response => response.json())
    .then(response => setCustomer(response))
    .catch(err => console.error(err))
  }, []);

  return(
    <div>{customer.firstname + " " + customer.lastname}</div>
  )
}
