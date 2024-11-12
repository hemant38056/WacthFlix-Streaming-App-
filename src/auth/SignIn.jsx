import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function SignIn(props) {
    const [formData, setFormData] = useState({email : null, password : null});
    const [user, setUser] = useState(null);

    const handleChange = (e) => {
        let {value, name} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    const loginUser = () => {
        signInWithEmailAndPassword(auth, formData.email, formData.password)
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
        <div className='container mt-5 py-4'>
            <div className="mb-3">
                <input type="email" name='email' placeholder='Email' onChange={handleChange} />
            </div>
            <div className="mb-3">
                <input type="password" name='password' placeholder='Password' onChange={handleChange} />
            </div>
            <button onClick={loginUser} className='btn btn-primary'>Sign In</button>
        </div>
    );
}

export default SignIn;