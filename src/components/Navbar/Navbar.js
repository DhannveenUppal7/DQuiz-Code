import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";
import dquiz from '../../assets/dquiz-logo.png';
import { auth } from '../../firebase';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar() {

    const [profileHover, setProfileHover] = useState(false);
    const [photoURL, setPhotoURL] = useState(auth?.currentUser?.photoURL);

    useEffect(() => {
        setPhotoURL(auth?.currentUser?.photoURL);
    }, [auth?.currentUser]);


    const toggleProfileHover = () => {
        setProfileHover(!profileHover);
    }



    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#BFFFD5", justifyContent: "space-around !important", alignItems: "center !important" }}>
            <div className="container-fluid" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <Link to="/" className="navbar-brand header-title">
                    <img src={dquiz} className="logo" />
                    <b>DQuiz</b>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ justifyContent: "center", alignItems: "center" }}>
                        <li className="nav-item">
                            <Link className="nav-link active navHover" aria-current="page" to="/">Home</Link>
                        </li>



                        <li className="nav-item">
                            <Link className="nav-link navHover" to="/explore_quiz">Explore Quizzes</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link navHover" to="/asses_yourself">Asses Yourself</Link>
                        </li>

                        {/* <li className="nav-item">
                            <Link className="nav-link navHover" to="/ebooks">Ebooks</Link>
                        </li> */}

                        <li className="nav-item">
                            <Link className="nav-link navHover" to="/my_quizzes">My Quizzes</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link navHover" to="/about">About Us And Features</Link>
                        </li>


                    </ul>

                    <li className="nav-item dropdown photoBased" style={{ listStyleType: "none" }} onMouseEnter={toggleProfileHover} onMouseLeave={toggleProfileHover}>

                        <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {/* <FontAwesomeIcon icon={faUser} fontSize={25} style={{ backgroundColor: "white", borderRadius: "50%", padding: "9px 12px 9px 12px", }} />
                            a */}
                            <img className='img-thumbnail' src={photoURL === null ? "https://firebasestorage.googleapis.com/v0/b/dquiz-d29ef.appspot.com/o/profiles%2FdefaultProfile.png?alt=media&token=2ebc3f2c-df68-4759-be0d-0089f10b67dd" : photoURL} style={{ borderRadius: "50%", maxHeight: "65px" }} />
                        </div>

                        <ul className={profileHover ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="navbarDropdown" style={{ textAlign: "center" }}>
                            <li className='dropdown-item'>Hello {auth?.currentUser?.displayName === null ? "Hello User...." : auth?.currentUser?.displayName}</li>
                            <li><Link className="dropdown-item" to="/my_quizzes">My Quizzes</Link></li>
                            <li><Link className="dropdown-item" to="/make_quiz"><FontAwesomeIcon icon={faPlus} />   Make New Quiz</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>

                        </ul>
                    </li>




                </div>
            </div>
        </nav>
    )
}

export default Navbar