import React from "react";

const Datadisplay=(props)=>{

return(
<>

<div>
<h5>Name :{props.Name}</h5>

<h5>Location:{props.Location}</h5>
<h5>Phone Number </h5><p>{props.Phone1}</p>
<p>{props.Phone2}</p>
<h5>Email :{props.Email}</h5>

</div>



</>

)
}
export default Datadisplay;
