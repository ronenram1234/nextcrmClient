
I understand your need for a more polished and comprehensive README file. Let's aim for a well-structured, professional README that covers all essential aspects of your project in a clear, concise manner. I'll add more sections and refine the content for clarity and flow. Here's a more detailed and polished version:

NexCRM - User Guide & Project Overview
Welcome to NexCRM, a platform for managing business cards and profiles. This project was bootstrapped with Create React App and built with React, TypeScript, and a variety of modern tools and technologies. Below is a comprehensive guide to get you started, along with an overview of the key features, technologies, and setup instructions.

Table of Contents
Technologies Used
Features
Available Scripts
How to Run
User Profiles
About This Module
Learn More
Technologies Used
This project utilizes the following technologies and libraries:

React: Core library for building the user interface.
TypeScript: Provides static typing to ensure type safety across the app.
Material-UI (MUI): Used for UI components like buttons, cards, and charts, ensuring a modern and responsive design.
Google Maps API: Integrated for business address verification and displaying maps using the @react-google-maps/api library.
Axios: Used for making HTTP requests to interact with external services, such as Google’s Geocoding API.
Jest & React Testing Library: For testing React components to ensure the app functions correctly.
CSS: For styling and layout, along with Bootstrap's grid system for responsive design.
SVG: Scalable vector graphics used for the logo.
Features
This application has different user profiles, each with specific functionalities:

1. Regular User
The Regular User profile allows browsing and interaction with business content.

View Business Cards
Search Business Cards
Dark Mode/Light Mode Toggle
Create User Profile
Responsive Design for mobile and desktop devices
2. Business User (IsBusiness)
The Business User profile provides more advanced functionality for managing business cards.

Create, Edit, and Delete Business Cards
View Business Card Details
Favorites and Organize Cards
View and Manage Own Cards
Dashboard to track business card performance and interactions
3. Admin User
The Admin User profile has full access to system management.

User Management (view, promote, demote users)
Block/Unblock Users
View All Business Cards
Delete Business Cards (if necessary)
Approve/Disapprove User-Submitted Content
System-Wide Monitoring and Reporting

User Profiles
The application has three types of user profiles, each with different levels of access and functionality.

Regular User
Regular users have access to basic browsing and profile features, allowing them to explore business cards and view details. They can also toggle between dark and light mode for enhanced UI comfort.

Business User
Business users can manage business cards, including creating, editing, and deleting them. They also have access to a dashboard with performance statistics and the ability to manage their cards more effectively.

Admin User
Admins have full system control, including managing users, approving/disapproving content, and monitoring system-wide statistics. They can delete business cards and block/unblock users as needed.

About This Module
This module was created by Ronen Ram. It integrates various features to allow users to create and manage business profiles, view maps, verify addresses, and access system performance.

The module features:

Google Maps Integration for location verification and display.
Material UI (MUI) for responsive design components like cards, buttons, and charts.
Axios for fetching and submitting data to APIs.
