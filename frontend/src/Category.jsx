import React, { useEffect, useState } from "react";
import axios from "axios";
import MyTable from "./Mytable";
const Category = () => {
  const [old, setOld] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubID, setSelectedSubID] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const years = ["FE", "SE", "TE", "BE"];
  const semesters = ["sem1", "sem2"];
  const getSubjects = async () => {
    try {
      await axios
        .get(
          `http://127.0.0.1:8000/subjects?yearval=${selectedYear}&semval=${selectedSemester}`
        )
        .then((res) => {
          // console.log(res);
          setSubjects(res?.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getOldVal = async () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/getOldPOval?pk=${selectedSubID}`)
        .then((res) => {
          console.log(res);
          setOld(res?.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (selectedYear && selectedSemester) {
      getSubjects();
    }
  }, [selectedYear, selectedSemester]);

  useEffect(() => {
    if (selectedSubID) {
      getOldVal();
    }
  }, [selectedSubID]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedSemester(null); // Reset semester when year changes
    // setSelectedSubject(null); // Reset subject when year changes
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    // setSelectedSubject(null); // Reset subject when semester changes
  };

  const handleSubjectChange = (e) => {
    setSelectedSubID(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">CO-PO CALCULATOR</h1>
      <div className="select-container">
        <label htmlFor="year" className="label">
          Select Year:
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="select"
        >
          <option value="">-- Select Year --</option>
          {years?.map((year, index) => (
            <option key={index} value={index + 1}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {selectedYear && (
        <div className="select-container">
          <label htmlFor="semester" className="label">
            Select Semester:
          </label>
          <select
            id="semester"
            value={selectedSemester}
            onChange={handleSemesterChange}
            className="select"
          >
            <option value="">-- Select Semester --</option>
            {semesters?.map((semester, index) => (
              <option key={index} value={index + 1}>
                {semester}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedSemester && (
        <div className="select-container">
          <label htmlFor="subject" className="label">
            Select Subject:
          </label>
          <select
            id="subject"
            value={selectedSubID}
            onChange={handleSubjectChange}
            className="select"
          >
            <option value="">-- Select Subject --</option>
            {subjects?.map((item, index) => (
              <option key={index} value={item.course_id}>
                {item.course_name}
              </option>
            ))}
          </select>
        </div>
      )}
      {subjects && (
        <div className="table-container">
          <MyTable oldVal={old} selectedSubID={selectedSubID} />
        </div>
      )}
    </div>
  );
};
export default Category;
