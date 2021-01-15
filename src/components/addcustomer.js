import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

export default function AddCustomer() {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '',});
  const handleClickOpen = () => {
    setOpen(true);
  };



  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value })
  }


  const addCustomer = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'id' : '1',
        'firstname': customer.firstname,
        'lastname': customer.lastname,
        'streetaddress': customer.streetaddress,
        'postcode': customer.postcode,
        'city': customer.city,
        'email': customer.email,
        'phone': customer.phone
      })
    };
    fetch('https://customerrest.herokuapp.com/api/customers', requestOptions)
    .then(response => response.json())
    .catch(err => console.error(err))
    handleClose();
  }


  return(
    <div>
      <Button color="primary" onClick={handleClickOpen}></Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Customer</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              label="First name"
              value={customer.firstname}
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="lastname"
              label="Last name"
              value={customer.lastname}
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="streetaddress"
              label="Address"
              value={customer.streetaddress}
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="postcode"
              label="Postcode"
              value={customer.postcode}
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="city"
              label="City"
              value={customer.city}
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="Email"
              value={customer.email}
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="phone"
              label="Phone"
              value={customer.phone}
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <Button variant="outlined" onClick={() => addCustomer()}>Add Customer</Button>
          </DialogContent>
      </Dialog>
    </div>
  )
}
