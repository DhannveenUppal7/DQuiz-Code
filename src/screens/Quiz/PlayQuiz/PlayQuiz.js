import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import QuizGame from '../../../components/QuizGame/QuizGame';
import { auth } from '../../../firebase';
import QuizResult from '../../../components/QuizGame/QuizResult';
// import "./quizstart.css";





function QuizStart() {
    const location = useLocation();
    const quiz = location?.state?.quiz;
    const [qIndex, setQIndex] = useState(1);
    const [quizPlayed, setQuizPlayed] = useState([]);
    const [quizData, setQuizData] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        if (quiz) {
            var marks = 0;
            var answered = [];
            if (qIndex > 10) {
                quizPlayed.map((quizq) => {
                    if (quizq.answerGiven === quizq.correctAnswer) {
                        marks = marks + 1;
                    }
                    answered.push([quizq.answerGiven, quizq.itemIndex]);
                });

                var remarks = "";
                if (marks <= 5) {
                    remarks = "You need a lot of practice";
                }
                if (marks <= 7 && marks > 5) {
                    remarks = "Well Tried, But need a Improvement"
                }
                if (marks <= 9 && marks > 7) {
                    remarks = "Great Work, practice makes a man perfect."
                }
                if (marks === 10) {
                    remarks = "Fantastic, Bravo, Keep it up."
                }


                var qPlayData = {
                    aName: auth.currentUser.displayName,
                    qName: quiz.quizName,
                    qScore: marks,
                    qPercentage: ((marks / 10) * 100),
                    remarks: remarks,
                    id: quiz.id,
                    qSubject: quiz.quizSubject
                }

                var qFullData = {
                    playData: qPlayData,
                    allQuiz: quiz.quizqA,
                    answered: answered
                }

                setQuizData(qFullData);
            }
        }
        else{
            navigate("/");
        }


    }, [qIndex]);




    return (
        <div>
            {
                quiz ? qIndex <= 10 ? <QuizGame quiz={quiz.quizqA[qIndex - 1]} qIndex={qIndex} setQIndex={setQIndex} quizPlayed={quizPlayed} setQuizPlayed={setQuizPlayed} /> : quizData ? <QuizResult quizData={quizData} /> : <></> : <></>

            }

        </div>
    )
}

export default QuizStart