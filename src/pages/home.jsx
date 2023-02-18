import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './home.css';

const Home = () => {

  let navigate = useNavigate();
  
  const bloodbank = () => {

    navigate('/login', { state: { data: "blood" } });
  }

  const pharmacy = () => {

    navigate('/login', { state: { data: "pharmacy" } });
  }

  const hospital = () => {

    navigate('/login', { state: { data: "hospital" } });
  }
  return (
    <>
      <div className='bodycontaine'>
        {/* Introduction */}
        <div className='intro'>
          <h1>Dakter Saab ~
          </h1>
          <h3> Search, Find, and Book at one tap!</h3>

          {/* Buttons */}
          <div className='reg'>
            <button type="button" className="reg-btn " onClick={hospital}>Hospital</button>
          </div>
          <div className='update'>
            <button type="button" className="update-btn " onClick={pharmacy}>Pharmacy</button>
          </div>
          <div className='update'>
            <button type="button" className="update-btn " onClick={bloodbank} >Blood Bank</button>
          </div>


        </div>

      </div>


    </>
  );

}

export default Home