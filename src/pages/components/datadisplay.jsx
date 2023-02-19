import React from "react";

const Datadisplay=(props)=>{

    
return(
<>

<div className="DDdiv">
                <p className="DDheading"> Information</p>

                <div className="DDlabeldiv">
                    <p className="DDlabel">Name:  </p>
                    <p className="DDlabelv">{props.Name} </p>
                </div>
                <div className="DDlabeldiv">
                    <p className="DDlabel">Location:  </p>
                    <p className="DDlabelv">{props.Location}</p>
                </div>
                <div className="DDlabeldiv">
                    <p className="DDlabel">Phone Number:  </p>
                    <p className="DDlabelv" >{props.Phone1}</p>
                    <p className="DDlabelv">{props.Phone2}</p>
                </div>
                <div className="DDlabeldiv">
                    <p className="DDlabel">Email:  </p>
                    <p className="DDlabelv"> {props.Email}</p>
                </div>
            </div>
            <p className="DDheading">Departments</p>


</>

)
}
export default Datadisplay;
