import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import AssesGame from './AssesGame';
import AssesResult from './AssesResult';



function AssesPlay({ quiz, quizType }) {
    const [qIndex, setQIndex] = useState(1);
    const [quizPlayed, setQuizPlayed] = useState([]);
    const [quizData, setQuizData] = useState();


    useEffect(() => {

        var marks = 0;
        var answered = [];
        if (qIndex > 10) {
            quizPlayed.map((quizq) => {
                if (quizq.answerGiven == quizq.correctAnswer) {
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

            var qFullData = {
                playData: {
                    qQuizType: quizType,
                    playedBy: auth.currentUser.displayName,
                    qScore: marks,
                    qPercentage: ((marks / 10) * 100),
                    remarks: remarks,
                },
                allQuiz: quiz,
                answered: answered
            }
            setQuizData(qFullData);
        }

    }, [qIndex]);




    return (
        <div>
            {qIndex <= 10 ? <AssesGame quiz={quiz[qIndex - 1]} qIndex={qIndex} setQIndex={setQIndex} quizPlayed={quizPlayed} setQuizPlayed={setQuizPlayed} /> : quizData ? <AssesResult quizData={quizData} /> : <></>}
            {
                // qIndex <= 10 ? <AssesGame quiz={quiz[qIndex - 1]} qIndex={qIndex} setQIndex={setQIndex} quizPlayed={quizPlayed} setQuizPlayed={setQuizPlayed} /> : quizData ? <AssesResult quizData={quizData} /> : <></>

            }

        </div>
    )
}

export default AssesPlay