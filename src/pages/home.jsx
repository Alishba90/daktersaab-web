import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './home.css'



const Home = () => {


  let navigate = useNavigate();
  const data = () => {
    let path = './data';
    navigate(path);
  }
  const bloodbank = () => {
    let path1 = './blood';
    navigate(path1);
  }

  
  const pharmacy = () => {
    let path2 = './pharmacy';
    navigate(path2);
  }

  const hospital = () => {
    let path3 = './hospital';
    navigate(path3);
  }
  const [popup, setPop] = useState(false)
  const handleClickOpen = () => {
    setPop(!popup)
  }
  const closePopup = () => {
    setPop(false)
  }

  return (
    <>
      <div className='main1'>
        {/* Introduction */}
        <div className='intro'>
          <h1>Dakter Saab ~
          </h1>
          <h3> Search, Find, and Book at one tap!</h3>

          {/* Buttons */}
          <div className='reg'>
            <button type="button" className="reg-btn " onClick={handleClickOpen}>Register Yourself</button>
          </div>
          <div className='update'>
            <button type="button" className="update-btn " >Update Data</button>
          </div>
          <div className='contact'>
            <button type="button" className="contact-btn " >Contact Us!</button>
          </div>

        </div>
        {/* Pop up */}
        <div>
          {
            popup ?
              <div className="main">
                <div className="popup">
                  <div className="popup-header ">
                    <h2>Select The Organization</h2>
                    <button type="button" class="btn-close pr-10" aria-label="Close" onClick={closePopup}></button>
                  </div>
                  <div className='opt'>
                    <button className='btn1' onClick={data}>Doctor</button>
                    <button className='btn2' onClick={bloodbank}>Blood Bank</button>
                    <button className='btn3' onClick={pharmacy}>Pharmacy</button>
                    <button className='btn3' onClick={hospital}>Hospital</button>
                  </div>
                </div>
              </div> : ""
          }

        </div>
      </div>


    </>
  );

}

export default Home