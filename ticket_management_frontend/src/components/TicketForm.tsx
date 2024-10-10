import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ticket } from '../models/Ticket';
import { TicketService } from '../services/TicketService';

const TicketForm: React.FC = () => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<0 | 1>(0);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTicket = async () => {
      if (id) {
        const fetchedTicket = await TicketService.getTicket(Number(id));
        setTicket(fetchedTicket);
        setDescription(fetchedTicket.description);
        setStatus(fetchedTicket.status);
      }
    };

    fetchTicket();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTicket: Ticket = {
      ticketID: ticket ? ticket.ticketID : 0,
      description,
      status,
      date: new Date(),
    };

    if (ticket) {
      await TicketService.updateTicket(ticket.ticketID, newTicket);
    } else {
      await TicketService.createTicket(newTicket);
    }

    navigate('/');
  };

  return (
    <div className="container pt-4">
      <h1>{ticket ? 'Edit Ticket' : 'Add Ticket'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value) as 0 | 1)}
          >
            <option value="0">Open</option>
            <option value="1">Closed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">{ticket ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default TicketForm;
