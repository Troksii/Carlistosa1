import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import AddTraining from './AddTraining';
import EditTrainings from './EditTrainings';

export default function TrainingsList() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    useEffect(() => fetchData(), []);
    

    const dayjs = require('dayjs') 
    //import dayjs from 'dayjs' // ES 2015
    dayjs().format()

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    const handleClose = () => {
        setOpen(false);
    };
    const deleteTraining = (link) => {
        if (window.confirm('Delete?'))
        setOpen(true);
        fetch(link, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
       
    }
    
    const saveTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)

     })
    .then(res => fetchData())
    .catch(err => console.error(err))
    }

    const updateTraining = (training,link) => {
        fetch(link, {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
     }) 
     .then (res => fetchData())
     .catch (err => console.error(err))
     }
    
    const columns = [
        {
            Header: 'Date',
            accessor: 'date',
            Cell: (data) => {
                return dayjs(data.value).format("MM/DD/YYYY HH:mm")
              }
        },
        {
            Header: 'Duration',
            accessor: 'duration'

        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'First Name',
            accessor: 'customer.firstname'
        },
        {
            Header: 'Last Name',
            accessor: 'customer.lastname'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
        accessor: '_links.self.href',
        Cell: row => <Button size="small" color="error" onClick={() => deleteTraining(row.value)}>Delete</Button>
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditTrainings  updateTraining={updateTraining} training={row.original} />
        }


    ]

    return (
        <div>
            <AddTraining saveTraining={saveTraining} />
            <ReactTable filterable={true}  data={trainings} columns={columns} />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message=" deleted"
            />
            <TrainingsList />
        </div>
    );
}