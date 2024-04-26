import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SecondPage.css";

function SecondPage() {
  const [selectedValue, setSelectedValue] = useState("");
  const [values, setValues] = useState(Array(15).fill(""));
  const [oldValues, setOldValues] = useState(Array(15).fill(""));

  const handleInputChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const handleDropdownChange = async (event) => {
    const selectedType = event.target.value;
    setSelectedValue(selectedType);
    await fetchOldValues(selectedType);
    setValues(Array(15).fill(""));
  };

  const fetchOldValues = async (type) => {
    try {
      const response = await fetch(
        type === "po_ind"
          ? "http://127.0.0.1:8000/getIndirectPO/2023"
          : type === "target"
          ? "http://127.0.0.1:8000/getTargetPO/2023"
          : ""
      );
      if (!response.ok) {
        throw new Error("Failed to fetch old values");
      }
      const data = await response.json();
      setOldValues(data);
    } catch (error) {
      console.error("Error fetching old values:", error);
    }
  };

  const handleSubmit = async (index) => {
    try {
      const response = await fetch(
        selectedValue === "po_ind"
          ? index < 12
            ? `http://127.0.0.1:8000/setIndirectPO?colname=po${index + 1}&colval=${values[index]}&yearval=2023`
            : `http://127.0.0.1:8000/setIndirectPO?colname=pso${index - 11}&colval=${values[index]}&yearval=2023`
          : selectedValue === "target"
          ? index < 12
            ? `http://127.0.0.1:8000/setTargetPO?colname=po${index + 1}&colval=${values[index]}&yearval=2023`
            : `http://127.0.0.1:8000/setTargetPO?colname=pso${index - 11}&colval=${values[index]}&yearval=2023`
          : "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to set PO/PSO value");
      }

      console.log(`${index < 12 ? `PO${index + 1}` : `PSO${index - 11}`} value updated successfully`);
    } catch (error) {
      console.error(`Error setting ${index < 12 ? `PO${index + 1}` : `PSO${index - 11}`} value:`, error);
    }
  };

  return (
    <div>
      <div className="navigation-links">
        <Link to="/">Update direct PO</Link>
        <Link to="/third">Generate Report</Link>
      </div>
      <label htmlFor="dropdown">Select Value:</label>
      <select id="dropdown" value={selectedValue} onChange={handleDropdownChange}>
        <option value="">Select...</option>
        <option value="po_ind">PO Indirect Attainment</option>
        <option value="target">Target for 2022-23 Final Year Batch scaled to 3</option>
      </select>
      {selectedValue && (
        <table>
          <thead>
            <tr>
              <th>PO/PSO Name</th>
              <th>Old Value</th>
              <th>New Value</th>
              <th>Submit</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(15)].map((_, index) => (
              <tr key={index}>
                <td>{index < 12 ? `PO${index + 1}` : `PSO${index - 11}`}</td>
                <td>{oldValues[index]}</td>
                <td>
                  <input
                    type="text"
                    value={values[index]}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <button onClick={() => handleSubmit(index)}>Submit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SecondPage;
