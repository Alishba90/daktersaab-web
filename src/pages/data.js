import React from "react";
import Papa from "papaparse";
import { useState } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './doctor.css'
const Doctor = () => {



  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false)
  const [showForm, setShowForm] = useState(false);

  const Form = () => {
    setShowForm(!showForm);
  }

  const [parsedData, setParsedData] = useState([]);



  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

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
      <div className="manual">
        <label>Enter data Manaually: &nbsp; &nbsp; &nbsp;</label>
        <br />
        <br />

        <button className="click" onClick={Form}>Register</button>

      </div>
      <div>
      {showForm && (
        <form>
          <label>
          Doctor's Name:
            <input type="text" name="name" />
          </label><br/>
          <label>
          Speciality/Qualification:
            <input type="text" name="name" />
          </label><br/>
          <label>
          Day: <br/>
           
          </label><br/>

          <input type="submit" value="Submit" />
        </form>)}
        </div>

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
      <br />
      <br />
      <div>
        {/* Table */}
        <table>
          <thead>
            <tr>
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {show &&
        <Button variant="contained" component="label" alignItems="right" className="uploads" >
          Upload File
        </Button>}


    </>
  );

}

export default Doctor