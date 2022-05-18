import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import AddCustomer from './AddCustomer';
import EditCustomers from './EditCustomers';
import AddTraining from './AddTraining'

export default function CustomersList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    useEffect(() => fetchData(), []);
    const [message, setMessage] = useState('');
    const gridRef = useRef();
    
    const popupParent = useMemo(() => {
        return document.body;
      }, []);
      
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }; 

    const onBtnExport = () => {
        gridRef.current.exportDataAsCsv();
      };

    const deleteCustomer = (link) => {
        console.log(link)
        if (window.confirm('Delete customer?')) {
        setOpen(true);
        fetch(link, {method: 'DELETE'})
        .then(_ => setMessage('Customer deleted'))
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
    }
    
    const saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)

     })
    .then(res => fetchData())
    .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(_ => setMessage('Training added'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
    }
  

    const updateCustomer = (customer, link) => {
        fetch(link, {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
     }) 
     .then(_ => setMessage('Customer updated'))
     .then (res => fetchData())
     .catch (err => console.error(err))
     }
     
    const columns = [
        {
            headerName: 'First name',
            field: 'firstname',
            sortable: true, 
            filter: true,
        },
        {
            headerName: 'Last name',
            field: 'lastname',
            sortable: true, 
            filter: true,
        },
        {
            headerName: 'Address',
            field: 'streetaddress',
            sortable: true, 
            filter: true,
        },
        {
            headerName: 'Postcode',
            field: 'postcode',
            sortable: true, 
            filter: true,
        },
        {
            headerName: 'City',
            field: 'city',
            sortable: true, 
            filter: true,
        },
        {
            headerName: 'Email',
            field: 'email',
            sortable: true, 
            filter: true,
        },
        {
            headerName: 'Phone',
            field: 'phone',
            sortable: true, 
            filter: true,
        },
    
        {
            headerName: 'Delete',
            sortable: false,
            filter: false,
            width: 100,
            field: 'links.0.href',
            cellRenderer: params => <Button variant="outlined" size="small" color="error" onClick={() => deleteCustomer(params.value)}>Delete</Button>
        },
        {
            headerName: 'Edit',
            sortable: false,
            filter: false,
            field: 'links.0.href',
            width: 100,
            cellRenderer: params => <EditCustomers  updateCustomer={updateCustomer} params={params} />
        },

        {
            headerName: 'Add Training',
            sortable: false,
            filter: false,
            field: 'links.0.href',
            cellRenderer: params => <AddTraining addTraining={addTraining} params={params} />
        },
    ]


    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer} />
            <button onClick={onBtnExport}>Download CSV export file</button>
            <div className="ag-theme-alpine" style={{ height: '1000px', width: '1805px', margin: 'auto' }}>
          <AgGridReact
              
              ref={gridRef}
              onGridReady={params => {
                  gridRef.current = params.api
              }}
              suppressExcelExport={true}
              popupParent={popupParent}
              columnDefs={columns}
              rowData={customers}
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