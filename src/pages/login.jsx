import { Button } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate ,useLocation} from "react-router-dom";

const Login=()=>{

const location=useLocation();


const Register=()=>{
    if(location.state==='blood'){}
    else if (location.state==='pharmacy'){}
    else{}
}


let navigate = useNavigate();
  const data = () => {
    let path = './data';
    navigate(path);
  }
  const bloodbank = () => {
    let path1 = './blood';
    navigate(path1);
  }

  
  const pharmacy = () => {
    let path2 = './pharmacy';
    navigate(path2);
  }

  const hospital = () => {
    let path3 = './hospital';
    navigate(path3);
  }
return(
<>

<h1>Authorize yourself as a {location.state}</h1>

<br/>
<h3>Credentials are invalid </h3>
<div>
<label>Name:
</label>
<input type="text" name='name'/>
{0 && <input type="radio" value="Male" name="gender" />}

</div>
<div>
<label>Password:
</label>
<input type="text" name='name'/>
</div>
<div>
<h6>Or Register Yourself with us</h6>
<Button onClick={Register}>Register</Button>
</div>

</>



)


}

export default Login