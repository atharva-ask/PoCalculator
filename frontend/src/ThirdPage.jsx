import React, { useState, useEffect } from "react";

function ThirdPage() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    // Function to fetch data for each row from backend endpoints
    const fetchData = async () => {
      try {
        const directPOResponse = await fetch("http://127.0.0.1:8000/getDirectPO?year=2023");
        const directPOData = await directPOResponse.json();

        const indirectPOResponse = await fetch("http://127.0.0.1:8000/getIndirectPO/2023");
        const indirectPOData = await indirectPOResponse.json();

        const poAttainmentResponse = await fetch("http://127.0.0.1:8000/getPOAttainment?year=2023");
        const poAttainmentData = await poAttainmentResponse.json();

        const scaledPOAttainmentResponse = await fetch("http://127.0.0.1:8000/ScaledPoAttainment?year=2023");
        const scaledPOAttainmentData = await scaledPOAttainmentResponse.json();

        const targetPOResponse = await fetch("http://127.0.0.1:8000/getTargetPO/2023");
        const targetPOData = await targetPOResponse.json();

        const achievedPOAttainmentResponse = await fetch("http://127.0.0.1:8000/acheivedPoAttainment?year=2023");
        const achievedPOAttainmentData = await achievedPOAttainmentResponse.json();

        // Truncate all values to 2 decimal places
        const truncateData = (data) => {
          return data.map(value => {
            if (typeof value === 'number') {
              return Number(value.toFixed(2));
            }
            return value;
          });
        };

        // Combine fetched data into rowData state
        setRowData([
          truncateData(directPOData),
          truncateData(indirectPOData),
          truncateData(poAttainmentData),
          truncateData(scaledPOAttainmentData),
          truncateData(targetPOData),
          truncateData(achievedPOAttainmentData)
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData function
    fetchData();
  }, []);

  const rowNames = [
    "PO Direct Attainment",
    "PO Indirect Attainment",
    "PO Attainment",
    "Achieved Attainment scaled to 3 for 2022-23 Final year Batch",
    "Target for 2022-23 Final Year Batch scaled to 3",
    "Achieved PO Attainment for 2022-23 batch",
  ];

  return (
    <div>
      <h1>CO- PO Result Table</h1>
      <table>
        <thead>
          <tr>
            <th>Row Name</th>
            <th>PO1</th>
            <th>PO2</th>
            <th>PO3</th>
            <th>PO4</th>
            <th>PO5</th>
            <th>PO6</th>
            <th>PO7</th>
            <th>PO8</th>
            <th>PO9</th>
            <th>PO10</th>
            <th>PO11</th>
            <th>PO12</th>
            <th>PSO1</th>
            <th>PSO2</th>
            <th>PSO3</th>
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, index) => (
            <tr key={index}>
              <td>{rowNames[index]}</td>
              {row.map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ThirdPage;
