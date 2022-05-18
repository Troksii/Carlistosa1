import logo from './logo.svg';
import './App.css';
import TrainingsList from './components/TrainingsList';
import CustomersList from './components/CustomersList';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {  BrowserRouter,  Routes,  Route,  Link, Outlet, } from"react-router-dom";
import Button from '@mui/material/Button';
import TrainingsCalendar from './components/TrainingsCalendar';

function App() {
  
  return (
    <div className="App">
    <Box sx={{ flexGrow: 1 }}>
  <AppBar position="static">
    <Toolbar>
    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
    <Button variant="outlined">
      <Link to="/">Customers </Link>
      </Button>
      <Button variant="outlined">
    <Link to="/TrainingsList">Trainings </Link>
    </Button>
    <Button variant="outlined">
      <Link to="/Calendar">Calendar</Link>
      </Button>
    </Typography>
    </Toolbar>
  </AppBar>
</Box>
<Routes>
        <Route path="/" element={<CustomersList/>} exact />
        <Route path="/TrainingsList" element={<TrainingsList/>} />
        <Route path="/Calendar" element={<TrainingsCalendar/>} />
</Routes>
 
</div>
  );
}

export default App;
