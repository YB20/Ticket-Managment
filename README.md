# Ticket Management Application

This is a full-stack Ticket Management Application built using React for the frontend and ASP.NET for the backend. The application allows users to create, view, edit, and delete tickets. It also provides a simple yet professional user interface for managing tickets effectively.

## Features

- List all tickets with details like Ticket ID, Description, Status, Date, and Actions.
- Create new tickets by providing a description and status.
- Edit existing tickets to update their description or status.
- Delete tickets with a confirmation popup.
- Backend API built with ASP.NET, exposing CRUD operations via Swagger.
- Frontend built with React and Bootstrap for a responsive and modern UI.

## Technologies Used

- **Backend**: ASP.NET Core, Entity Framework Core, SQL Server
- **Frontend**: React, TypeScript, Bootstrap, CSS
- **API Documentation**: Swagger
- **Database**: SQL Server

## Screenshots

### 1. Swagger API - Backend CRUD Operations

![Swagger API](./Screens/backend%20swagger%20apis.png)

This screenshot shows the Swagger documentation for the backend API with all available CRUD operations.

### 2. Home Page - Ticket List

![Home Page](./Screens/home%20page.png)

The home page contains a table listing all tickets. The columns are:

- Ticket ID
- Description
- Status
- Date
- Actions (Update, Delete)

### 3. Create Ticket Page

![Create Ticket](./Screens/create%20ticket.png)

This page allows the user to create a new ticket by entering a description and selecting a status.

### 4. Home Page After Ticket Creation

![Home After Creation](./Screens/home%20page%20after%20create%20ticket.png)

After creating a ticket, the home page updates to show the newly created ticket in the list.

### 5. Edit Ticket Page

![Edit Ticket](./Screens/edit%20ticket.png)

The Edit Ticket page allows the user to modify the description and status of a ticket. In this example, the status is changed from 'Open' to 'Closed'.

### 6. Delete Ticket Confirmation

![Delete Confirmation](./Screens/pop%20up%20delete%20ticket.png)

When attempting to delete a ticket, a confirmation popup appears to ensure the user wants to proceed with the deletion.

This application demonstrates a full-stack approach to ticket management with a focus on CRUD operations, responsive design, and professional code structure. Feel free to customize it for your own needs.
