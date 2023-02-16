import React, { useEffect } from "react";
import Papa from "papaparse";
import { useState  } from 'react';
import Datadisplay from "./components/datadisplay";
import { useNavigate, useLocation} from "react-router-dom";
import validator from "validator";


const Hospital=()=>{


let navigate = useNavigate();
let location = useLocation();

let {state}=location.state;
const items = [
    'Cardiology','Oncology','Pediatrics','Obstetrics and Gynecology','Pulmonology','Physical Therapy','Nutrition and Dietetics','Rheumatology','Gastroenterology','Psychiatric','Endocrinology','Neurology','Nephrology','ENT',"Dentistry"
];
useEffect(()=>{


if (location.state.data==='signup'){setsignup(true); }
else if (location.state.data==='data'){setdata(true);}
else {setdisplaydata(true);

setformValue({
    email: location.state.info.Email,
    password: '',
    location:location.state.info.Location,
    name:location.state.info.Name,
    phone1:location.state.info.Phone1,
    phone2:location.state.info.Phone2,
    timings:{
    open:location.state.info.Time.Open,
    close:location.state.info.Time.Close},
    department:location.state.info.Department
  })
}
location.state.data=''
},[])



const [eValid,setevalid]=useState();
const [pValid,setpvalid]=useState();

const [hosexist,sethospitalexist]=useState(false)
const [signup,setsignup]=useState(false)
const [edit,setedit]=useState(false)
const [data,setdata]=useState(false)
const [displaydata,setdisplaydata]=useState(false)
console.log(location.state.info)
const [formValue, setformValue] = React.useState({
    email:'',
    password: '',
    location:'',
    name:'',
    phone1:'',
    phone2:'',
    timings:{
    open:'',
    close:''},
    department:[]
  });



function handleUserInput(e){

if(!(e.target.name==='time')){
setformValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
}
else{
setformValue(formstate=>({...formstate,timings:{...formstate.timings,[e.target.id] : e.target.value}}))



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

const submitRegisterForm = async(e)=>{

            e.preventDefault();

        let checkedbox=[];
        var val=document.getElementsByClassName('department')
        for(var i =0 ;i<items.length;i++){

        
        
                    if(val[i].checked===true){
                        checkedbox.push(val[i].value)
        }}
        console.log(checkedbox)
        if(checkedbox.length>1){
        setformValue({
      ...formValue,
      department: checkedbox
    });

            try{
      fetch('http://localhost:5000/api/hospital/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValue)
      })
                

      .then(res => {
if (res.status === 200){
 sethospitalexist(false); 
setsignup(false)
setdata(true)
document.getElementById('hospitalname').innerHTML=formValue.name;

}
else if(res.status===430){sethospitalexist(true)}

else{console.log("error in sending data", res.data)}

});
}catch(err){console.log(err);}}
else{
document.getElementById('error').innerHTML='Please select some department'
}


}

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
setedit(true);
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
if (res.status === 200){console.log(res.data); sethospitalexist(false); setsignup(false) ; setdata(true)}
else if(res.status===430){sethospitalexist(true)}

else{console.log("error in sending data", res.data)}

});
}catch(err){console.log(err);}        

}

const  createCheckbox = label => (<>
    <input type='checkbox'
            label={label}
            value={label}
            id={label}
            className='department'
            key={label}
        />
<label htmlFor={label}>{label}</label><br/>
</>
  )
const createDepartments=()=>{
return(
items.map(createCheckbox)
)
}

return(
    <>
<h1 id='hospitalname'></h1>
{hosexist &&
<h1 >Hospital already exists</h1>
}

{displaydata &&
<Datadisplay Name={formValue.name} Location ={formValue.location} Phone1={formValue.phone1} Phone2={formValue.phone2} Email={formValue.email}/>
}

{signup &&
<form  id="hospitaldata" onSubmit={submitRegisterForm}>

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
        </label><br/><hr/>
        <label>
            For hospitals not operating 24/7 please enter opening and closing timings for each day:<br/>

        </label><br/>
        <label>
                 
            Open:
            <input type="time" name="time" id="open" onChange={handleUserInput}/>
            Close:
            <input type="time" name="time" id="close" onChange={handleUserInput}/><br/>

        </label><br/>

        <hr/>
<h1 id ='error'></h1>
   <label>Please select the departments you have in your organization</label><br/>
{createDepartments()}

        

<button type="submit" className="btn btn-primary"  id="submitbtn">Sign up</button>
</form>
}

{data &&

<>
<hr/>
<div >
{formValue.department.map((rows,index)=>{
return(
<div>       
        
<hr/>
<label >{rows} Department </label>
<label>Password: </label><input type='password' name='depPass'/>

<hr/>
</div>
)})
}
</div>
<hr/>

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
<input type="button" onClick={submitDoctors} value="Confirm and Proceed"/>
</div>
}
</>
}

    </>
  
    )
  }

export default Hospital