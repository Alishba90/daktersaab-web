import React from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import { useState , useEffect } from 'react';
import Papa from "papaparse";
import imageupload from '../images/dataupload.jpg';

const Department=()=>{


let navigate = useNavigate();
let location = useLocation();

let {state}=location.state;


const name=location.state.Name
const branch=location.state.Location
const department=location.state.Department

const [edit, setedit] = useState(false);
const [data, setdata] = useState(true);
const [view, setview] = useState(false);

const [deptinfo,setdeptinfo]=useState([{
    deptname:'',
    deptpw:'',
    deptphone:''

}])

let d=[]

useEffect(()=>{



department.map((row,index)=>{
    d.push({deptname:row,deptpw:'',deptphone:''})
})

setdeptinfo(d)

if(location.register){
setdata(true)

}
else{
setview(true)
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
setedit(true);
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

const changepwinput=(e)=>{}

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



return (
<>

{data &&

<>
<div id='popup'>
<h1>Enter data in the following format</h1>
<img src={imageupload}></img>
</div>
<hr/>
<h1>{name}</h1>
<h2>{branch}</h2>
<div >
{deptinfo.map((rows,index)=>{
return(
<div key={index} >       
        
<h1 id="errordept"></h1>
<input value={rows.deptname } name={rows.deptname} id='deptname' style={{width: "30em"}} onChange={changenameinput}/><br/>
<h1 id="depterror"></h1>
<button value='delete' onClick={deldepart} className='deleteDep' name={rows.deptname} >Delete</button>
<label>Phone: </label><input type='tel' name={rows.deptphone} onChange={changephoneinput} id='deptphone' /><br/>
<label>Please provide a password for this department</label><br/>

<label>Password: </label><input type='password' name={rows.deptpw} onChange={changepwinput} id='deptpw'/><br/>
<label>Re-enter Password: </label><input type='password' name='depPass'/><br/>
<label>Enter data for opd doctors</label><br/>

<div className="csv">
<label>Enter data by uploading a CSV file:</label>
<br />
<br />
        {/* File Uploader */}
        <input
          type="file"
          name="file"
          className="file_upload"
          onChange={changeHandler}
          accept=".csv"
        />
</div>

<button >Edit Data</button>
<button>View Data</button>
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
<input type="button" onClick={submitDoctors} value="Confirm and Proceed"/>
</div>
}
</>
}






</>
)}

export default Department;