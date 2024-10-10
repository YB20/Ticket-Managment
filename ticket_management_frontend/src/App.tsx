import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddTicket from './pages/AddTicket';
import TicketForm from './components/TicketForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-ticket" element={<AddTicket />} />
        <Route path="/edit-ticket/:id" element={<TicketForm />} />
      </Routes>
    </Router>
  );
};

export default App;
