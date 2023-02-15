import React from "react";
import Papa from "papaparse";
import { useState , useLocation } from 'react';

import { useNavigate} from "react-router-dom";
import validator from "validator";
import { Button } from "bootstrap";

const Hospital=()=>{


let navigate = useNavigate();
let location = useLocation();

let {state}=location.state;

let signup ,edit, data, displaydata=false;

if (state==='signup'){signup=true; }
else if (state==='data'){data=true;}
else {displaydata=true;}


const [eValid,setevalid]=useState();
const [pValid,setpvalid]=useState();

const [hosexist,sethospitalexist]=useState(false)
const days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]

const [formValue, setformValue] = React.useState({
    email: '',
    password: '',
    location:"",
    name:"",
    phone1:'',
    phone2:'',
    timings:[{
    "day":"",
    "open":"",
    "close":""}]
  });

let timings=[{
    "day":"",
    "open":"",
    "close":""
}]

function handleUserInput(e){

if(!(days.includes(e.target.name))){
setformValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
}
else{

const d = timings.map(({ day }) => day);
    if(d.includes(e.target.name)||d.length==0||d==null){
    timings['day']=e.target.name;
    if(e.target.className==="open"){
        timings['open']=e.target.value;
}
    else{
        timings['close']=e.target.value;
}
    }
    else { 
var open , close =null;
if(e.target.className==="open"){
        open = e.target.value;}
else {

        close= e.target.value;}

timings.push({'day':e.target.name,'open':open,'close':close})}
}

if(e.target.name==='email'){
        if(!validator.isEmail(e.target.value)){
                setevalid(1)
            }
        else{setevalid(null)}}

if(e.target.name==='password'){

        if(!(e.target.value.length >7))
          {
          setpvalid(1)
          }
        else{setpvalid(null)}}


}

const submitForm = async(e)=>{

            e.preventDefault();

console.log(timings)
            
  setformValue({
      ...formValue,
      [timings]: timings
    })

            try{
      fetch('http://localhost:5000/api/hospital/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValue)
      })
                

      .then(res => {
if (res.status === 200){console.log(res.data); sethospitalexist(false); signup=false ; data=true}
else if(res.status===430){sethospitalexist(true)}

else{console.log("error in sending data", res.data)}

});
}catch(err){console.log(err);}}

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

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
edit=true;
  };

const editing =(e)=>{

        let v=values;
        v[e.target.id][e.target.name]=e.target.value;
        setValues(v);

}

const submitDoctors=(e)=>{
try{
      fetch('http://localhost:5000/api/doctor/addDr/'+formValue.name+'/'+formValue.location, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValue)
      })
                

      .then(res => {
if (res.status === 200){console.log(res.data); sethospitalexist(false); signup=false ; data=true}
else if(res.status===430){sethospitalexist(true)}

else{console.log("error in sending data", res.data)}

});
}catch(err){console.log(err);}        

}
return(
    <>

{hosexist &&
<h1>Hospital already exists</h1>
}


{signup &&
<form  id="hospitaldata" onSubmit={submitForm}>

        <label>
            Hospital Name:
            <input type="text" name="name" required value={formValue.name} onChange={handleUserInput}/>
        </label><br/>
        <label>
            Hospital Location:
            <input type="text" name="location" required value={formValue.location} onChange={handleUserInput}/>
        </label><br/>

        <label>
            Password:
            <input type="password" name="password" onChange={handleUserInput} value={formValue.password}  />
        </label>
{pValid &&
<h5 >Password should be of atleast 8 characters</h5>
}
<br/>

        <label>
            Contact:
        </label><br/>

        <label>
            Email:
            <input type="text" name="email" onChange={handleUserInput} value={formValue.email}/>
        </label>
{eValid &&
<h5 id='emailinvalid' >Email expression is invalid</h5>
}
<br/>
        <label>
            Phone /Telephone 1:
            <input type="tel" name="phone1" required minLength={13} value={formValue.phone1} onChange={handleUserInput}/>
        </label><br/>
        <label>
            Phone /Telephone 2:
            <input type="tel" name="phone2" minLength={13} value={formValue.phone2} onChange={handleUserInput} />
        </label><br/>
        <label>
            For hospitals not operating 24/7 please enter opening and closing timings for each day:<br/>

        </label><br/>
        <label>
        Monday:           
            Open:
            <input type="time" name="monday" className="open" onChange={handleUserInput}/><br/>
            Close:
            <input type="time" name="monday" className="close" onChange={handleUserInput}/><br/>

        </label><br/>
        <label>
        Tuesday:
           Open:
            <input type="time" name="tuesday" className="open" onChange={handleUserInput}/><br/>
            Close:
            <input type="time" name="tuesday" className="close" onChange={handleUserInput}/><br/>

        </label><br/>
        <label>
        Wednesday:
            Open:
            <input type="time" name="wednesday" className="open" onChange={handleUserInput}/><br/>
            Close:
            <input type="time" name="wednesday" className="close" onChange={handleUserInput}/><br/>

        </label><br/>
        <label>
        Thursday:
            Open:
            <input type="time" name="thursday" className="open" onChange={handleUserInput}/><br/>
            Close:
            <input type="time" name="thursday" className="close" onChange={handleUserInput}/><br/>

        </label><br/>
        <label>
        Friday:
            Open:
            <input type="time" name="friday" className="open" onChange={handleUserInput}/><br/>
            Close:
            <input type="time" name="friday" className="close" onChange={handleUserInput}/><br/>

        </label><br/>
        <label>
        Saturday:
            Open:
            <input type="time" name="saturday" className="open" onChange={handleUserInput}/><br/>
            Close:
            <input type="time" name="saturday" className="close" onChange={handleUserInput}/><br/>

        </label><br/>
        <label>
        Sunday:
           Open:
            <input type="time" name="sunday" className="open" onChange={handleUserInput}/><br/>
            Close:
            <input type="time" name="sunday" className="close" onChange={handleUserInput}/><br/>

        </label><br/>

<button type="submit" className="btn btn-primary"  id="submitbtn">Sign up</button>
</form>
}

{data &&

<>
<div className="csv">
        <label>Enter data by uploading a CSV file:</label>
        <br />
        <br />
        {/* File Uploader */}
        <input
          type="file"
          name="file"
          className="file_upload uploads"
          onChange={changeHandler}
          accept=".csv"

        >Upload File</input>
</div>

{edit &&

<div>
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
                    return <td key={i}><input className="editInput" value={val} id={index} name={i} onChange={editing}/></td>;
                  })}
                </tr>
              );
            })}

</tbody>
</table>
<Button onClick={submitDoctors}>Confirm and Proceed</Button>
</div>
}
</>
}

    </>
  
    )
  }

export default Hospital