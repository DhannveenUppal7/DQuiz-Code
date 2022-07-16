import React, { useState } from 'react';
import { collection, addDoc, setDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase';
import "./basecreate.css";
import isEmpty from '../../../helpers/isEmpty';

function BaseCreate({ setQuizCLvStatus, setQuizSetupId }) {
    const [quizHeadImage, setQuizHeadImage] = useState('');
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDesc, setQuizDesc] = useState("");

    const [selectSubject, setSelectSubject] = useState("Science");

    const subjectOptions = [
        {
            label: "Subject1",
            value: "Science"
        },
        {
            label: "Subject2",
            value: "Mathematics"
        },
        {
            label: "Subject3",
            value: "Technology"
        },


    ]

    const setCorrectOption = async (e) => {
        var correctOptionVal;
        correctOptionVal = subjectOptions.filter(function (rx) {
            return rx.label === e.target.value
        })
        var subjectVal = correctOptionVal[0].value;
        await setSelectSubject(subjectVal);
    };


    const createQuizBase = async (e) => {
        e.preventDefault();
        const docRef = await addDoc(collection(db, "quizzes"), {
            quizStatus: "na",
            quizName: quizTitle,
            quizDesc: quizDesc,
            quizCreatedEmail: auth.currentUser.email,
            quizCreatedUN: auth.currentUser.displayName,
            quizCreatedImage: auth.currentUser.photoURL,
            quizCreatedTime: serverTimestamp(),
            quizSubject: selectSubject
        });
        if (quizHeadImage === "") {

            await updateDoc(await doc(db, "quizzes", docRef.id), {
                quizImage: "https://firebasestorage.googleapis.com/v0/b/dquiz-d29ef.appspot.com/o/quizHeadImages%2FdefaultQuiz.png?alt=media&token=5bc69b28-9b05-4698-9302-45108d6e8634",
            });
            setQuizSetupId(docRef.id);
            setQuizCLvStatus("ready");
        }
        else {
            const storageRef = await ref(storage, `quizHeadImages/${docRef.id}`);
            setQuizSetupId(docRef.id);
            await uploadBytesResumable(storageRef, quizHeadImage);
            await getDownloadURL(storageRef).then(async (url) => {
                await updateDoc(docRef, {
                    quizImage: url,
                });
            })
            setQuizCLvStatus("ready");
        }




    };
    return (
        <div className='quizBase'>
            <h1>Make Your Own Quiz</h1>
            <form className='quizTitleContainer'>
                <input className="form-control me-2" type="text" placeholder="Quiz Title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />
                <br />
                <textarea className="form-control me-2" cols="15" rows="10" maxLength={800} style={{ marginTop: "8px" }} placeholder="Quiz Description" value={quizDesc} onChange={(e) => setQuizDesc(e.target.value)} />
                <br />
                <div className="mb-3">
                    <h2 style={{ margin: "10px" }}>Choose Quiz Image</h2>
                    <input type="file" className="form-control" aria-label="Choose file" required onChange={(e) => { setQuizHeadImage(e.target.files[0]) }} accept="image/*" />
                    {quizHeadImage ? <button className='btn btn-danger' onClick={() => setQuizHeadImage("")}>Clear File</button> : <></>}
                </div>
                <br />
                {quizHeadImage ? <img src={quizHeadImage ? URL.createObjectURL(quizHeadImage) : ""} alt="quizImage" className='img-thumbnail' width="300" /> : <></>}
                <br />
                {isEmpty(quizTitle) || isEmpty(quizDesc) ? <></> :
                    <div style={{ alignItems: "center" }}>
                        <h3 for="correctAns" style={{ margin: "20px" }}>Choose Quiz Subject:</h3>

                        <select className="form-select choiceSel" aria-label="Choose Quiz Subject" onChange={setCorrectOption}>
                            {subjectOptions.map((option, index) => (
                                <option value={option.label} className='optionSel' >Subject {index + 1} - {option.value}</option>
                            ))}
                        </select>
                    </div>
                }
                <br />
                {
                    isEmpty(quizTitle) || isEmpty(quizDesc) ? <button className="btn btn-secondary" type="submit" onClick={(e) => { e.preventDefault() }}>Start Creating</button> :
                        <button className="btn btn-primary" type="submit" onClick={createQuizBase}>Start Creating</button>

                }
            </form>
        </div>
    )
}

export default BaseCreate