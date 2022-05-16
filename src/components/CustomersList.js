import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import AddCustomer from './AddCustomer';
import EditCustomers from './EditCustomers';

export default function CustomersList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }; 

    const deleteCustomer = (link) => {
        if (window.confirm('Delete customer?')) {
        setOpen(true);
        fetch(link, {method: 'DELETE'})
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

    const updateCustomer = (link, customer) => {
        fetch(link, {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
     }) 
     .then (res => fetchData())
     .catch (err => console.error(err))
     }
    const columns = [
        {
            Header: 'First name',
            accessor: 'firstname'

        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
        accessor: 'links.0.href',
        Cell: row => <Button variant="outlined" color="error" onClick={() => deleteCustomer(row.value)}>Delete</Button>
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditCustomers  updateCustomer={updateCustomer} customer={row.original} />
        }

    ]


    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer} />
            <ReactTable filterable={true}  data={customers} columns={columns} />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Customer deleted"
            />
        </div>
    );
}