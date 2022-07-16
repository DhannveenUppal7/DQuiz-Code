import React, { useState } from 'react';
import "./createquiz.css";
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import isEmpty from '../../../helpers/isEmpty';


function CreateQuiz({ addQuestion, qaLength, quizQNA, setQuizQNA, status }) {
  const [quizQuestion, setQuizQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const [selectOption, setSelectOption] = useState(option1);
  const [showModal, setShowModal] = useState(false);

  const ansOptions = [
    {
      label: "Option1",
      value: option1
    },
    {
      label: "Option2",
      value: option2
    },
    {
      label: "Option3",
      value: option3
    },
    {
      label: "Option4",
      value: option4
    },


  ]

  const setCorrectOption = (e) => {
    var correctOptionVal;
    correctOptionVal = ansOptions.filter(function (rx) {
      return rx.label === e.target.value
    })
    setSelectOption(correctOptionVal[0].value);

  };

  const addQuizQ = async (e) => {
    e.preventDefault();
    var questionA = {
      question: quizQuestion,
      correctAnswer: !selectOption ? option1 : selectOption,
      aOptions: [
        option1,
        option2,
        option3,
        option4
      ]
    }
    setQuizQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setSelectOption("");
    var qrNa = [];
    quizQNA.map(questionItem => {
      qrNa.push(questionItem);
    });
    qrNa.push(questionA)
    setQuizQNA(qrNa);
    await addQuestion(qrNa);
    if(status === "av" && qaLength === 10){
      setShowModal(true)
    };
  };

  const Modal = () => (
    <div className="modal fade" id="successModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="successModalLabel">Quiz Created</h5>
          </div>
          <div className="modal-body">
            The Quiz has been created it will now appear on the website and everyone will be able to play it.
            Note any quiz found with irrelevant or inappropriate content, will be deleted.
          </div>
          <div className="modal-footer">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <button className="btn btn-primary" style={{ width: "auto", height: "auto" }} onClick={(e)=>{e.preventDefault()}}>
                Explore Other Quizzes
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <div>
      <div className='quizMake'>
        <h1>Make Your Own Quiz</h1>
        <h2 style={{ marginTop: "25px", marginBottom: "18px" }}>Add Question {qaLength}</h2>
        <form className='quizQContainer'>
          <input className="form-control me-2" type="text" placeholder="Enter the question" value={quizQuestion} onChange={(e) => setQuizQuestion(e.target.value)} />
          <br />
          <h2>Options</h2>
          <br />
          <div>
            <div className='quizAnswers'>
              <div className='quizAnswer'>
                <div>
                  <h3 style={{ margin: "18px" }}>Option 1</h3>
                  <input type="text" className='form-control' placeholder='Enter option 1' value={option1} onChange={(e) => setOption1(e.target.value)} />
                </div>
              </div>
              <div className='quizAnswer'>
                <div>
                  <h3 style={{ margin: "18px" }}>Option 2</h3>
                  <input type="text" className='form-control' placeholder='Enter option 2' value={option2} onChange={(e) => setOption2(e.target.value)} />
                </div>
              </div>
            </div>
            <div className='quizAnswers'>
              <div className='quizAnswer'>
                <div>
                  <h3 style={{ margin: "18px" }}>Option 3</h3>
                  <input type="text" className='form-control' placeholder='Enter option 3' value={option3} onChange={(e) => setOption3(e.target.value)} />
                </div>
              </div>
              <div className='quizAnswer'>
                <div>
                  <h3 style={{ margin: "18px" }}>Option 4</h3>
                  <input type="text" className='form-control' placeholder='Enter option 4' value={option4} onChange={(e) => setOption4(e.target.value)} />
                </div>
              </div>

            </div>
          </div>

          <br />

          {isEmpty(quizQuestion) || isEmpty(option1) || isEmpty(option2) || isEmpty(option3) || isEmpty(option4) ? <></> :
            <div style={{ alignItems: "center" }}>
              <h3 for="correctAns" style={{ margin: "20px" }}>Choose Correct Answer:</h3>

              <select className="form-select choiceSel" aria-label="Choose Corect Answer" onChange={setCorrectOption}>
                {ansOptions.map((option, index) => (
                  <option value={option.label} className='optionSel' >Option {index + 1} - {option.value}</option>
                ))}
              </select>
            </div>
          }

          {/* {
          qaLength === 2 ? <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#successModal" onClick={addQuizQ}>Create Quiz</button> : 
          !quizQuestion || !option1 || !option2 || !option3 || !option4 ? <button className="btn btn-secondary" type="submit" onClick={(e) => { e.preventDefault() }}>Create Quiz</button> :
            !quizQuestion || !option1 || !option2 || !option3 || !option4 ? <button className="btn btn-secondary" type="submit" onClick={(e) => { e.preventDefault() }}>Add Next Question</button> :
              <button className="btn btn-primary" type="submit" onClick={addQuizQ}>Add Next Question</button>
          } */}

          {
            qaLength === 10 ? isEmpty(quizQuestion) || isEmpty(option1) || isEmpty(option2) || isEmpty(option3) || isEmpty(option4) ? <></> : <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#successModal" onClick={addQuizQ}>Create Quiz</button> : isEmpty(quizQuestion) || isEmpty(option1) || isEmpty(option2) || isEmpty(option3) || isEmpty(option4) ? <button className="btn btn-secondary" type="submit" onClick={(e) => { e.preventDefault() }}>Add Next Question</button> :
              <button className="btn btn-primary" type="submit" onClick={addQuizQ}>Add Next Question</button>

          }

          {qaLength === 10 || showModal ? <Modal /> : <></>}

        </form>
      </div>
    </div>
  )
}

export default CreateQuiz