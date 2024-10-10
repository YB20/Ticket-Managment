import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TicketService } from '../../services/TicketService';
import TicketList from '../TicketList';
import { BrowserRouter } from 'react-router-dom';

// Mocking TicketService for testing purposes
jest.mock('../../services/TicketService');

const mockTickets = [
  { ticketID: 1, description: 'Test Ticket 1', status: 0, date: '2023-10-07' },
  { ticketID: 2, description: 'Test Ticket 2', status: 1, date: '2023-10-08' },
];

describe('TicketList Component', () => {
  beforeEach(() => {
    // Mock the API call to fetch tickets
    (TicketService.getTickets as jest.Mock).mockResolvedValue(mockTickets);
  });

  test('renders tickets correctly', async () => {
    render(
      <BrowserRouter>
        <TicketList />
      </BrowserRouter>
    );

    // Ensure the loading state or header is rendered
    expect(screen.getByText('Ticket Management')).toBeInTheDocument();

    // Wait for the tickets to be fetched and rendered
    const ticket1 = await screen.findByText('Test Ticket 1');
    const ticket2 = await screen.findByText('Test Ticket 2');

    expect(ticket1).toBeInTheDocument();
    expect(ticket2).toBeInTheDocument();
  });

  test('opens delete confirmation modal on delete click', async () => {
    render(
      <BrowserRouter>
        <TicketList />
      </BrowserRouter>
    );

    // Wait for tickets to render
    const deleteButton = await screen.findAllByText('Delete');
    fireEvent.click(deleteButton[0]);  // Simulate clicking on the first delete button

    // Check that the modal opens
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
  });

  test('cancels delete operation when modal cancel is clicked', async () => {
    render(
      <BrowserRouter>
        <TicketList />
      </BrowserRouter>
    );

    // Open the delete modal
    const deleteButton = await screen.findAllByText('Delete');
    fireEvent.click(deleteButton[0]);

    // Click the Cancel button in the modal
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    // Check that the modal is closed
    expect(screen.queryByText('Confirm Delete')).not.toBeInTheDocument();
  });

  test('deletes a ticket when modal delete is confirmed', async () => {
    // Mock the delete API call
    (TicketService.deleteTicket as jest.Mock).mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <TicketList />
      </BrowserRouter>
    );

    // Open the delete modal
    const deleteButton = await screen.findAllByText('Delete');
    fireEvent.click(deleteButton[0]);

    // Confirm the delete
    const confirmDeleteButton = screen.getByText('Delete');
    fireEvent.click(confirmDeleteButton);

    // Ensure that the ticket is removed from the DOM
    expect(await screen.findByText('Test Ticket 2')).toBeInTheDocument();  // Ticket 2 should remain
    expect(screen.queryByText('Test Ticket 1')).not.toBeInTheDocument();  // Ticket 1 should be removed
  });
});
