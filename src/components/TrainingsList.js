import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Snackbar from '@mui/material/Snackbar';
//import Button from '@mui/material/Button';
//import Addcar from './Addcar';
//import Editcar from './Editcar';
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


    ]

    return (
        <div>
            <ReactTable filterable={true}  data={trainings} columns={columns} />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message=" deleted"
            />
        </div>
    );
}