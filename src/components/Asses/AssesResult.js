import React, { useEffect, useRef } from 'react';
import "./assesresult.css";
import success from "../../assets/success.png";
import { Link } from 'react-router-dom';
import { faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import certificateLd from "../../assets/certificate.jpg";

function AssesResult({ quizData }) {

  const certificateRef = useRef();


  const copyResult = () => {
    const el = document.createElement("textarea");
    el.value = `Hello I am Glad that I can share my DQuiz Result with you....\nQuiz Attempted By: ${quizData.playData.playedBy}\nQuiz Subject: ${quizData.playData.qQuizType}\nScore: ${quizData.playData.qScore} Out of 10\nPercentage: ${quizData.playData.qPercentage}%\nYou too can play this quiz at the link - \n${window.location.origin}/asses_yourself`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Quiz Result Copied, now you can share it with your friends");
  };

  useEffect(() => {
    if ((quizData.playData.qScore) >= 5) {
      const canvas = certificateRef.current;
      const context = canvas.getContext("2d");
      const certificateImg = new Image();
      certificateImg.src = certificateLd;
      certificateImg.onload = () => {
        context.drawImage(certificateImg, 0, 0, canvas.width, canvas.height);
        context.font = "30px Verdana"
        context.fillText(quizData.playData.playedBy, 380, 275);
        context.font = "23px Tahoma"
        context.fillText(`${quizData.playData.qQuizType} Quiz`, 412, 408)

      };
    }
  }, []);

  const downloadCertificate = () => {
    if ((quizData.playData.qScore) >= 5) {
      const canvas = certificateRef.current;
      var image = canvas.toDataURL();
      var cf = document.createElement('a');
      cf.download = `Certificate_${quizData.playData.playedBy}.png`;
      cf.href = image;
      document.body.appendChild(cf);
      cf.click();
      document.body.removeChild(cf);
    }
  };

  return (
    <div>
      {quizData ? <div style={{ textAlign: "center" }}>
        <img className='success-img' src={success} alt="success" />

        <h1 style={{ marginTop: "30px" }}>Well Played!</h1>
        <hr />
        <h2 style={{ marginTop: "30px" }}>Result</h2>
        <h4 className='notes'>Attempted By: {quizData.playData.playedBy}</h4>
        <h4 className='notes'>Quiz Subject: {quizData.playData.qQuizType}</h4>
        <h4 className='notes'>Score: {quizData.playData.qScore} Out of 10</h4>
        <h4 className='notes'>Percentage: {quizData.playData.qPercentage}%</h4>
        <h4 className='notes'>Remarks: {quizData.playData.remarks}</h4>
        <br />
        <button className='btn btn-primary' onClick={copyResult} type="button">
          <FontAwesomeIcon icon={faCopy} /> Share Result
        </button>
        <br />
        <Link className="btn btn-primary" to={`/`}>Play the Quiz Again</Link>
        <hr />
        {(quizData.playData.qScore) >= 5 ? <div style={{ padding: "10px" }}>
          <h2 style={{ marginTop: "30px", color: "black" }}>Your Certificate</h2>
          <canvas ref={certificateRef} width={1000} height={620} style={{ maxWidth: "100%", height: "auto", borderRadius: "5px" }} />
          <br />
          <button className="btn btn-primary" onClick={downloadCertificate} ><FontAwesomeIcon icon={faDownload} style={{ marginRight: "12px" }} />Download Certificate</button>
          <hr />

        </div> : <></>}
        <h2 style={{ marginTop: "30px" }}>Answer Corrections</h2>
        <div style={{ marginTop: "30px" }}>

          {quizData.allQuiz.map((quizA, index) => {
            var match = quizData.answered[index][0] === quizA.correctAnswer;
            var border = match ? "green" : "red";
            var answeredIndex = quizData.answered[index][1];

            return (quizData.answered[index][0] !== "") ? (
              <div className='qa' style={{ border: `2px solid ${border}` }}>
                <h4>{index + 1}. {quizA.question}</h4>

                {match ? <div className='options'>
                  {answeredIndex === 0 ? <h5 style={{ color: "green", fontWeight: "900" }}> - {quizA.aOptions[0]}</h5> : <h5> - {quizA.aOptions[0]}</h5>}
                  {answeredIndex === 1 ? <h5 style={{ color: "green", fontWeight: "900" }}> - {quizA.aOptions[1]}</h5> : <h5> - {quizA.aOptions[1]}</h5>}
                  {answeredIndex === 2 ? <h5 style={{ color: "green", fontWeight: "900" }}> - {quizA.aOptions[2]}</h5> : <h5> - {quizA.aOptions[2]}</h5>}
                  {answeredIndex === 3 ? <h5 style={{ color: "green", fontWeight: "900" }}> - {quizA.aOptions[3]}</h5> : <h5> - {quizA.aOptions[3]}</h5>}
                </div> : <div className='options'>
                  {answeredIndex === 0 ? <h5 style={{ color: "red", fontWeight: "900" }}> - {quizA.aOptions[0]}</h5> : <h5> - {quizA.aOptions[0]}</h5>}
                  {answeredIndex === 1 ? <h5 style={{ color: "red", fontWeight: "900" }}> - {quizA.aOptions[1]}</h5> : <h5> - {quizA.aOptions[1]}</h5>}
                  {answeredIndex === 2 ? <h5 style={{ color: "red", fontWeight: "900" }}> - {quizA.aOptions[2]}</h5> : <h5> - {quizA.aOptions[2]}</h5>}
                  {answeredIndex === 3 ? <h5 style={{ color: "red", fontWeight: "900" }}> - {quizA.aOptions[3]}</h5> : <h5> - {quizA.aOptions[3]}</h5>}

                </div>}
              </div>
            ) : <>
              <div className='qa' style={{ border: `2px solid ${border}` }}>
                <h4>{index + 1}. {quizA.question}</h4>
                <h5> - {quizA.aOptions[0]}</h5>
                <h5> - {quizA.aOptions[1]}</h5>
                <h5> - {quizA.aOptions[2]}</h5>
                <h5> - {quizA.aOptions[3]}</h5>
              </div>
            </>
          })}




        </div>


      </div> : <></>
      }
    </div >
  )
}

export default AssesResult