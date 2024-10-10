import React from 'react';
import TicketForm from '../components/TicketForm';

const AddTicket: React.FC = () => {
  return (
    <div style={{background:"#f0f0f0", minHeight:"100vh"}}>
      <TicketForm />
    </div>
  );
};

export default AddTicket;
