import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DateTimePicker from 'react-datetime-picker';


export default function AddTraining(props) { 
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date())
    const [training, setTraining] = React.useState({
        date: '', duration: '', activity: '', customer: props.params.value,
    })

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (date) => {
        setDate(date);
        setTraining({
          ...training,
          date: date
        })
      };

    const handleInputChange = (e) => {
        setTraining({...training, [e.target.name]: e.target.value})
    }
    
    const addTraining = () => {
        props.addTraining(training);
        handleClose();
    }

    return(
    <div>
    <Button size="small" variant="outlined" onClick={handleClickOpen}>
        Add training
    </Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add training</DialogTitle>
            <DialogContent>
                
            <DateTimePicker 
            onChange={handleChange}
            name = "date"
            format = "MM/dd/yyyy HH:mm"
            value={date} 
            />

                    <TextField
                    margin="dense"
                    name="duration"
                    value={training.duration}
                    onChange={e => handleInputChange(e)}
                    label="Duration"
                    fullWidth
                />
                        <TextField
                    margin="dense"
                    name="activity"
                    value={training.activity}
                    onChange={e => handleInputChange(e)}
                    label="Activity"
                    fullWidth
                />
               

            </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={addTraining}>Add</Button>
    </DialogActions>
    </Dialog>
    </div>

    );


}