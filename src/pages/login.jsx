import { Button } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate ,useLocation} from "react-router-dom";

const Login=()=>{

const location=useLocation();
let navigate = useNavigate();
let {data} =location.state;
let showbranch=false;

const [user, setuser]=useState(
{
  name:'',
  branch:'',
  password:'',
  org:location.state
}
)
const handleinputs=(e)=>{
      setuser({
            ...user,
            [e.target.name]: e.target.value
          });
      if(e.target.name==='name'){
        let api=('http://localhost:5000/api/hospital/branch/'+ e.target.name).toString()
          try{
            fetch(api,{ method:'GET' , headers:{'Content-Type': 'application/json'}}).then(res =>
                  {if(res.status===200){
                  


                  }}
                )
              }catch(err){console.log("error in requesting branches information", err)}


}
}
            
const Register=()=>{
    if(location.state==='blood'){navigate('./blood',{state:{data:"signup"}})}
    else if (location.state==='pharmacy'){navigate('./pharmacy',{state:{data:"signup"}})}
    else{ navigate('./hospital',{state:{data:"signup"}}) }
}

const SignIn =(e)=>{
    if(user.name=''){document.getElementById('errorstatus').innerHTML="Name cannot be empty"}
    else if (user.password=''){document.getElementById('errorstatus').innerHTML="Please enter your password"}
    else{
      e.preventDefault();
      try{
          let api ='http://localhost:5000/api/login'
          fetch(api, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          }).then(res => {
            if (res.status === 200){
                console.log(res.data); 
                navigate(('./'+location.state));
                
            }
            else if(res.status===430){}

            else{console.log("error in sending data", res.data)}

            });
       }catch(err){console.log(err);}


}


}
return(
<>

<h1>Authorize yourself as a {data}</h1>

<br/>
<h3 id ="errorstatus">Credentials are invalid </h3>
<div>
<form  onSubmit={SignIn}>
<div>
<label>Name:
</label>
<input type="text" name='name' onChange={handleinputs}/>
{showbranch && <input type="radio" value="Male" name="gender" />}

</div>
<div>
<label>Password:
</label>
<input type="password" name='password' onChange={handleinputs}/>
</div>

<button type="submit"  id="submitbtn">Sign In</button><br/>
<a>Forgot password?</a>
</form>
</div>

<div>
<h6>Or Register Yourself with us</h6>
<Button onClick={Register}>Register</Button>
</div>

</>



)


}

export default Login