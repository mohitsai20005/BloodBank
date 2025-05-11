import React from 'react';
import './Dashboard.css'; // Optional: for styling

function Dashboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Admin Dashboard</h1>
      
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h2>Total Donors</h2>
          <p>120</p>
        </div>
        <div style={styles.card}>
          <h2>Pending Requests</h2>
          <p>8</p>
        </div>
        <div style={styles.card}>
          <h2>Approved Requests</h2>
          <p>45</p>
        </div>
      </div>

      <div style={styles.section}>
        <h2>Recent Activity</h2>
        <ul>
          <li>User "Raj" registered as donor.</li>
          <li>Blood request from Hyderabad approved.</li>
          <li>User "Anita" submitted a new request.</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#c0392b',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '1rem 2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    margin: '1rem',
    minWidth: '200px',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
};

export default Dashboard;
