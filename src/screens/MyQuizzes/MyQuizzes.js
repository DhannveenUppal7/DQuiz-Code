import React, { Suspense, useEffect, useState } from 'react';
import "./myquizzes.css";
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import isEmpty from '../../helpers/isEmpty';
import { Link } from 'react-router-dom';
import LoadingCard from '../../components/ExploreQuiz/LoadingCard/LoadingCard';
const QuizCard = React.lazy(() => import("../../components/ExploreQuiz/QuizCard/QuizCard"));


function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searches, setSearches] = useState([]);
  const [allChecked, setAllChecked] = useState(true);

  const subjects = ["Science", "Mathematics", "Technology"];

  const [checks, setChecks] = useState([true, true, true]);
  const [myChecks, setMyChecks] = useState([]);

  useEffect(() => {
    const quizData = query(collection(db, 'quizzes'), where("quizStatus", "==", "av"), where("quizCreatedEmail", "==", auth?.currentUser?.email))
    onSnapshot(quizData, (querySnapshot) => {
      setQuizzes(querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })))
    })
  }, []);

  function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  useEffect(() => {
    var uChecks = myChecks;
    if (checks[0] === true) {
      uChecks.push("Science");
      setMyChecks(uChecks);
    }
    if (checks[1] === true) {
      uChecks.push("Mathematics");
      setMyChecks(uChecks);
    }
    if (checks[2] === true) {
      uChecks.push("Technology");
      setMyChecks(uChecks);
    }
    if ((checks[0] === true) && (checks[1] === true) && (checks[2] === true)) {
      setAllChecked(true);
    }
    if (checks[0] === false) {
      uChecks = arrayRemove(uChecks, "Science");
      setMyChecks(uChecks);
    }
    if (checks[1] === false) {
      uChecks = arrayRemove(uChecks, "Mathematics");
      setMyChecks(uChecks);
    }
    if (checks[2] === false) {
      uChecks = arrayRemove(uChecks, "Technology");
      setMyChecks(uChecks);
    }
    if ((checks[0] === false) || (checks[1] === false) || (checks[2] === false)) {
      setAllChecked(false);
    }



  }, [checks]);


  const search = () => {
    var aSearch = searchTerm.toLowerCase();
    const searchResults = quizzes.filter(function (e) {
      return e.quizName.toLowerCase().includes(aSearch) || e.quizCreatedUN.toLowerCase().includes(aSearch) || e.quizCreatedEmail.toLowerCase().includes(aSearch)
    });

    setSearches(searchResults);
  };

  useEffect(() => {
    if (isEmpty(searchTerm) === true) {
      setSearches([]);
    }
    else {
      search();
    }
  }, [searchTerm]);


  const changeSubject = (i) => {
    const updateChecks = checks.map((subject, index) =>
      index === i ? !subject : subject
    );



    setChecks(updateChecks);
  };


  var filterQuiz = quizzes.filter((q) => q.quizStatus === "av");
  const checkfiltered = quizzes.filter(q => (myChecks.includes(q.quizSubject) || allChecked));
  return (
    <div>
      {filterQuiz.length > 0 ? <div>
        <div className='header'>
          <h1>Quizzes Created By You</h1>
          <form className='searchContainer'>
            <input className="form-control me-2" type="search" placeholder="Search For Quiz" aria-label="Search" value={searchTerm} onChange={(e) => {
              setSearchTerm(e.target.value);
            }} />
          </form>
          <div className='filterFull'>
            <h3>Filters</h3>
            <div className='filterContainer'>
              {subjects.map((subject, index) => {
                return (
                  <div className="form-check" style={{ fontWeight: checks[index] ? "bolder" : "normal", fontSize: "18px" }}>
                    <input className="form-check-input" type="checkbox" name={subject} value={subject} id={`check` + index} checked={checks[index]} onChange={() => { changeSubject(index) }} />
                    <label className="form-check-label" for={`check` + index}>
                      {subject}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>

          <div className='container my-5'>
            <div className='row'>
              {checkfiltered.length > 0 ? searches.length === 0 ? checkfiltered.map((quiz) => {
                if (quiz.quizStatus === "av") {
                  return (
                    <>
                      <Suspense fallback={<>
                        <div className='col-md-4' key={quiz.id}>
                          <LoadingCard quiz={quiz} />
                        </div>
                      </>}>
                        <div className='col-md-4' key={quiz.id}>
                          <QuizCard quiz={quiz} />
                        </div>
                      </Suspense>


                    </>


                  );

                }
              }) : searches.map((quiz) => {
                if (quiz.quizStatus !== "av") {
                  if (myChecks.includes(quiz.quizSubject) || allChecked) {
                    return (
                      <>
                        <div className='col-md-4' key={quiz.id}>
                          <QuizCard quiz={quiz} />
                        </div>


                      </>


                    );
                  }
                }
              }) : <div className='no'>
                <h1>No Quizzes Made By you for the filters</h1>
                <Link to="/make_quiz" className="btn btn-primary">Create Quiz</Link>
              </div>}
            </div>
          </div>
        </div>
      </div> : <div className='no'>
        <h1>No Quizzes! Why Don't you create one Now.....</h1>
        <Link to="/make_quiz" className="btn btn-primary">Create Quiz</Link>
      </div>}
    </div>
  )
}

export default MyQuizzes