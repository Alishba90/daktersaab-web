import React from "react";

import { useState } from "react";

import Datainput from './components/datainput';

import './data.css'


const Data = () => {
 
  const [counter , setCounter]=useState(5);
  const [showForm, setShowForm] = useState(false);



  return (

    <>
      <div className="manual">
        <label>Enter data Manaually: &nbsp; &nbsp; &nbsp;</label>
        <br />
        <br />

        <button className="click" onClick={()=>{setShowForm(!showForm);}}>Register</button>

      </div>
      <div>
      {showForm && (
        <form action ="" method="POST">
            {Array.apply(null,{length:counter}).map((e,i)=>(
            <><div>
                    <label>
                    Doctor's Name:
                        <input type="text" name="name" />
                    </label><br/>
                    <label>
                    Field/ Department:
                        <input type="text" name="field" />
                    </label><br/>
                    <label>
                    Speciality:
                        <input type="text" name="speciality" />
                    </label><br/>
                    <label>
                    Fees:
                        <input type="text" name="fees" />
                    </label><br/>
                    <label>
                    Timings: 
                    </label><br/>
                    <label>
                    Monday:
                        <input type="time" name="monday"/>
                    </label><br/>
                    <label>
                    Tuesday:
                        <input type="time" name="tuesday"/>
                    </label><br/>
                    <label>
                    Wednesday:
                        <input type="time" name="wednesday"/>
                    </label><br/>
                    <label>
                    Thursday:
                        <input type="time" name="thursday"/>
                    </label><br/>
                    <label>
                    Friday:
                        <input type="time" name="friday"/>
                    </label><br/>
                    <label>
                    Saturday:
                        <input type="time" name="saturday"/>
                    </label><br/>
                    <label>
                    Sunday:
                        <input type="time" name="sunday"/>
                    </label><br/>
            </div>

            <br/><br/>
            </>
            ))}
            <button onClick={()=>setCounter(counter+1)}>+</button>

          
        </form>)}
        </div>

            <Datainput/>

      <br />
      <br />



    </>
  );

}

export default Data;