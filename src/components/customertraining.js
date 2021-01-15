import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CustomerTraining(props){
  const [open, setOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => fetchTrainings());

  const fetchTrainings = () => {
    fetch(props.link)
    .then(res => res.json())
    .then(res => setTrainings(res.content))
    .catch(err => console.error(err))
  }

  return(
    <div>
      <Button color="primary" onClick={handleClickOpen}>Activities</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <div>
              <table>
                <tbody>
                {trainings.map(function (training, index)  {
                  if(training.hasOwnProperty('activity')){
                    return(
                      <tr key={index}>
                        <td>{training.activity}</td>
                        <td>{new Date(training.date).toISOString().substring(0, 10)}</td>
                      </tr>
                  )} else {
                    return(
                      <tr key={index}><td>No activies</td></tr>
                    )
                  }
                })}
                </tbody>
              </table>
            </div>
          </DialogContent>
      </Dialog>
    </div>
  )
}
