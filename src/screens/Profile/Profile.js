import { signOut, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../../firebase';
import "./profile.css";

function Profile() {
    const [profilePic, setProfilePic] = useState(auth.currentUser.photoURL);
    const [pic, setPic] = useState("");
    const [prLoaded, setPrLoaded] = useState(false);
    
    const navigate = useNavigate();

    const changePic = async () => {
        const storageRef = await ref(storage, `profiles/${auth.currentUser.email}`);
        await uploadBytesResumable(storageRef, pic);
        await getDownloadURL(storageRef).then(async (url)=> {
            await updateProfile(auth.currentUser, {
                photoURL: url
            }).then(()=>{
                setPic("");
                setProfilePic(auth.currentUser.photoURL);
                alert("Reload Required to Save Profile....");
                window.location.reload(false);
            })
        });
    };

    const logout = () => {
        signOut(auth).then(()=>{
            navigate("/");
        });
    }; 

    return (
        <div>
            <div style={{ margin: "30px" }} className="contentDiv">
                <h1 style={{ fontWeight: "bold" }}>Your Profile</h1>
                <img src={profilePic === null ? "https://firebasestorage.googleapis.com/v0/b/dquiz-d29ef.appspot.com/o/profiles%2FdefaultProfile.png?alt=media&token=2ebc3f2c-df68-4759-be0d-0089f10b67dd" : profilePic} className="img-thumbnail" width={300} onLoad={()=>{setPrLoaded(true)}} style={{ display: prLoaded ? "block" : "none" }} />
                <h2 className='fontS'>{auth?.currentUser?.displayName === null ? "User" : auth?.currentUser?.displayName} | {auth.currentUser.email}</h2>
                <button className='btn btn-danger' onClick={logout} style={{ marginBottom: "20px" }}>Logout</button>
                <div className="mb-3" style={{ marginTop: "30px" }}>
                    <h3 style={{ margin: "10px" }}>Change Profile Pic</h3>
                    <input type="file" className="form-control" aria-label="Choose file" onChange={(e) => { setPic(e.target.files[0]) }} accept="image/*" />
                    <div style={{ display: "inline-grid" }}>
                        {pic ? <button className='btn btn-danger' onClick={() => {setPic("")}}>Clear File</button> : <></>}
                        {pic ? <button className='btn btn-primary' onClick={changePic}>Chnge Profile Pic</button> : <></>}
                    </div>
                    <br />

                    {pic ? <img src={pic ? URL.createObjectURL(pic) : ""} alt="quizImage" className='img-thumbnail' width="300" /> : <></>}
                    <br />


                </div>
                <br />
            </div>
        </div>
    )
}

export default Profile