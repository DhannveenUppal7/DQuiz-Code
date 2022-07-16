import React, { useEffect, useState } from 'react';
import "./sign.css";
import { signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import googleIcon from '../../assets/google-icon.png';
import { Link } from 'react-router-dom';
import isEmpty from '../../helpers/isEmpty';

function SignIn() {

  //Declaring State Variables
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Setting Up the Type Writer
  const typeWriterPhrase = "Sign In";
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => prev + (1));
    }, 300);
    return () => clearTimeout(timeout);
  }, [index]);

  auth.useDeviceLanguage();

  // Sign In Functions
  
  const signIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email.toLowerCase(), password).catch(error => {
      alert("Email ID or Password is Wrong.");
    });

  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((re) => {
      console.log(re);
    }).catch((err) => {
      alert("Error While Signing in With Google");
    });

  };


  return (
    <div>
      <div className='formDiv'>
        <h1 className='heading' style={{ textDecoration: "underline" }}>
          {`${typeWriterPhrase.substring(0, index)}`}

        </h1>
        <form onSubmit={!email || !password ? (event) => event.preventDefault() : signIn}>
          <div className="mb-3 input-field">
            <label for="email" className="form-label">Email address</label>
            <input type="email" className="form-control-plaintext inputForm" placeholder='Enter your email' value={email} onChange={event => setEmail(event.target.value)} />
          </div>
          <div className="mb-3 input-field">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control-plaintext inputForm" placeholder='Enter your password' value={password} onChange={event => setPassword(event.target.value)} />
          </div>
          <div className='btn-container'>
            {
              isEmpty(email) || isEmpty(password) || ((password.length > 6) === false) ? <button type="submit" className="btn btn-secondary sign">Sign In</button> :
                <button type="submit" className="btn btn-danger sign">Sign In</button>
            }
            <button className="btn btn-light sign" onClick={signInWithGoogle} >Sign In with Google <img src={googleIcon} alt="google" /></button>
            <Link to="/signup" style={{ textDecoration: "none", color: "white", width: "auto", height: "auto" }}>
              <button className="btn btn-primary sign2">
                Don't Have an Account, Sign Up Now              
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn