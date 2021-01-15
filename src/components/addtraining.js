import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

export default function AddTraining(props){

  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: new Date(), activity: '', duration: '', link: ''
  })

  const handleClickOpen = () => {
    setTraining({...training, link: props.customer.links[0].href })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value })
  }

  const addTraining = () => {
    props.addTraining(training);
    handleClose();
  }

  return(
    <div style={{margin: 'auto', justifyContent: 'center', display: 'flex'}}>
      <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddBoxIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add training</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              type="date"
              margin="dense"
              name="date"
              value={training.date}
              onChange={e => handleInputChange(e)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="activity"
              value={training.activity}
              onChange={e => handleInputChange(e)}
              label="Activity"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="duration"
              value={training.duration}
              onChange={e => handleInputChange(e)}
              label="Duration"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={addTraining} color="primary">
              Add training
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
