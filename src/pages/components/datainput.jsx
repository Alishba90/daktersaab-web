import React from "react";
import Papa from "papaparse";

import { useState  } from "react";
const Datainput = () => {


  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  //State to store the values
  const [values, setValues] = useState([]);


  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };


 return (

<>
        <div className="csv">
        <label>Enter data by uploading a CSV file:</label>
        <br />
        <br />
        {/* File Uploader */}
        <input
          type="file"
          name="file"
          className="file_upload"
          onClick={() => setShow(prev => !prev)}
          onChange={changeHandler}
          accept=".csv"
        />
      </div>



</>)
}
export default Datainput;