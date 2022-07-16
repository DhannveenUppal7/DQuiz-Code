import React, { useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import "./loadingcard.css";
import { Link } from 'react-router-dom';


function LoadingCard(){


  return (

    <div className='my-3'>
      <div className="card">
        <div className="card-img-top" style={{ height: "300px", backgroundColor: "#e0e0e0" }} loading="lazy" />
        <hr />
        <div className='card-body'>
          <h5 className='card-title'></h5>
          <p className="card-text"></p>
          <p className="card-text"><small className="text-muted"></small></p>
        </div>


      </div>
    </div>
  )
}

export default LoadingCard