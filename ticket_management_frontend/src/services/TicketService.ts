import axios from 'axios';
import { Ticket } from '../models/Ticket';

const apiUrl = 'https://localhost:7112/api/tickets';
const getTickets = async (page: number = 1, pageSize: number = 10): Promise<Ticket[]> => {
  const response = await axios.get(`${apiUrl}?page=${page}&pageSize=${pageSize}`);
  console.log(response.data);
  
  return response.data;
};

const getTicket = async (id: number): Promise<Ticket> => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};

const createTicket = async (ticket: Ticket): Promise<Ticket> => {
  const response = await axios.post(apiUrl, {
    description: ticket.description,
    status: ticket.status
  }
);
  return response.data;
};

const updateTicket = async (id: number, ticket: Ticket): Promise<void> => {
  await axios.put(`${apiUrl}/${id}`, ticket);
};

const deleteTicket = async (id: number): Promise<void> => {
  await axios.delete(`${apiUrl}/${id}`);
};

export const TicketService = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
