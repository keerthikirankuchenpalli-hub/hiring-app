# Worqly - HR Management System

Worqly is an HR management system designed to streamline human resource processes and improve organizational efficiency.

## Features

- Health check endpoint to monitor server status.
- Modular routing for easy expansion and maintenance.
- Middleware support for custom functionalities.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/worqly.git
   ```
2. Navigate to the project directory:
   ```
   cd worqly
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and specify the port:
   ```
   PORT=3000
   ```

### Running the Application

To start the server, run the following command:
```
npm start
```

The server will start and listen on the specified port. You should see a startup message in the console.

### API Endpoints

- **Health Check**
  - **Endpoint:** `/api/health`
  - **Method:** GET
  - **Response:** 
    ```json
    {
      "status": "OK"
    }
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.