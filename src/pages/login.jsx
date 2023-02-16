import { Button } from '@material-ui/core';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate ,useLocation} from "react-router-dom";

const Login=()=>{

const location=useLocation();
let navigate = useNavigate();
let {data} =location.state;


const [user, setuser]=useState(
{
  name:'',
  branch:'',
  password:'',
  org:location.state.data
}
)
const [hospitalbranches,setbranches]=useState();

const handleinputs=(e)=>{
      setuser({
            ...user,
            [e.target.name]: e.target.value
          });
      if(e.target.name==='name'){
        
        let api=('http://localhost:5000/api/hospital/branch/'+ e.target.value).toString()
          try{
fetch(api)
      .then(response => response.json()) // get response, convert to json
      .then(json => {



setbranches(json.branches);


      })
              }catch(err){console.log("error in requesting branches information", err);
              setbranches();
              

}


}
}
            
const Register=(e)=>{
    e.preventDefault()
    
    if(location.state.data==='blood'){navigate('/blood',{state:{data:"signup"}})}
    else if (location.state.data==='pharmacy'){navigate('/pharmacy',{state:{data:"signup"}})}
    else if (location.state.data==='hospital'){ navigate('/hospital',{state:{data:"signup"}}) }
    
}

const SignIn =(e)=>{
    
    if(user.name===''){document.getElementById('errorstatus').innerHTML="Name cannot be empty";}
    else if (user.password===''){document.getElementById('errorstatus').innerHTML="Please enter your password"}
    else{
      e.preventDefault();
      console.log("the info is ",user)
      try{
          
          fetch('http://localhost:5000/api/login/user/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          }).then(response => response.json())
            .then(json=>{
            document.getElementById('errorstatus').innerHTML=json.error;
            if (!json.error){
                
                document.getElementById('errorstatus').innerHTML='';console.log(json.user)
                navigate('../'+location.state.data,{state:{data:'displaydata',info:json.user}});
                
            }

})
       }catch(err){console.log(err);}


}


}
return(
<>

<h1>Authorize yourself as a {data}</h1>

<br/>
<h3 id ="errorstatus"></h3>
<div>
<form  onSubmit={SignIn}>
<div>
<label>Name:
</label>
<input type="text" name='name' value={user.name} onChange={handleinputs}/>
{hospitalbranches &&
<>
{hospitalbranches.map((element, index) => {
  return <div><input type="radio" key={index} id={index} name='branch' value={element} onChange={handleinputs}/><label htmlFor={index}>{element}</label></div>

})}
</>
}


</div>
<div>
<label>Password:
</label>
<input type="password" name='password' value={user.password} onChange={handleinputs}/>
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