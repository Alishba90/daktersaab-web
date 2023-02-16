import React from 'react';
import { useNavigate, useLocation} from "react-router-dom";

const Department=()=>{


let navigate = useNavigate();
let location = useLocation();

let {state}=location.state;


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



return (
<>

{data &&

<>
<hr/>
<div >
{formValue.department.map((rows,index)=>{
return(
<div key={index} id={index}>       
        

<label >{rows} Department </label><br/>
<h1 id="depterror"></h1>
<label>Please provide a password for this department</label>
<label>Phone: </label><input type='tel' name='depphone'/><br/>
<label>Password: </label><input type='password' name='depPass'/><br/>
<label>Re-enter Password: </label><input type='password' name='depPass'/><br/>
<label>Enter data </label>
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
)}

export default Department;