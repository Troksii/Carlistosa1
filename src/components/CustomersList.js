import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
//import AddCustomer from './AddCustomer';
//import EditCustomers from './Editcustomers';

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

    ]

    return (
        <div>

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