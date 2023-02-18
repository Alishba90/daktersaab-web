import React, { useEffect } from "react";
import { useState } from 'react';
import Datadisplay from "./components/datadisplay";
import { useNavigate, useLocation } from "react-router-dom";
import validator from "validator";
import './hospital.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faFlag, faPhone, faHospital, faLock, faKey } from '@fortawesome/free-solid-svg-icons'
import Navbar from './components/navbar';
import { data } from "jquery";

const Hospital = () => {
    let navigate = useNavigate();
    let location = useLocation();

    let { state } = location.state;
    const items = [
        'Cardiology', 'Oncology', 'Pediatrics', 'Obstetrics and Gynecology', 'Pulmonology', 'Physical Therapy', 'Nutrition and Dietetics', 'Rheumatology', 'Gastroenterology', 'Psychiatric', 'Endocrinology', 'Neurology', 'Nephrology', 'ENT', "Dentistry"
    ];
    useEffect(() => {
        if (location.state.data === 'signup') { setsignup(true); }
        else {
            setdisplaydata(true);

            var Open, Close;
            try {
                if (!(location.state.info.Time.Close) || !(location.state.Time.Open)) { Open = ''; Close = ''; }
                else { Open = location.state.Time.Open; Close = location.state.info.Time.Close; }
            }
            catch (err) { Open = ''; Close = ''; }
            setformValue({
                email: location.state.info.Email,
                password: '',
                location: location.state.info.Location,
                name: location.state.info.Name,
                phone1: location.state.info.Phone1,
                phone2: location.state.info.Phone2,
                timings: { open: Open, close: Close },
                department: location.state.info.Department
            })
        }
        location.state.data = ''
    }, [])

    const [eValid, setevalid] = useState();
    const [pValid, setpvalid] = useState();

    const [hosexist, sethospitalexist] = useState(false)
    const [signup, setsignup] = useState(false)
    const [displaydata, setdisplaydata] = useState(false)

    const [formValue, setformValue] = React.useState({
        email: '',
        password: '',
        location: '',
        name: '',
        phone1: '',
        phone2: '',
        timings: { open: '', close: '' },
        department: []
    });

    function handleUserInput(e) {
        if (!(e.target.name === 'time')) {
            setformValue({
                ...formValue,
                [e.target.name]: e.target.value
            });
        }
        else { setformValue(formstate => ({ ...formstate, timings: { ...formstate.timings, [e.target.id]: e.target.value } })) }

        if (e.target.name === 'email') {
            if (!validator.isEmail(e.target.value)) {
                setevalid(1)
            }
            else { setevalid(null) }
        }
        else if (e.target.name === 'password') {

            if (!(e.target.value.length > 7)) {
                setpvalid(1)
            }
            else { setpvalid(null) }
        }
    }

    const submitRegisterForm = async (e) => {
        const dataset = formValue
        e.preventDefault();

        let checkedbox = [];
        var val = document.getElementsByClassName('department')
        for (var i = 0; i < items.length; i++) {
            if (val[i].checked === true) {
                checkedbox.push(val[i].value)
            }
        }

        if (checkedbox.length > 1) {
            dataset['department'] = checkedbox
            try {
                fetch('http://localhost:5000/api/hospital/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataset)
                }).then(res => {
                    if (res.status === 200) {
                        sethospitalexist(false);
                        setsignup(false)

                        alert("you master key has been sent to you by email")
                        navigate('/department', { state: { Name: formValue.name, Location: formValue.location, Department: dataset.department, register: true } })
                    }
                    else if (res.status === 430) { sethospitalexist(true) }

                    else { console.log("error in sending data", res.data) }
                });
            } catch (err) { console.log(err); }
        }
        else { document.getElementById('error').innerHTML = 'Please select some department'; }
    }

    const createCheckbox = label => (
        <div className="checkboxdiv">
            <input className="checkbox"
                type='checkbox'
                label={label}
                value={label}
                id={label}
                key={label} />
            <label htmlFor={label}>{label}</label>
        </div>)
    const createDepartments = () => {
        return (
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
<input type='button' value='Logout' id='logoutbtn' onClick={logout}/>

{hosexist &&
<h1 >Hospital already exists</h1>
}

{displaydata &&
<>
<Datadisplay Name={formValue.name} Location ={formValue.location} Phone1={formValue.phone1} Phone2={formValue.phone2} Email={formValue.email}/>

{formValue.department.map((item, index)=>{

<input type='button' name="departmentView" value={item} key={index} id={item} />

})}

</>
}

{signup &&
<form  id="hospitaldata" onSubmit={submitRegisterForm}>

                            <div className="reglabeldiv">
                                <label className="reglabelh"><FontAwesomeIcon className='faicon' icon={faUser} />Email: </label>
                                <input className="reginputf" type="text" name="email" onChange={handleUserInput} value={formValue.email} />
                                {eValid && <p id='emailinvalid'> Email expression is invalid</p>}
                            </div>

                            <div className="reglabeldivp">
                                <label className="reglabelh"><FontAwesomeIcon className='faicon' icon={faPhone} />Phone /Telephone 1:  </label>
                                <input className="reginputp" type="tel" name="phone1" required minLength={11} value={formValue.phone1} onChange={handleUserInput} />
                                <label className="reglabelh"> <FontAwesomeIcon className='faicon' icon={faPhone} />Phone /Telephone 2: </label>
                                <input className="reginputp" type="tel" name="phone2" minLength={11} value={formValue.phone2} onChange={handleUserInput} />
                            </div>
                        </div>
                        <br />
                        {/* ---div 2---- */}
                        <div className="div2" >
                            <div className="reglabeldiv">
                                <label className="reglabelh">
                                    For hospitals not operating 24/7 <br />
                                    Please Enter opening and closing timings for each day:<br />
                                </label>
                            </div>
                            <div className="reglabeldivt">
                                <label className="reglabelh">Open:
                                    <input className="reginputf" type="time" name="time" id="open" onChange={handleUserInput} />
                                </label>
                                <label className="reglabelh"> Close:
                                    <input className="reginputf" type="time" name="time" id="close" onChange={handleUserInput} />
                                </label>
                            </div>
                        </div>
                        {/* ----div 3----- */}
                        <div className="div3">
                            <h1 id='error'></h1>
                            <label className="reglabelh">Please select the departments you have in your organization</label>
                            <div className="departs">
                                {createDepartments()}
                            </div>
                            <div className="regbtndiv">
                            <button className="buttonreg" type="submit" id="submitbtn">Sign up</button>
                        </div>
                        </div>
                    </form>
                }

            </div>
        </div>
    )
}

export default Hospital