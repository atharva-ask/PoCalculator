import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './TablePage.css';

function TablePage() {
  // State variable to store PO data
  const [poData, setPoData] = useState([]);

  // Use useParams to access URL parameters
  const { year, semester, subject } = useParams();

  // Update state when URL parameters change
  useState(() => {
    // Fetch data from backend based on year, semester, and subject
    // For now, using dummy data
    const newData = [
      { po: 'PO1', oldValue: '10', newValue: '' },
      { po: 'PO2', oldValue: '20', newValue: '' },
      // Add more rows as needed
    ];
    setPoData(newData);
  }, [year, semester, subject]);

  // Function to handle changes in the PO New Value input
  const handleNewValueChange = (e, index) => {
    const newValue = e.target.value;
    // Update the newValue property in the corresponding object in poData
    setPoData((prevData) =>
      prevData.map((item, i) => (i === index ? { ...item, newValue } : item))
    );
  };

  return (
    <div className="container">
      <h1 className="title">Table Page</h1>
      <div className="selection-info">
        <p>Year: {year}</p>
        <p>Semester: {semester}</p>
        <p>Subject: {subject}</p>
      </div>
      <table className="po-table">
        <thead>
          <tr>
            <th>PO Name</th>
            <th>PO Old Value</th>
            <th>PO New Value</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          {poData.map((poItem, index) => (
            <tr key={index}>
              <td>{poItem.po}</td>
              <td>{poItem.oldValue}</td>
              <td>
                <input
                  type="text"
                  value={poItem.newValue}
                  onChange={(e) => handleNewValueChange(e, index)}
                />
              </td>
              <td>
                <button>Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePage;