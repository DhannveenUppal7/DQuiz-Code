import React, { useEffect, useState } from 'react';
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import "./home.css";
import QuizCard from '../../components/ExploreQuiz/QuizCard/QuizCard';
import Loading from '../../components/Loading/Loading';
import quizIntro from '../../assets/quizIntro.gif';
import { Link } from 'react-router-dom';

function Home() {

    const [topQuiz, setTopQuiz] = useState([]);
    const [mxLoad, setMxLoad] = useState(false);

    useEffect(() => {
        const quizData = query(collection(db, 'quizzes'), where("quizStatus", "==", "av"), limit(3));
        onSnapshot(quizData, (querySnapshot) => {
            setTopQuiz(querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            })))
        })
    }, []);

    // Filter if the quiz is complete and available
    var filterQuiz = topQuiz.filter((q) => q.quizStatus === "av");

    return (
        <div>
            <div class="alert alert-info" role="alert" style={{ fontSize: "17px" }}>

                <p style={{ color: "black", fontWeight: "bold" }}>Get Your Participation Certificate Now by Scoring more than 50% on any quiz....</p>
                <hr />
                <Link className="mb-0" to="/about" style={{ color: "black" }}>Learn More About Certification</Link>

            </div>
            {topQuiz.length >= 0 ? <div style={{ padding: "8px" }}>
                <img className='img-thumbnail quizIntro' src={quizIntro} alt="quizIntro" onLoad={() => { setMxLoad(true) }} style={{ display: mxLoad ? "block" : "none" }} />
                <h1 style={{ margin: "25px", textAlign: "center", fontWeight: "900", textDecoration: "underline" }}>New Hot Quizzes</h1>
                <div className='container my-5'>
                    <div className='row'>
                        {filterQuiz.map(quiz => {
                            return (
                                <div className='col-md-4'>
                                    <div className='col-md-4' key={quiz.id}>
                                        <QuizCard quiz={quiz} />
                                    </div>
                                </div>
                            )

                        })}
                    </div>
                </div>
            </div> : <Loading />}

        </div>
    )
}

export default Home