import React, { useState } from 'react';
import BaseCreate from '../../components/QuizCreation/BaseCreate/BaseCreate';
import CreateQuiz from '../../components/QuizCreation/CreateQuiz/CreateQuiz';
import { db } from '../../firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';


function MakeQuiz() {
    //State Variables
    const [quizCLvStatus, setQuizCLvStatus] = useState("");
    const [quizSetupId, setQuizSetupId] = useState("");
    const [quizQNA, setQuizQNA] = useState([]);


    const addQuestionO = async (newQ) => {
        if ((quizQNA.length + 1) === 10) {
            const docRef = await doc(db, "quizzes", quizSetupId);
            const colRef = await collection(docRef, "quizQuestionAnswers");
            await addDoc(colRef, {
                quizqA: newQ,
            });
            await updateDoc(docRef, {
                quizStatus: "av",
            });
            setQuizCLvStatus("av");
        }
    };

    return (
        <div>
            {
                quizCLvStatus === "ready" || quizCLvStatus === "av" ?
                    <CreateQuiz addQuestion={addQuestionO} qaLength={(quizQNA.length) + 1} quizQNA={quizQNA} setQuizQNA={setQuizQNA} status={quizCLvStatus}  /> :
                    <BaseCreate setQuizCLvStatus={setQuizCLvStatus} setQuizSetupId={setQuizSetupId} /> 
            }
        </div>
    )
}

export default MakeQuiz