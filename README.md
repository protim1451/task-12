# PetConnect

Welcome to PetConnect, a platform connecting pet owners and adopters, helping pets find new loving homes. This project is built with modern web technologies and tools to ensure a smooth and interactive user experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Admin Access](#admin-access)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [License](#license)

## Project Overview

PetConnect is a comprehensive solution for pet adoption. It allows users to create and manage pet adoption campaigns, make donations, and process adoption requests. The platform aims to make pet adoption easier and more transparent.

## Technologies Used

This project utilizes the following technologies:

- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - Flowbite
  - Firebase (for authentication)

- **Backend:**
  - Express.js
  - Node.js
  - MongoDB (for data storage)

## Admin Access

Use the following credentials to log in as an admin:

- **Email:** admin@admin.com
- **Password:** Admin@123

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository

2. Install frontend dependencies:
    ```sh
    cd client
    npm install
    # or
    yarn install
    ```

3. Install backend dependencies:
    ```sh
    cd ../server
    npm install
    # or
    yarn install
    ```

### Running the Application

1. Start the MongoDB server (if running locally).

2. Start the backend server:
    ```sh
    cd server
    npm start
    # or
    yarn start
    ```

3. Start the frontend development server:
    ```sh
    cd ../client
    npm run dev
    # or
    yarn dev
    ```

4. Open your browser and navigate to `http://localhost:5173` to view the application.


## API Endpoints

### Authentication

- `POST /api/login` - Log in a user
- `POST /api/register` - Register a new user

### Donation Campaigns

- `GET /api/donation-campaigns` - Get all donation campaigns
- `POST /api/donation-campaigns` - Create a new donation campaign (Admin only)
- `DELETE /api/donation-campaigns/:id` - Delete a donation campaign (Admin only)

### Payments

- `POST /create-payment-intent` - Create a payment intent for a donation
- `POST /payments` - Record a payment

### Adoption Requests

- `GET /api/adoption-requests?owner={email}` - Get all adoption requests for the logged-in user
- `PATCH /api/adoption-requests/:id` - Update the status of an adoption request

## Features

- User authentication with Firebase
- Create and manage pet adoption campaigns
- Make donations using Stripe
- View and manage adoption requests
- Admin functionalities for managing campaigns and users

---

Thank you for using PetConnect! If you have any questions or feedback, please feel free to contact us.
