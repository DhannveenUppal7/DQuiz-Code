import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import "./quizstart.css";
import Loading from '../../../components/Loading/Loading';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function QuizStart() {
    const parmas = useParams();
    const quizId = parmas.slug;
    const [quiz, setQuiz] = useState([]);
    var quizDate;
    
    useEffect(async () => {
        const docRef = doc(db, "quizzes", quizId);
        const docData = await getDoc(docRef).then(async (data) => {
            var dataInDoc = data.data()
            const quizData = query(collection(db, 'quizzes', quizId, "quizQuestionAnswers"));
            await onSnapshot(quizData, (querySnapshot) => {
                setQuiz(querySnapshot.docs.map(doc => ({
                    ...dataInDoc, quizqA: doc.data().quizqA, id: quizId
                })));

            })
        });
    }, []);

    if (quiz.length > 0) {
        quizDate = new Date((quiz[0].quizCreatedTime.seconds * 1000)).toLocaleString();
    }

    const copyLink = () => {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        alert("Quiz Link Copied");
    };

    return (
        <div>
            {quiz.length > 0 ? <div style={{ margin: "30px" }}>
                <div>
                    <h1 style={{ textAlign: "center", margin: "38px" }}>{quiz[0].quizName}</h1>
                    <img src={quiz[0].quizImage} className="quizImg" style={{ borderRadius: "50px", maxHeight: "500px", border: "2px solid black" }} />
                    <p style={{ margin: "30px", fontSize: "20px" }}>Description - {quiz[0].quizDesc}</p>
                </div>
                <div>
                    <div className='authorSec' style={{ fontSize: "18px" }}>
                        <label>Quiz Subject - {quiz[0].quizSubject}</label>
                        <br />
                        <img className='img-thumbnail' src={quiz[0].quizCreatedImage} style={{ borderRadius: "50%", maxWidth: "150px", margin: "10px", maxHeight: "300px" }} alt="createdBy" />
                        <br />
                        <label>Created By {quiz[0].quizCreatedUN}</label>
                        <br />
                        <label>At {quizDate}</label>
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <button className='btn btn-primary' onClick={copyLink} type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Link Copied">
                        <FontAwesomeIcon icon={faCopy} /> Copy Quiz Link
                    </button>
                    <br />
                    <Link className="btn btn-primary" to="/playquiz" state={{ quiz: quiz[0] }}>Start Playing Quiz</Link>
                </div>
            </div> : <Loading />}
        </div>
    )
}

export default QuizStart