import React from 'react';
import "./about.css";
import exploreQuiz from '../../assets/exploreQuiz.png';
import assesYourself from '../../assets/assesYourself.png';
import representation from '../../assets/representation.png';
import certification from '../../assets/certification.png';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      <div className='about' style={{ margin: "30px", color: "black" }} id="about">
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>About Us</h1>
        <p style={{ fontSize: "20px", marginTop: "20px" }}>
          DQuiz is a STEM based Quiz Website, it is aimed to help people prepare for their exams, the purpose of the website is to create a community of students, one can also publish quizzes on the website to help others. Our Platform supports students and offers three subjects: Mathematics, Science and Technology. With an immersive experience students will love studying with our platform. <br />
          The Website is created and maintained by Dhannveen Uppal.
        </p>
      </div>
      <div className="features">
        <h1 style={{ textAlign: "center", margin: "10px", fontWeight: "bold", color: "black" }}>Features</h1>
        <div className='feature' style={{ marginLeft: "30px" }} id="explore">
          <img src={exploreQuiz} className="float-start" alt="explorequiz" />
          <h2>Explore Quizzes</h2>
          <p>With DQuiz You get a variety of online quizzes for different subjects, that you play and enjoy. Even You can Publish Quizzes for the DQuiz Platform, and contribute to the community. These online quizzes main purpose is for exam prepration and revision.</p>
          <Link to="/explore_quiz" className="link-left">Explore Quizzes →</Link>
        </div>
        <hr style={{ margin: "60px" }} />
        <div className='featureRight' style={{ marginTop: "30px" }} id="asses">
          <img src={assesYourself} className="float-end" alt="assesyourself" />
          <h2>Asses Yourself</h2>
          <p>DQuiz allows you to test yourself in three different subjects Maths, Science and Technology and asses your skills.</p>
          <Link to="/asses_yourself" className="link-right">Asses Yourself →</Link>
        </div>
        <hr style={{ margin: "60px" }} id="representation" />
        <div className='feature' style={{ marginTop: "30px", marginBottom: "18px", marginLeft: "30px" }}>
          <img src={representation} className="float-start" alt="explorequiz" />
          <h2>Pictorial And Audio Interpretation</h2>
          <p>As we all know one can understand better with visuals, hence DQuiz provides you pictures for certains questions so that you can be a master of the chapter. The DQuiz Website can also speak the questions for you incase you have any difficulty understanding.</p>
          <Link to="/asses_yourself" className="link-left">Asses Yourself →</Link>
        </div>
        <hr style={{ margin: "60px" }} />
        <div className='featureRight' style={{ marginTop: "30px", marginBottom: "28px", }} id="certification">
          <img src={certification} className="float-end" alt="certification" />
          <h2>Certification</h2>
          <p>DQuiz offers you free certification if you get more than 50% on any quiz. The certificate is issued with your name and gives details about the quiz you had participated in, your certificate will be signed and issued by Dhannveen Uppal.</p>
          <Link to="/explore_quiz" className="link-right">Explore Quizzes →</Link>
        </div>
      </div>
    </div>
  )
}

export default About