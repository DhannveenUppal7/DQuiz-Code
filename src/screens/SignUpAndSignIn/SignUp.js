import React, { useEffect, useState } from 'react';
import "./sign.css";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import googleIcon from '../../assets/google-icon.png';
import { Link } from 'react-router-dom';
import isEmpty from '../../helpers/isEmpty';

function SignUp() {

    //State Variables
    const [index, setIndex] = useState(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    //Setting Up the Type Writer
    const typeWriterPhrase = "Sign Up";

    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIndex((prev) => prev + (1));
        }, 300);
        return () => clearTimeout(timeout);
    }, [index]);

    auth.useDeviceLanguage();
    
    // Sign Up Function 
    const signUp = async (event) => {
        event.preventDefault();
        await createUserWithEmailAndPassword(auth, email.toLowerCase(), password).then(async (authUser) => {
            await updateProfile(auth?.currentUser, {
                displayName: username,
                photoURL: "https://firebasestorage.googleapis.com/v0/b/dquiz-d29ef.appspot.com/o/profiles%2FdefaultProfile.png?alt=media&token=2ebc3f2c-df68-4759-be0d-0089f10b67dd"
            });
        }).catch(error => {
            console.log(error);
            alert("Error While Creating Account.");
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
                <form onSubmit={!username || !email || !password ? (event) => event.preventDefault() : signUp}>
                    <div className="mb-3 input-field">
                        <label for="email" className="form-label">Username</label>
                        <input type="text" className="form-control-plaintext inputForm" placeholder='Enter your username' value={username} onChange={event => setUsername(event.target.value)} />
                    </div>
                    <div className="mb-3 input-field">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" className="form-control-plaintext inputForm" placeholder='Enter your email' value={email} onChange={event => setEmail(event.target.value)} />
                    </div>
                    <div className="mb-3 input-field">
                        <label for="password" className="form-label">Password - Minimum 7 Characters</label>
                        <input type="password" className="form-control-plaintext inputForm" placeholder='Enter your password' value={password} onChange={event => setPassword(event.target.value)} />
                    </div>
                    <div className='btn-container'>
                        {
                            isEmpty(username) || isEmpty(email) || isEmpty(password) || ((password.length > 6) === false) ? <button type="submit" className="btn btn-secondary sign">Sign Up</button> :
                                <button type="submit" className="btn btn-danger sign">Sign Up</button>
                        }
                        <button className="btn btn-light sign" style={{ width: "auto" }} onClick={signInWithGoogle} >Sign Up with Google <img src={googleIcon} alt="google" /></button>
                        <Link to="/signin" style={{ textDecoration: "none", color: "white" }}>
                            <button className="btn btn-primary sign2" style={{ width: "auto", height: "auto" }}>
                                Already Have an Account, Sign In Now
                            </button>
                        </Link>

                        


                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp