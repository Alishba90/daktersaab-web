import React from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import { useState , useEffect } from 'react';
import Papa from "papaparse";

const Department=()=>{


let navigate = useNavigate();
let location = useLocation();

let {state}=location.state;
const [formValue,setformValue]=useState({
    location:'',
    name:'',
    department:[]

})



const [edit, setedit] = useState(false);
const [data, setdata] = useState(true);
const [view, setview] = useState(false);
useEffect(()=>{
console.log("this upda",location.state)
setformValue({
    location:location.state.Location,
    name:location.state.Name,
    department:location.state.Department
})
if(location.register){
setdata(true)

}
else{
setview(true)
}
},[])

const [deptinfo,setdeptinfo]=useState([{
    deptname:'',
    deptpw:'',
    deptphone:[]

}])

const nulldept=()=>{
    if((deptinfo.length>1)){
        return false;
    }
    else{
        return true;
    }
}

const deldepart=(e)=>{
    if(nulldept){
        e.target.disabled=true;
    }
    else{
        e.target.disabled=false;
        deptinfo.map((row,index)=>{
            if(row.deptname===e.target.name){

            }
        })
    }
}
//State to store table Column name
const [opdtableRows, setopdTableRows] = useState([]);

//State to store the values
const [opdvalues, setopdValues] = useState([]);

const rowsArray = [];
const valuesArray = [];
const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {


        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });


      }
    }


);

        // Filtered Column Names
        setopdTableRows(rowsArray[0]);

        // Filtered Values
        setopdValues(valuesArray);

setedit(true);
  };

const editing =(e)=>{

        let v=opdvalues;
        v[e.target.id][e.target.name]=e.target.value;
        setopdValues(v);

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
<img></img>
</div>
<hr/>
<h1>{formValue.department}</h1>
<div >
{formValue.department.map((rows,index)=>{
return(
<div key={index} id={index}>       
        

<input value={{rows}+'department'} name='deptname' id={rows}/><br/>
<h1 id="depterror"></h1>
<button value='delete' onClick={deldepart} id='deleteDep' name={rows} />
<label>Please provide a password for this department</label>
<label>Phone: </label><input type='tel' name='depphone'/><br/>
<label>Password: </label><input type='password' name='depPass'/><br/>
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