import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase';
import SignIn from './SignIn';

function SignUp(props) {
    const [formData, setFormData] = useState({email : null, password : null});
    const [user, setUser] = useState(null);

    const handleChange = (e) => {
        let {value, name} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    const createUser = () => {
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    setUser(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({errorCode, errorMessage});
    // ..
  });
    }
    return (
        <>
        <div className='container mt-5 py-4'>
            <div className="mb-3">
                <input type="email" name='email' placeholder='Email' onChange={handleChange} />
            </div>
            <div className="mb-3">
                <input type="password" name='password' placeholder='Password' onChange={handleChange} />
            </div>
            <button onClick={createUser} className='btn btn-primary'>Sign Up</button>
        </div>
        <SignIn/>
        </>
    );
}

export default SignUp;