import React, { useEffect } from "react";
import Papa from "papaparse";
import { useState  } from 'react';
import Datadisplay from "./components/datadisplay";
import { useNavigate, useLocation} from "react-router-dom";
import validator from "validator";
import { data } from "jquery";


const Hospital=()=>{


let navigate = useNavigate();
let location = useLocation();

let {state}=location.state;
const items = [
    'Cardiology','Oncology','Pediatrics','Obstetrics and Gynecology','Pulmonology','Physical Therapy','Nutrition and Dietetics','Rheumatology','Gastroenterology','Psychiatric','Endocrinology','Neurology','Nephrology','ENT',"Dentistry"
];
useEffect(()=>{


if (location.state.data==='signup'){setsignup(true); }
else {setdisplaydata(true);

var Open , Close;
try{
if(!(location.state.info.Time.Close)||!(location.state.Time.Open)){Open ='';Close='';}
else{Open=location.state.Time.Open;Close=location.state.info.Time.Close;}
}
catch(err){Open ='';Close='';}
setformValue({
    email: location.state.info.Email,
    password: '',
    location:location.state.info.Location,
    name:location.state.info.Name,
    phone1:location.state.info.Phone1,
    phone2:location.state.info.Phone2,
    timings:{
    open:Open,
    close:Close},
    department:location.state.info.Department
  })

}
location.state.data=''
},[])



const [eValid,setevalid]=useState();
const [pValid,setpvalid]=useState();

const [hosexist,sethospitalexist]=useState(false)
const [signup,setsignup]=useState(false)
const [displaydata,setdisplaydata]=useState(false)


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
    else{setformValue(formstate=>({...formstate,timings:{...formstate.timings,[e.target.id] : e.target.value}}))}

    if(e.target.name==='email'){
            if(!validator.isEmail(e.target.value)){
                    setevalid(1)
                }
            else{setevalid(null)}}

    else if(e.target.name==='password'){

            if(!(e.target.value.length >7))
            {
            setpvalid(1)
            }
            else{setpvalid(null)}}
}


const submitRegisterForm = async(e)=>{
        const dataset=formValue
            e.preventDefault();

        let checkedbox=[];
        var val=document.getElementsByClassName('department')
        for(var i =0 ;i<items.length;i++){

            if(val[i].checked===true){
                checkedbox.push(val[i].value)
            }
        }
        
        if(checkedbox.length>1){


        dataset['department']=checkedbox
        
        try{
          fetch('http://localhost:5000/api/hospital/add', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataset)
            }).then(res => {
        if (res.status === 200){
                sethospitalexist(false); 
                setsignup(false)
               
                alert("you master key has been sent to you by email")
                navigate('/department',{state:{Name:formValue.name ,Location:formValue.location , Department:dataset.department,register:true}})
        }
        else if(res.status===430){sethospitalexist(true)}

        else{console.log("error in sending data", res.data)}
        });
    }catch(err){console.log(err);}}
    else{document.getElementById('error').innerHTML='Please select some department';}

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

const logout=(e)=>{
    e.preventDefault()
    setformValue({
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
  })
    navigate('/');
}

return(
    <>


{hosexist &&
<h1 >Hospital already exists</h1>
}

{displaydata &&
<>
<input type='button' value='Logout' id='logoutbtn' onClick={logout}/>

<Datadisplay Name={formValue.name} Location ={formValue.location} Phone1={formValue.phone1} Phone2={formValue.phone2} Email={formValue.email}/>

{formValue.department.map((item, index)=>{

<input type='button' name="departmentView" value={item} key={index} id={item} />

})}

</>
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


</>
  
)}

export default Hospital