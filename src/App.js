import logo from './logo.svg';
import './App.css';
import TrainingsList from './components/TrainingsList';
import CustomersList from './components/CustomersList';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {  BrowserRouter,  Routes,  Route,  Link, Outlet, } from"react-router-dom";

function App() {
  return (
    <div className="App">
    <Box sx={{ flexGrow: 1 }}>
  <AppBar position="static">
    <Toolbar>
    <Link to="/">Customers </Link>
    <Link to="/TrainingsList">Trainings </Link>
    </Toolbar>
  </AppBar>
</Box>
<Routes>
        <Route path="/" element={<CustomersList/>} exact />
        <Route path="/TrainingsList" element={<TrainingsList/>} />
</Routes>
 
</div>
  );
}

export default App;
