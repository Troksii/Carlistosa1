import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditTrainings(props) { 
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', duration: '', activity: '', firstname: '', lastname: '',
    })


    const handleClickOpen = () => {
        console.log(props.training);
        setTraining({date : props.training.date, duration: props.training.duration, activity: props.training.activity, fuel: props.training.firstname, year: props.training.lastname})
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setTraining({...training, [e.target.name]: e.target.value})
    }
    
    const handleSave = () => {
        props.updateTraining(training, props.training._links.training.href);
        handleClose()
    }

    return(
    <div>
    <Button variant="outlined"  onClick={handleClickOpen} size="small">
        Edit
    </Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit training</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="date"
                    value={training.date}
                    onChange={e => handleInputChange(e)}
                    label="Date"
                    fullWidth
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
                        <TextField
                    margin="dense"
                    name="firstname"
                    value={training.firstname}
                    onChange={e => handleInputChange(e)}
                    label="Firstname"
                    fullWidth
                />
                         <TextField
                    margin="dense"
                    name="lastname"
                    value={training.lastname}
                    onChange={e => handleInputChange(e)}
                    label="Lastname"
                    fullWidth
                />
              
            </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Update</Button>
    </DialogActions>
    </Dialog>
    </div>

    );


}

