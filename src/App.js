import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from './firebase';
import { useEffect, useState } from 'react';
import SignUp from './screens/SignUpAndSignIn/SignUp';
import SignIn from './screens/SignUpAndSignIn/SignIn';
import MakeQuiz from './screens/MakeQuiz/MakeQuiz';
import Navbar from './components/Navbar/Navbar';
import QuizStart from './screens/Quiz/QuizStart/QuizStart';
import PlayQuiz from './screens/Quiz/PlayQuiz/PlayQuiz';
import Home from "./screens/Home/Home";
import About from './screens/About/About';
import ExploreQuiz from './screens/ExploreQuiz/ExploreQuiz';
import Profile from './screens/Profile/Profile';
import Asses from './screens/AssesYourself/Asses';
import MyQuizzes from './screens/MyQuizzes/MyQuizzes';
import Footer from './components/Footer/Footer';


function App() {

  // Check Whether the User is Logged In
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
      else {
        setUser(null);
      }
    });
  }, []);



  // Prevent the user from leaving the screen on reload.
  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    })
  }, [])


  // Return the Routes
  // Will Return the Sign In or Sign Up if not Logged in or else Home
  return (

    <div>
      <BrowserRouter>
        <div>
          {user == null ? <div><Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='*' element={<SignUp />} />

          </Routes></div> : <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore_quiz" element={<ExploreQuiz />} />
              <Route path="/make_quiz" element={<MakeQuiz />} />
              <Route path="/about" element={<About />} />
              <Route path={`/quizstart/:slug`} element={<QuizStart />} />
              <Route path='/playquiz' element={<PlayQuiz />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/asses_yourself' element={<Asses />} />
              <Route path='/my_quizzes' element={<MyQuizzes />} />
              <Route path='*' element={<Home />} />

            </Routes>

          </div>}
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
