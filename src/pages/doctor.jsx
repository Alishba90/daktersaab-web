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
  
  const [showForm, setShowForm] = useState(false);

  const Form = () => {
    setShowForm(!showForm);
  }










  return (

    <>
      

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