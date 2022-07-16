import React, { useEffect, useRef, useState } from 'react';
import "./quizgame.css";
// import background_Sound from "../../assets/soundEffects/background_Sound.mp3";
import correctAnswer from "../../assets/soundEffects/correctAnswer.mp3";
import wrongAnswer from "../../assets/soundEffects/wrongAnswer.mp3";
import Loading from '../Loading/Loading';
import { faVolumeOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function QuizGame({ quiz, quizPlayed, setQuizPlayed, qIndex, setQIndex }) {
    const [counter, setCounter] = useState(31);
    const [option1, setOption1] = useState("default");
    const [option2, setOption2] = useState("default");
    const [option3, setOption3] = useState("default");
    const [option4, setOption4] = useState("default");
    const [status, setStatus] = useState("pending");
    const [speaking, setSpeaking] = useState(false);
    const wrongAudio = new Audio(wrongAnswer);
    const correctAudio = new Audio(correctAnswer);
    const intervalRef = useRef(null);


    const lowHandle = () => {
        if (counter > 0) {
            setCounter(counter - 1);

        }

        if (counter === 0) {
            clearInterval(intervalRef.current);
            alert("No option selected within 30 seconds, now you need to move to next question");
            const quizDs = {
                index: qIndex,
                question: quiz.question,
                correctAnswer: quiz.correctAnswer,
                answerGiven: "",
                itemIndex: 8
            }
            setQuizPlayed(prevArray => [...prevArray, quizDs]);
            setQIndex(qIndex + 1);
            clearInterval(intervalRef.current);
            setCounter(31);
        }
    };

    useEffect(() => {
        intervalRef.current = setInterval(lowHandle, 1000);
        return () => clearInterval(intervalRef.current);
    }, [counter]);


    const selectItem = async (item) => {
        if (status === "pending") {
            if (quiz.aOptionsD[item] === quiz.correctAnswer) {
                await correctAudio.play();
                setTimeout(() => {
                    correctAudio.pause();
                }, 5600);
                if (item === 0) {
                    setOption1("correct");
                }
                if (item === 1) {
                    setOption2("correct");
                }
                if (item === 2) {
                    setOption3("correct");
                }
                if (item === 3) {
                    setOption4("correct");
                }
            }
            else {
                await wrongAudio.play();
                setTimeout(() => {
                    wrongAudio.pause();
                }, 2400);
                if (quiz.aOptionsD[0] === quiz.correctAnswer) {
                    setOption1("correct");
                }
                if (quiz.aOptionsD[1] === quiz.correctAnswer) {
                    setOption2("correct");
                }
                if (quiz.aOptionsD[2] === quiz.correctAnswer) {
                    setOption3("correct");
                }
                if (quiz.aOptionsD[3] === quiz.correctAnswer) {
                    setOption4("correct");
                }

                if (item === 0) {
                    setOption1("wrong");
                }
                if (item === 1) {
                    setOption2("wrong");
                }
                if (item === 2) {
                    setOption3("wrong");
                }
                if (item === 3) {
                    setOption4("wrong");
                }



            }

            const quizDs = {
                index: qIndex,
                question: quiz.question,
                correctAnswer: quiz.correctAnswer,
                answerGiven: quiz.aOptionsD[item],
                itemIndex: item
            }
            await setQuizPlayed(prevArray => [...prevArray, quizDs]);
            clearTimeout(intervalRef.current);
            setStatus("solved");
        }
    };

    const nextQuestion = () => {
        if (qIndex <= 10) {
            setOption1("default");
            setOption2("default");
            setOption3("default");
            setOption4("default");
            setQIndex(qIndex + 1);
            setCounter(31);
            setStatus("pending");

        }
    };

    useEffect(() => {
        var shuffledOptions = quiz.aOptions.sort(() => 0.5 - Math.random());
        quiz.aOptionsD = shuffledOptions;
    }, [qIndex]);


    const handleEnd = () => {
        setSpeaking(false);
    };

    const readQuiz = () => {
        if (speaking === false) {
            setSpeaking(true);
            const utterance = new window.SpeechSynthesisUtterance();
            utterance.text = `${quiz.question} Option 1 is ${quiz.aOptionsD[0]} Option 2 is ${quiz.aOptionsD[1]} Option 3 is ${quiz.aOptionsD[2]} Option 4 is ${quiz.aOptionsD[3]}`;
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 1;
            window.speechSynthesis.speak(utterance);
            utterance.onend = handleEnd;
        }
    };

    return (
        <div>
            <div className='headBox'>
                <h2>Question - {qIndex}/10</h2>
                {speaking === false ? <button className='btn btn-primary' onClick={readQuiz}>Read Question <FontAwesomeIcon style={{ marginLeft: "8px" }} icon={faVolumeUp} />
                </button> : <></>}
            </div>
            <div className="progress" style={{ margin: "20px" }}>
                <div className={`progress-bar ${counter <= 10 ? "bg-danger" : "bg-primary"}`} role="progressbar" style={{ width: `${Math.round(counter * 3.33)}%` }} aria-valuenow={counter} aria-valuemin={0} aria-valuemax={counter} />
            </div>
            {counter <= 30 && quiz.aOptionsD !== undefined ? <div style={{ padding: "40px" }}>

                <div className='questionBox'>
                    <h4>
                        {quiz.question}
                    </h4>
                </div>
                <div style={{ margin: "30px" }}>
                    <div className='answers'>
                        <div className={`answer ${option1}`} onClick={() => {
                            selectItem(0);
                        }}>
                            <h5>{(quiz.aOptionsD[0])}</h5>
                        </div>
                        <div className={`answer ${option2}`} onClick={() => {
                            selectItem(1);
                        }}>
                            <h5>{(quiz.aOptionsD[1])}</h5>
                        </div>
                    </div>
                    <div className='answers'>
                        <div className={`answer ${option3}`} onClick={() => {
                            selectItem(2);
                        }}>
                            <h5>{(quiz.aOptionsD[2])}</h5>
                        </div>
                        <div className={`answer ${option4}`} onClick={() => {
                            selectItem(3);
                        }}>
                            <h5>{(quiz.aOptionsD[3])}</h5>
                        </div>
                    </div>
                    {status === "solved" ? <button type="button" className="btn btn-primary hdl" onClick={nextQuestion}>Next Question</button> : <></>}
                </div>

            </div> : <Loading />}
            {/* <div style={{ textAlign: "center", marginTop: "100px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> */}

        </div>
    )
}

export default QuizGame