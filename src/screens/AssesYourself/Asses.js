import React, { useState } from 'react';
import "./asses.css";
import scienceImage from "../../assets/categories/scienceImage.png";
import mathsImage from "../../assets/categories/mathsImage.jpeg";
import technologyImage from "../../assets/categories/technologyImage.jpeg";
import "./asses.css";
import technology from "../../helpers/default/technology";
import science from "../../helpers/default/science";
import AssesPlay from "../../components/Asses/AssesPlay";
import mathematics from '../../helpers/default/mathematics';

function Asses() {
  const [quizChosen, setQuizChosen] = useState("none");
  const [quiz, setQuiz] = useState([]);

  function startAssesQuiz(index){
    if(quizChosen === "none"){
      if(index === 0){
        setQuizChosen("Science");
        setQuiz(science);
      }
      if(index === 1){
        setQuizChosen("Mathematics");
        setQuiz(mathematics);

      }
      if(index === 2){
        setQuizChosen("Technology");
        setQuiz(technology);

      }
    }
  }

  return (
    <div>
        <div style={{ margin: "30px" }}>
            {quiz && quizChosen !== "none" ? <AssesPlay quiz={quiz} quizType={quizChosen} /> : <div>
                <h1 style={{ margin: "30px", textAlign: "center", marginBottom: "40px", fontWeight: "bolder" }}>Asses Yourself in Different Subjects</h1>
                <div className='categories'>
                    <img src={scienceImage} alt="science" className='img-thumbnail' onClick={()=>{startAssesQuiz(0)}} loading="lazy" />
                    <img src={mathsImage} alt="maths" className='img-thumbnail' onClick={()=>{startAssesQuiz(1)}} loading="lazy" />
                    <img src={technologyImage} alt="technlogy" className='img-thumbnail' onClick={()=>{startAssesQuiz(2)}} loading="lazy" />
                </div>
                

            </div>}
        </div>
    </div>
  )
}

export default Asses