Here’s the `README.md` following the format you provided:

---

# Color Time Generator

**Color Time Generator** is a dynamic web application featuring a real-time countdown timer that is synchronized across all connected users. The application supports theme switching and bilingual interfaces, offering a modern, user-friendly experience.

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Event Handling](#event-handling)
7. [Customization](#customization)
8. [Example](#example)
9. [Contributing](#contributing)
10. [License](#license)

## 1. Overview

Color Time Generator is a web application that synchronizes a countdown timer across multiple clients in real-time. Users can toggle between light and dark themes and switch between English and French languages. The timer is server-driven and resets every hour, providing a consistent experience for all users.

## 2. Project Structure

The project is organized as follows:

- **`/public`**: Contains static files like CSS, JavaScript, and images.
  - **`stylesheets/`**: CSS files, including Bootstrap.
  - **`javascripts/`**: Client-side JavaScript, including Alpine.js and Socket.IO client.
- **`/server`**: Server-side code.
  - **`socketService.js`**: Manages Socket.IO connections and timer synchronization.
  - **`index.js`**: Main entry point for starting the server.
- **`/helpers`**: Utility functions.
- **`/views`**: HTML templates.

## 3. Features

- **Real-time Timer Synchronization**: The timer is synchronized across all users, ensuring everyone sees the same countdown.
- **Theme Toggle**: Users can switch between light and dark themes.
- **Language Toggle**: Bilingual interface supporting English and French.
- **Dynamic Progress Bar**: Visual representation of the countdown with color changes.
- **Responsive Design**: The interface adapts to different screen sizes.

## 4. Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **npm**: Node Package Manager for installing dependencies.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/color-time-generator.git
   cd color-time-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open your web browser and go to `http://localhost:3000`.

## 5. Usage

### Starting the Application

1. Start the server using `npm start`.
2. Open a web browser and navigate to `http://localhost:3000`.
3. Use the interface to toggle themes, switch languages, and observe the synchronized countdown timer.

### Stopping the Application

- Press `CTRL+C` in the terminal where the server is running to stop the application.

## 6. Event Handling

### Timer Synchronization

The server manages a timer that resets every hour. The countdown is synchronized with the server time and is emitted to all connected clients. The timer decreases every second and updates all clients in real-time.

### Client-Side Events

- **Progress Event**: Sent by the server to update the progress bar.
- **Counter Event**: Updates the countdown timer on all clients.
- **Date Event**: Sends the current server time to clients.

## 7. Customization

### Translations

You can modify the text content in different languages by editing the `bodyTexts.js` file. Add or update the keys as needed.

### Styling

Modify the CSS files in `/public/stylesheets/` to change the look and feel of the application. You can customize the themes, button styles, and overall layout.

### Theme and Language Toggle

The toggle functions are defined in the Alpine.js store. You can expand or modify them to include additional themes or languages.

## 8. Example

Here is an example of how to start the application and interact with the timer:

1. **Start the server**:
   ```bash
   npm start
   ```
2. **Navigate to the application**:
   Open `http://localhost:3000` in your browser.
3. **Interact with the timer**:
   - Observe the countdown timer synchronized across all clients.
   - Toggle between light and dark themes using the button.
   - Switch between English and French languages.

## 9. Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## 10. License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

This `README.md` provides an overview, instructions, and details on how to use and contribute to the project. Adjust the content as needed to better fit your specific project details.