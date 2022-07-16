import React, { useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import "./quizcard.css";
import { Link } from 'react-router-dom';


function QuizCard({ quiz }) {


  var todayDate = new Date();
  var quizDate = quiz.quizCreatedTime.toDate();

  var numDaysBetween = function (d1, d2) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  };

  var newORNOT = numDaysBetween(todayDate, quizDate) <= 7;


  return (

    <div className='my-3'>
      <div className="card">
        {newORNOT ?
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "90%", zIndex: "1", padding: "10px", fontSize: "14px" }}>
            NEW
          </span> : <></>}
        <img src={quiz.quizImage} className="card-img-top" style={{ maxHeight: "300px" }} loading="lazy" />
        <hr />
        <div className='card-body'>
          <h5 className='card-title'>{quiz.quizName}</h5>
          <p className="card-text">{quiz.quizDesc.slice(0, 88)}{quiz.quizDesc ? "..." : ""}</p>
          <p className="card-text"><small className="text-muted">Created By {quiz.quizCreatedUN} on {quizDate.toLocaleString()}</small></p>
          <Link type="button" className="btn btn-dark" to={`/quizstart/${quiz.id}`}   >
            Open Quiz
          </Link>
        </div>


      </div>
    </div>
  )
}

export default QuizCard