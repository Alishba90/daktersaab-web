import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Navbar from './components/navbar';


const Home = () => {
  let navigate = useNavigate();
  const bloodbank = () => {
    navigate("/login", { state: { data: "blood bank" } });
  };
  const pharmacy = () => {
    navigate("/login", { state: { data: "pharmacy" } });
  };
  const hospital = () => {
    navigate("/login", { state: { data: "hospital" } });
  };
  return (
    
      <div className="homebodycontainer">
      <Navbar loc='/'/>
        <div className="homecontainer1">
          <div className="buttonscontainer">

            <div className="buttondiv">
              <button type="button" className="h-btn " onClick={hospital}>
                Hospital
              </button>
            </div>
            <div className="buttondiv">
              <button type="button" className="h-btn " onClick={pharmacy}>
                Pharmacy
              </button>
            </div>
            <div className="buttondiv">
              <button type="button" className="h-btn " onClick={bloodbank}>
                Blood Bank
              </button>
            </div>
          </div>

          <div className="imgcontainer">
            {/* <h1>Dakter Saab ~</h1>
              <h3> Search, Find, and Book at one tap!</h3> */}
          </div>



        </div>
      </div>
  
  );
};

export default Home;
