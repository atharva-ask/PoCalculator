import React, { useState } from "react";

function MyTable({ oldVal, selectedSubID }) {
  const [values, setValues] = useState(Array(12).fill(""));

  const handleInputChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const handleSubmit = async (index, oldValue, rowType) => {
    const newValue = values[index];
    if (newValue !== oldValue) {
      const colname =
        rowType === "PO"
          ? `po${index + 1}`
          : rowType === "PSO"
          ? `pso${index + 1}`
          : "co_att";
      const response = await fetch(
        `http://127.0.0.1:8000/update_po/?pk=${
          selectedSubID
        }&val=${newValue}&colname=${colname}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log(`Successfully updated ${colname} to ${newValue}`);
      } else {
        console.error(
          `Error updating ${colname}: ${response.status} ${response.statusText}`
        );
      }
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>PO Name</th>
          <th>PO Old Value</th>
          <th>PO New Value</th>
          <th>Submit</th>
        </tr>
      </thead>
      <tbody>
        {oldVal[0]?.map((item1, ind) =>
          item1?.map((item, index) => (
            <tr key={index}>
              <td>{`PO${index + 1}`}</td>
              <td>{item}</td>
              <td>
                <input
                  type="text"
                  value={values[index]}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </td>
              <td>
                <button onClick={() => handleSubmit(index, item, "PO")}>
                  Submit
                </button>
              </td>
            </tr>
          ))
        )}
        {oldVal[1]?.map((item1, ind) =>
          item1?.map((item, index) => (
            <tr key={index}>
              <td>{`PSO${index + 1}`}</td>
              <td>{item}</td>
              <td>
                <input
                  type="text"
                  value={values[index]}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </td>
              <td>
                <button onClick={() => handleSubmit(index, item, "PSO")}>
                  Submit
                </button>
              </td>
            </tr>
          ))
        )}
        {oldVal[2]?.map((item1, ind) =>
          item1?.map((item, index) => (
            <tr key={index}>
              <td>CO_ATTAINMENT</td>
              <td>{item}</td>
              <td>
                <input
                  type="text"
                  value={values[index]}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </td>
              <td>
                <button
                  onClick={() => handleSubmit(index, item, "CO_ATT")}
                >
                  Submit
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default MyTable;
