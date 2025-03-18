

import { FunctionComponent } from "react";



interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {  


return (



<div className="container">
<header>
  <h1>User Guide for NexCRM</h1>
</header>

<section id="introduction">
  <h2>Introduction</h2>
  <p>The system supports the following user roles:</p>
  <ul>
    <li>Regular User</li>
    <li>Business User</li>
    <li>Admin User</li>
  </ul>
  <p>The system provides different features and access levels for each type of user.</p>
</section>

<section id="general-guidelines">
  <h2>General Guidelines (For All Users)</h2>
  <h3>Login and Registration</h3>
  <ul>
    <li>All users must log in to access the system.</li>
    <li>New users can register via the registration link on the login page.</li>
    <li>Once registered, users need to log in again to access the system.</li>
    <li>The system will keep users logged in, so subsequent visits will automatically log them in.</li>
  </ul>

  <h3>Main Screen Overview</h3>
  <p>The main screen consists of the following sections:</p>
  <ul>
    <li><strong>Top Menu:</strong> Contains links to navigate between screens.</li>
    <li><strong>NextCRM:</strong> Returns to the home screen.</li>
    <li><strong>About:</strong> User guide.</li>
    <li><strong>Fav Cards:</strong> Displays cards selected as favorites.</li>
    <li><strong>My Cards (Business User Only):</strong> Allows business users to manage their own cards.</li>
    <li><strong>Sandbox (Admin User Only):</strong> Provides access to system statistics and health for admins.</li>
    <li><strong>Search Bar:</strong> Allows searching based on card details (name, description, email, etc.).</li>
  </ul>

  <h4>Right Section:</h4>
  <ul>
    <li><strong>Dark Mode:</strong> Switch between light and dark modes.</li>
    <li><strong>User Profile:</strong> Displays the user’s profile picture.</li>
    <li><strong>Logout:</strong> Logs the user out of the system.</li>
  </ul>

  <h3>Main Screen Cards</h3>
  <ul>
    <li>Users can select and deselect cards as favorites by clicking the heart symbol.</li>
    <li><strong>Additional Details button:</strong> Provides more business information, including the business location map.</li>
  </ul>
</section>

<section id="regular-user">
  <h2>Regular User</h2>
  <h3>Access:</h3>
  <p>Can access the main screen and perform general actions like viewing cards, searching, and sorting.</p>

  <h3>Features:</h3>
  <ul>
    <li><strong>Card Interactions:</strong> Can click to view cards, mark them as favorites, and view additional business details.</li>
    <li><strong>Sorting:</strong> Can sort cards by business name, creation date, or the number of likes.</li>
  </ul>

  <h3>Limitations:</h3>
  <p>No access to the "My Cards" section or any admin features.</p>
</section>

<section id="business-user">
  <h2>Business User</h2>
  <h3>Access:</h3>
  <p>Business users have all the permissions of a regular user, plus access to manage their own business cards.</p>

  <h3>Features:</h3>
  <ul>
    <li><strong>My Cards:</strong> A section where users can manage their business cards.</li>
    <li><strong>Add New Card:</strong> Allows users to add a new card to their profile.</li>
    <li><strong>Edit Card:</strong> Edit existing cards.</li>
    <li><strong>Copy Card:</strong> Duplicate an existing card to create a new one.</li>
    <li><strong>Delete Card:</strong> Remove cards from the system.</li>
  </ul>
</section>

<section id="admin-user">
  <h2>Admin User</h2>
  <h3>Access:</h3>
  <p>Admins can access all features of regular and business users, as well as manage users and view system health.</p>

  <h3>Features:</h3>
  <ul>
    <li><strong>Sandbox:</strong> Admin-only section that includes the following options:</li>
    <ul>
      <li><strong>All Users:</strong> View a list of all users in the system. Admin can search, filter, and paginate the data.</li>
      <li><strong>All Cards:</strong> View all business cards. Admin can search, filter, and paginate the data.</li>
      <li><strong>System Health Dashboard:</strong> Displays system statistics and the number of new users/cards added per month.</li>
      <li><strong>Data Quality Management:</strong> Admins can identify and resolve errors (e.g., broken images or incorrect addresses).</li>
    </ul>
  </ul>
</section>

<section id="react-guidelines">
  <h2>React Project Guidelines</h2>
  <h3>Code Structure:</h3>
  <p>Ensure that code is modular and divided into relevant components. Follow React best practices for state management and component reusability.</p>

  <h3>UI/UX Guidelines:</h3>
  <ul>
    <li>Use Material Design or Bootstrap for responsiveness and consistent design.</li>
    <li>The design should be clean and mobile-friendly.</li>
    <li>Include dark mode for improved user experience.</li>
    <li>Proper validation for forms to ensure user data integrity.</li>
  </ul>

  <h3>Best Practices:</h3>
  <ul>
    <li>Keep your code clean and organized.</li>
    <li>Use <code>console.log</code> only for debugging purposes and remove it in production.</li>
    <li>Always handle errors gracefully, especially when working with API calls (e.g., using try-catch for asynchronous functions).</li>
  </ul>
</section>

<section id="about">
  <h2>About the Development</h2>
  <p>This project was developed by <strong>Ronen Ram</strong>. The system is built using the following technologies:</p>
  <ul>
    <li>React</li>
    <li>React Router</li>
    <li>Material UI</li>
    <li>Bootstrap</li>
    <li>Axios</li>
    <li>JWT Authentication</li>
    <li>Redux for state management</li>
    <li>Google Maps API</li>
    <li>TypeScript</li>
    <li>Formik for forms</li>
    <li>SweetAlert2 for alerts</li>
    <li>React Spinners for loading states</li>
    <li>React Toastify for notifications</li>
  </ul>
</section>

<footer>
  <p>For more information, refer to the official documentation or contact support.</p>
</footer>
</div>


  )

};

export default About;
