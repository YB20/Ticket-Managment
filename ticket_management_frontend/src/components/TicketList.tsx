import React, { useEffect, useState } from 'react';
import { Ticket } from '../models/Ticket';
import { TicketService } from '../services/TicketService';
import { Link } from 'react-router-dom';

// Helper function to format the date
const formatDate = (date: string | Date): string => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const d = new Date(date);
  const day = (`0${d.getDate()}`).slice(-2);  // Add leading zero if needed
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${month}-${day}-${year}`;
};

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);  // Store ticket ID to delete
  const [showModal, setShowModal] = useState(false);  // Modal visibility state

  useEffect(() => {
    const fetchTickets = async () => {
      const fetchedTickets = await TicketService.getTickets();
      setTickets(fetchedTickets);
    };

    fetchTickets();
  }, []);

  // Open the modal and set the ticket to delete
  const confirmDelete = (id: number) => {
    setTicketToDelete(id);
    setShowModal(true);
  };

  // Handle the actual delete after confirmation
  const handleDelete = async () => {
    if (ticketToDelete !== null) {
      await TicketService.deleteTicket(ticketToDelete);
      setTickets(tickets.filter(ticket => ticket.ticketID !== ticketToDelete));
      setShowModal(false);
      setTicketToDelete(null);
    }
  };

  return (
    <div className="container pt-4" style={{ background: "#f0f0f0 !important" }}>
      <h1>Ticket Management</h1>
      <table className="table table-bordered shadow-sm p-3 mb-5 bg-white rounded" style={{ background: "#f0f0f0" }}>
        <thead>
          <tr>
            <th style={{ background: "#02a459", color: "white" }}>Ticket Id</th>
            <th style={{ background: "#02a459", color: "white" }}>Description</th>
            <th style={{ background: "#02a459", color: "white" }}>Status</th>
            <th style={{ background: "#02a459", color: "white" }}>Date</th>
            <th style={{ background: "#02a459", color: "white" }}>Actions</th>
          </tr>
        </thead>
        <tbody style={{ fontWeight: "bolder" }}>
          {tickets.map(ticket => (
            <tr key={ticket.ticketID}>
              <td style={{ background: "#f0f0f0" }}>{ticket.ticketID}</td>
              <td style={{ background: "#f0f0f0" }}>{ticket.description}</td>
              <td style={{ background: "#f0f0f0" }}>{ticket.status === 1 ? "Closed" : "Open"}</td>
              <td style={{ background: "#f0f0f0" }}>{formatDate(ticket.date)}</td>
              <td style={{ background: "#f0f0f0" }}>
                <Link to={`/edit-ticket/${ticket.ticketID}`} style={{ color: "#7946cb" }}>
                  <span className="link-opacity-100">Update</span>
                </Link>
                <Link to="#" className='ms-4' style={{ color: "#7946cb" }}>
                  <span className="link-opacity-100" onClick={() => confirmDelete(ticket.ticketID)}>Delete</span>
                </Link>
              </td>
            </tr>
          ))}
          <tr style={{ background: "#f0f0f0" }}>
            <td colSpan={5} className='pt-2 ps-2 pb-2' style={{ background: "#f0f0f0" }}>
              <Link to="/add-ticket" className="btn text-light " style={{ background: "#02a459" }}>
                Add New
              </Link>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this ticket?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;
