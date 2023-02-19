import React from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import { useState , useEffect } from 'react';
import Papa from "papaparse";
import imageupload from '../images/dataupload.jpg';
import imageview from '../images/dataviewpic.jpg';
import imageedit from '../images/dataeditpic.jpg';
import Navbar from './components/navbar';
import depan from '../images/depan.png'
import depana from '../images/depana.png'
const Department=()=>{


let navigate = useNavigate();
let location = useLocation();

let {state}=location.state;


const name=location.state.Name
const branch=location.state.Location


const [edit, setedit] = useState(false);
const [data, setdata] = useState(false);
const [view, setview] = useState(false);

const [login , setlogin]=useState(false);

const [deptinfo,setdeptinfo]=useState([{
    deptname:'',
    deptpw:'',
    deptphone:''

}])

let d=[]

useEffect(()=>{




if(location.register===true){
setdata(true)
const department=location.state.Department
department.map((row)=>{
    d.push({deptname:row,deptpw:'',deptphone:''})
})

setdeptinfo(d)

}

else{
setlogin(true)
let dept=[{'deptname':location.state.dept.Name,'deptphone': location.state.dept.Phone,'deptpw': location.state.dept.Password}]
setdeptinfo(dept)
}
},[])



const nulldept=()=>{
    if((deptinfo.length>1)){
        return false;
    }
    else{
        return true;
    }
}
useEffect(()=>{
if(nulldept){document.getElementsByClassName('deleteDep').disabled=true}
else{document.getElementsByClassName('deleteDep').disabled=false}
console.log(deptinfo)
})

const deldepart=(e)=>{

setdeptinfo(deptinfo.filter(item => item.deptname !== e.target.name));
console.log(deptinfo)
    
}
//State to store table Column name
const [opdtableRows, setopdTableRows] = useState([]);

//State to store the values
const [opdvalues, setopdValues] = useState([]);

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
        setopdTableRows(rowsArray[0]);

        // Filtered Values
        setopdValues(valuesArray);
      },
    });

  };



const editing =(e)=>{

        let v=opdvalues;
        v[e.target.id][e.target.name]=e.target.value;
        setopdValues(v);

}

const changeinput=(e)=>{


setdeptinfo(deptinfo.filter(item => item.deptname !== e.target.name));
console.log(deptinfo)

    d=deptinfo;
  
    d[e.target.name][e.target.id]=e.target.value;
    
    setdeptinfo(d)
    console.log('dept is',deptinfo)
}

const changenameinput=(e)=>{
var g=deptinfo.findIndex(item => item.deptname === e.target.name)
var db=[...deptinfo]

db[g]['deptname']=e.target.value;
setdeptinfo(db)
console.log(g)
}

const changepwinput=(e)=>{

if(e.target.value!==document.getElementById('reenter').value){document.getElementById('errordept').innerHTML='The passwords dont match'}

}

const changephoneinput=(e)=>{}

const submitDoctors=(e)=>{
try{
      fetch('http://localhost:5000/api/doctor/addDr/'+name+'/'+branch, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      })
                

      .then(res => {
if (res.status === 200){console.log(res.data); setdata(true)}

else{console.log("error in sending data", res.data)}

});
}catch(err){console.log(err);}        

}

const [viewd,setviewd] = useState(false)

const enableedit=(e)=>{
if(!edit){
setedit(true);setviewd(false);document.getElementById('viewbtn').innerHTML='View Data'
e.target.innerHTML='Hide'}
else{
setedit(false);
e.target.innerHTML='Edit Data'
}
}

const enableview=(e)=>{
if(!viewd){
setviewd(true);setedit(false);document.getElementById('editbtn').innerHTML='Edit Data'
e.target.innerHTML='Hide'}
else{
setviewd(false);
e.target.innerHTML='View Data'
}
}

return (
<>
<div class="regbodycontainer">
<Navbar loc='/hospital'/>



<div class="regformcontainer">

<h1 onClick={()=>{navigate('/hospital')}} style={{cursor:'pointer'}}>Hospital Name : {name}</h1>
<h3>{branch}</h3>

{login && <>
<div className="DDlabeldiv">

<label style={{marginLeft: '-1em',fontSize:'2em'}}> {deptinfo[0].deptname} Department</label>

<label style={{marginLeft: '9em',fontSize:'2em'}}>Phone : </label>
<label style={{marginLeft: '1em',fontSize:'2em'}}>03310211080{deptinfo[0].deptphone}</label>


</div>
<div>
<img src={depan} style={{marginTop: '2em',height:'18em',width:'35em'}}></img>
<img src={depana} style={{marginLeft: '1em',marginTop: '2em',height:'18em',width:'35em'}}></img>
</div>

</>}
{data &&

<>
<div id='popup'>
<h1>Enter data in the following format</h1>
<img src={imageupload}></img><hr/>
<h1>You can even view your uploaded data file</h1>
<img src={imageview}></img><hr/>
<h1>Or edit the data file for changes if you want</h1>
<img src={imageedit}></img>
</div>
<hr/>

<div >
{deptinfo.map((rows,index)=>{
return(
<div key={index} >       
        
<h1 id="errordept"></h1>
<input value={rows.deptname } name={rows.deptname} id='deptname' style={{width: "30em"}} onChange={changenameinput}/><br/>

<button value='delete' onClick={deldepart} className='deleteDep' name={rows.deptname} >Delete</button>
<label>Phone: </label><input type='tel' name={rows.deptphone} onChange={changephoneinput} id='deptphone' /><br/>
<label>Please provide a password for this department</label><br/>

<label>Password: </label><input type='password' name={rows.deptpw} onChange={changepwinput} id='deptpw'/><br/>
<label>Re-enter Password: </label><input type='password'  id='reenter'/><br/>
<label>Enter data by uploading a CSV file:</label><br/>
<label>Enter data for opd doctors and their schedule</label>
<div>
<div className="csv">


        {/* File Uploader */}
        <input
          type="file"
          name="file"
          className="file_upload"
          onChange={changeHandler}
          accept=".csv"
        />
</div>

<button onClick={enableedit} id='editbtn'>Edit Data</button>
<button onClick={enableview} id='viewbtn'>View Data</button>
{viewd &&

<div>
<table>
<thead>
            <tr>
              {opdtableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
<tbody>
            {opdvalues.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}><label id={index} >{val}</label></td>;
                  })}
                </tr>
              );
            })}

</tbody>
</table>

</div>
}
{edit &&

<div>
<table>
<thead>
            <tr>
              {opdtableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
<tbody>
            {opdvalues.map((value, index) => {
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

</div>
}

</div>

<label>Enter data for appointment based doctors and specialists</label>
<div>
<div className="csv">


        {/* File Uploader */}
        <input
          type="file"
          name="file"
          className="file_upload"
          onChange={changeHandler}
          accept=".csv"
        />
</div>

<button onClick={enableedit} id='editbtn'>Edit Data</button>
<button onClick={enableview} id='viewbtn'>View Data</button>
{viewd &&

<div>
<table>
<thead>
            <tr>
              {opdtableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
<tbody>
            {opdvalues.map((value, index) => {
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return <td key={i}><label id={index} >{val}</label></td>;
                  })}
                </tr>
              );
            })}

</tbody>
</table>

</div>
}
{edit &&

<div>
<table>
<thead>
            <tr>
              {opdtableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
          </thead>
<tbody>
            {opdvalues.map((value, index) => {
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

</div>
}

</div>

<hr/>
</div>
)})
}
</div>
<hr/>


</>
}



</div>
</div>
</>
)}

export default Department;