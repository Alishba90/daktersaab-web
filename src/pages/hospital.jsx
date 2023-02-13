import React from "react";
import axios from 'axios';
import { useState } from 'react';

import { useNavigate} from "react-router-dom";
import validator from "validator";

const Hospital=()=>{
let navigate = useNavigate();
const [eValid,setevalid]=useState();
const [pValid,setpvalid]=useState();
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
            const hospitalFormData = new FormData();
            
            hospitalFormData.append("name",formValue.name)
            hospitalFormData.append("location",formValue.location)
            hospitalFormData.append("email",formValue.email)
            hospitalFormData.append("phone1",formValue.phone1)
            hospitalFormData.append("phone2",formValue.phone2)
            hospitalFormData.append("password",formValue.password)
console.log(timings)
            hospitalFormData.append("timings",timings)
  setformValue({
      ...formValue,
      [timings]: timings
    })
for (var pair of hospitalFormData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
            try{
      fetch('http://localhost:5000/api/hospital/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValue)
      })
                

      .then(res => {if (res.status === 200){console.log(res.data); navigate('./data')}
else{console.log("error in sending data", res.data)}

});
}catch(err){console.log(err);}}


return(
    <>
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
    </>
  
    )
  }

export default Hospital