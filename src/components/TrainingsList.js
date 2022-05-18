import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import AddTraining from './AddTraining';
import EditTrainings from './EditTrainings';

export default function TrainingsList() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const gridRef = useRef()
    const [message, setMessage] = useState('')
    useEffect(() => fetchData(), []);
    
    const dayjs = require('dayjs') 
    //import dayjs from 'dayjs' // ES 2015
    dayjs().format()

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const onBtnExport = () => {
        gridRef.current.exportDataAsCsv();
      };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteTraining = (link) => {
        console.log(link)
        if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + link.data.id, {
                method: 'DELETE'
            })
                .then(_ => setMessage('Training deleted'))
                .then(_ => gridRef.current.refreshCells({ rowNodes: fetchData() }))
                .then(_ => setOpen(true))
                .catch(err => console.error(err))
        }
    }


    const updateTraining = (training, link) => {
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
            headerName: 'Date',
            sortable: true, 
            filter: true,
            field: 'date',
            cellRenderer: (data) => {
                return dayjs(data.value).format("MM/DD/YYYY HH:mm")
              }
        },
        {
            headerName: 'Duration',
            field: 'duration',
            sortable: true, 
            filter: true,

        },
        {
            headerName: 'Activity',
            field: 'activity',
            sortable: true, 
            filter: true,
        },
        {
            headerName: 'First Name',
            field: 'customer.firstname',
            sortable: true, 
            filter: true,
        },
        {
            headerName: 'Last Name',
            field: 'customer.lastname',
            sortable: true, 
            filter: true,
        },
        {
            headerName: 'Delete',
            width: 100,
            field: 'links.0.href',
            sortable: false, 
            filter: false,
            cellRenderer: params => <Button size="small" variant="outlined"  color="error" onClick={() => deleteTraining(params)}>Delete</Button>
        },


    ]

    return (
        <div> 
            <button onClick={onBtnExport}>Download CSV export file</button>
            <div className="ag-theme-alpine" style={{ height: '1000px', width: '1100px', margin: 'auto' }}>
            <AgGridReact
              suppressCellFocus={true}
              ref={gridRef}
              onGridReady={params => {
                  gridRef.current = params.api
              }}
              columnDefs={columns}
              rowData={trainings}
              pagination={true}
              paginationPageSize={20}>
          </AgGridReact>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
            />
           </div>
           </div>
    );
}