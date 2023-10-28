# KameTickets

## Description

KameTicket is a platform for managing and selling tickets for events. The platform allows users to explore a variety of events available in their cities, purchase tickets, and stay updated on the latest information about concerts, performances, and more.

🚧 **In Development** 🚧: The project is currently in active development. We are working to add new features and enhance the user experience. Stay tuned for updates!

## Main Commands

- `npm start` - Starts the application in production mode.
- `npm run start:dev` - Starts the application in development mode with file watch.
- `npm run lint` - Runs the linter to fix code issues.
- `npm run test` - Runs the tests.
- `npm run test:watch` - Runs the tests with file watch.

## Configuration

### Installing Dependencies

Run the command `npm install` to install all the necessary project dependencies.

### Key Features

- **User Registration**: Allows users to create accounts with their relevant details.
- **Event Creation**: Enables organizers to create and publish details of events, including name, description, date, location, and available tickets.
- **Event Listing**: Provides a list of all available events for users to explore.
- **Event Details**: Displays in-depth information about a specific event, including its description, date, location, and available tickets.
- **Ticket Purchase**: Allows users to select and purchase tickets for their desired events.
- **User Management**: Enables administrators to view, update, and delete user accounts, providing flexibility in user management.
- **Event Updates**: Allows organizers to modify event details, ensuring accuracy and relevance.
- **User Profiles**: Provides a space for users to view and edit their profile information.
- **User Authentication**: Ensures secure access to the platform through authentication mechanisms.
- **Error Handling**: Implements robust error handling to provide informative feedback to users in case of issues.

## Technologies

- **NestJS** - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications
- **TypeScript**: A superset of JavaScript that adds optional static types to the language. It's used for writing the application code.
- **TypeORM**: An Object-Relational Mapping (ORM) library for TypeScript and JavaScript that works with databases like PostgreSQL. It simplifies database interactions.
- **Jest**: A testing framework for JavaScript and TypeScript. It's used for writing and executing tests.
- **ESLint**: A static code analysis tool for identifying problematic patterns found in JavaScript and TypeScript code.
- **Prettier**: An opinionated code formatter that ensures code consistency.

## Available Routes

### Authentication

- **Register User** `(POST)` - /auth/register: Creates a new user based on the data provided in the request body.
  ```json
  {
    "name": "John Doe",
    "email": "john@email.com",
    "password": "12345678",
    "city": "New York"
  }
  ```
- **Login User** `(POST)` - /auth/login: Logs in a user based on the data provided in the request body.
  ```json
  {
    "email": "john@email.com",
    "password": "12345678"
  }
  ```

### Events

- **List Events** `(GET)` - /events: Returns a list of all available events.
- **Event Details** `(GET)` - /events/:id: Returns the details of a specific event based on its ID.
- **Create Event** `(POST)` - /events: Creates a new event based on the data provided in the request body.

  ```json
  {
    "eventName": "Concert in the Park",
    "description": "A live music event in the city park",
    "dateTime": "2023-11-01T18:00:00.000Z",
    "location": "City Park",
    "availableTickets": 100,
    "organizerId": 2
  }
  ```

- **Update Event** `(PATCH)` - /events/:id: Updates the details of an existing event based on its ID. (Only availableTickets can be updated)

  ```json
  {
    "availableTickets": 200
  }
  ```

- **Delete Event** `(DELETE)` - /events/:id: Removes an event based on its ID.

### Users

- **List Users** `(GET)` - /users: Returns a list of all registered users.
- **User Details** `(GET)` - /users/:id: Returns the details of a specific user based on their ID.
- **Create User** `(POST)` - /users: Creates a new user based on the data provided in the request body.
  ```json
  {
    "name": "John Doe",
    "email": "john@email.com",
    "password": "12345678",
    "city": "New York"
  }
  ```
- **Update User** `(PATCH)` - /users/:id: Updates the details of an existing user based on their ID.

  ```json
  {
    "city": "Los Gatos"
  }
  ```

- **Delete User** `(DELETE)` - /users/:id: Removes a user based on their ID.

### Tickets

- **List Tickets** `(GET)` - /tickets: Returns a list of all available tickets.
- **Ticket Details** `(GET)` - /tickets/:id: Returns the details of a specific ticket based on its ID.
- **Create Ticket** `(POST)` - /tickets: Creates a new ticket based on the data provided in the request body.
  ```json
  {
    "eventId": 3,
    "buyerId": 2,
    "quantity": 41,
    "pricePaid": 50.0
  }
  ```
- **Update Ticket** `(PATCH)` - /tickets/:id: Updates the details of an existing ticket based on its ID.
  ```json
  {
    "pricePaid": 60.0
  }
  ```
- **Delete Ticket** `(DELETE)` - /tickets/:id: Removes a ticket based on its ID.

### Orders

- **List Orders** `(GET)` - /orders: Returns a list of all available orders.
- **Order Details** `(GET)` - /orders/:id: Returns the details of a specific order based on its ID.
- **Create Order** `(POST)` - /orders: Creates a new order based on the data provided in the request body.

  ```json
  {
    "orderItems": [
      { "eventId": "3", "quantity": 10, "pricePaid": 20.0 },
      { "eventId": "6", "quantity": 1, "pricePaid": 240.0 },
      { "eventId": "9", "quantity": 1, "pricePaid": 40.0 }
    ],
    "userId": "4"
  }
  ```

- **Update Order** `(PATCH)` - /orders/:id: Updates order status based on its ID. (Only status can be updated)

  ```json
  {
    "status": "done"
  }
  ```

- **Delete Order** `(DELETE)` - /orders/:id: Removes an order based on its ID.

## Contributing

Feel free to contribute with improvements, bug fixes, or new features. Create a new branch, make your changes, and open a pull request.
