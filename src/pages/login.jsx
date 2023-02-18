
import * as React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHospital, faLock } from '@fortawesome/free-solid-svg-icons'
import Navbar from './components/navbar';
import "./login.css";



const Login = () => {
  const location = useLocation();
  let navigate = useNavigate();
  let { data } = location.state;

  const [user, setuser] = useState({
    name: "",
    branch: "",
    password: "",
    org: location.state.data,
  });
  const [hospitalbranches, setbranches] = useState();

  const handleinputs = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "name") {
      let api = (
        "http://localhost:5000/api/hospital/branch/" + e.target.value
      ).toString();
      try {
console.log(e.target.value)
        fetch(api)
          .then((response) => response.json()) // get response, convert to json
          .then((json) => {
            setbranches(json.branches);
          });
      }
      catch (err) {
        console.log("error in requesting branches information", err);
        setbranches();
      }
    }
  };

  const Register = (e) => {
    e.preventDefault();

    if (location.state.data === "blood") {
      navigate("/blood", { state: { data: "signup" } });
    } else if (location.state.data === "pharmacy") {
      navigate("/pharmacy", { state: { data: "signup" } });
    } else if (location.state.data === "hospital") {
      navigate("/hospital", { state: { data: "signup" } });
    }
  };

  const SignIn = (e) => {
    if (user.name === "") {
      document.getElementById("errorstatus").innerHTML = "Name cannot be empty";
    } else if (user.password === "") {
      document.getElementById("errorstatus").innerHTML =
        "Please enter your password";
    } else {
      e.preventDefault();
      console.log("the info is ", user);
      try {
        fetch("http://localhost:5000/api/login/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((json) => {
            document.getElementById("errorstatus").innerHTML = json.error;
            if (!json.error) {
              setuser({
                name: "",
                branch: "",
                password: "",
                org: location.state.data,
              });
              document.getElementById("errorstatus").innerHTML = "";
              console.log(json.user);
              navigate("../" + location.state.data, {
                state: { data: "displaydata", info: json.user },
              });
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div class="bodycontainer">
      <Navbar />
      <div class="container1">
        <div class="headcontainer">
          <h1 class='welheading'>Welcome</h1>
          <p class='subhead'>Authorize yourself as a {data}</p>

          <div>
          <p class='regline'> Not registered yet? Register Yourself</p>
          <button class='buttonr' onClick={Register}>Register</button>
          </div>
        </div>

        <div class="formcontainer">
          <h1 class='Heading'>Sign In</h1>
          <form onSubmit={SignIn}>
            <div className="labeldiv">
              <label className="labelh"><FontAwesomeIcon className='faicon' icon={faUser} /> Name:</label>
              <input className="inputf" type="text" name="name" value={user.name} onChange={handleinputs} />
            </div>

            {hospitalbranches && (
              <div className="labeldiv">
                <div className="labelh">
                  <label className="labelh"><FontAwesomeIcon className='faicon' icon={faHospital} /> Select Branch:</label>
                </div>
                {hospitalbranches.map((element, index) => {
                  return (
                    <div className='radiobtn'>
                      <input className='radiobtn' type="radio" key={index} id={index} name="branch" value={element} onChange={handleinputs} />
                      <label htmlFor={index}>{element}</label>
                    </div>
                  );
                })}
              </div>
            )}
            
            <div className="labeldiv">
              <label className="labelh"><FontAwesomeIcon className='faicon' icon={faLock} /> Password:</label>
              <input className="inputf" type="password" name="password" value={user.password} onChange={handleinputs} />
              <a href="#" className='fplink' >Forgot password?</a>
              <button class='buttons' type="submit" id="submitbtn">Sign In</button>
            </div>

            <p className='errormsg' id="errorstatus"></p>

          </form>

        </div>
      </div>
    </div>

  );
};

export default Login;
