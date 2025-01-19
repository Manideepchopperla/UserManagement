# User Management App

A simple user management application built using React. This app allows users to view a list of users, search and sort them, and view detailed information about each user. It includes pagination for navigating large datasets and provides an intuitive UI for user interactions.

## Features

- **User List**: Displays a paginated list of users with their name, email, and city.
- **Search**: Search for users by name using a dynamic search bar.
- **Sort**: Sort users in ascending or descending order by their name.
- **Pagination**: Navigate through multiple pages of users, with a fixed number of users per page.
- **User Detail View**: View detailed information about each user, including their name, email, address, and company.
- **Error Handling**: Displays appropriate error messages in case of failed data fetching.
- **Loading Indicator**: Shows a spinner while user data is being fetched.

## Technologies Used

- **React**: A JavaScript library for building dynamic user interfaces.
- **React Router**: Enables navigation between the Home page and User Detail page.
- **Context API**: Provides global state management for user data and loading/error states.
- **Axios**: A promise-based HTTP client used for fetching user data from an API.
- **React Spinners**: Provides a visually appealing loading spinner.
- **CSS Modules**: Used for styling individual components and maintaining modular styles.

## Setup Instructions

### Prerequisites

Ensure you have Node.js and npm installed on your machine. You can download them from [Node.js Official Site](https://nodejs.org).

### Getting Started

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Manideepchopperla/UserManagement.git
    cd UserManagement
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000` to view the app.

## Project Structure

- **App.js**: The main component that manages the global state, routing, and user context.
- **UserContext**: Context API for managing and providing global user data, loading states, and error handling.
- **Home**: Displays the user list with features like search, sorting, and pagination.
- **UserDetail**: Displays detailed information about a specific user based on their ID.
- **API Integration**: Fetches data from an external API (e.g., JSONPlaceholder) for the user list.

## How it Works

1. **Data Fetching**: The app fetches a list of users from an external API (e.g., [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users)) on load.
2. **User List**: The **Home** component displays a list of users with pagination, search, and sort functionalities.
3. **Detailed View**: Clicking on a user's name navigates to the **UserDetail** component, where detailed information about the selected user is displayed.
4. **Pagination**: The list is divided into multiple pages with a fixed number of users displayed per page.
5. **Loading and Error States**: A loading spinner is displayed while fetching data, and error messages appear if the data fetching fails.

## Key Components

### 1. **Home**
   - Handles the display of the user list.
   - Includes features like search, sorting by name, and pagination.
   - Links each user to their detailed view.

### 2. **UserDetail**
   - Displays detailed information about a selected user.
   - Includes fields like name, email, address, company, and more.

### 3. **App**
   - Manages global states like users, loading, and errors using the Context API.
   - Sets up routes for navigating between the Home and UserDetail components.

---

Enjoy using the **User Management App** to explore and manage user information seamlessly!
