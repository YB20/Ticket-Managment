import React from 'react';
import TicketList from '../components/TicketList';

const Home: React.FC = () => {
  return (
    <div style={{background:"#f0f0f0", minHeight:"100vh"}}>
      <TicketList />
    </div>
  );
};

export default Home;
