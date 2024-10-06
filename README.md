# Digital Time Capsule

## Overview

Digital Time Capsule is a React-based web application that allows users to create virtual time capsules. Users can upload files, set a future date and time for unlocking, and view the contents when the specified time arrives. This project serves as a fun and interactive way to preserve memories or set future goals.

## Features

- Create time capsules with custom titles
- Upload files to your time capsules
- Set specific date and time for unlocking each capsule
- Automatic unlocking based on the current time
- View images and text files directly in the browser
- Download other file types when unlocked
- Responsive design for various screen sizes

## Installation

To set up the Digital Time Capsule project locally, follow these steps:

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.

2. Clone the repository:
   ```
   git clone https://github.com/yourusername/digital-time-capsule.git
   cd digital-time-capsule
   ```

3. Install the necessary dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. **Creating a Time Capsule**
   - Fill in the capsule title
   - Upload a file using the file input
   - Set the unlock date and time
   - Click "Create Capsule"

2. **Viewing Time Capsules**
   - All created capsules are displayed in a grid layout
   - Each capsule shows its title, unlock date/time, and file name

3. **Unlocking a Time Capsule**
   - When the unlock time arrives, the "Locked" button becomes active
   - Click the button to unlock and view the contents
   - Images and text files open in a new window
   - Other file types initiate a download

## Technologies Used

- React
- JavaScript (ES6+)
- HTML5
- CSS3
- Lucide React (for icons)

