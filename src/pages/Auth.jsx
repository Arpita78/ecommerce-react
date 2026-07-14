import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  /* A hook is a function that lets you “hook into” React state and lifecycle features from function components.
   Hooks don’t work inside classes — they let you use React without classes. Every hook start with name "use" */
  const [mode, setMode] = useState('login');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  
  const { signUp, login } = useAuth(); //useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data) {
    let result;
    if(mode === 'login') {
      result = login(data.email, data.password);      
    } else {
      result = signUp(data.email, data.password);      
    }
    if(result.success){
      navigate('/'); // Redirect to home page after successful login or signup
    } else {
      setError(result.error);
    }
    //alert(result.success ? `${mode === 'login' ? 'Login' : 'Sign Up'} successful!` : result.error);
    //setError(result.success ? null : result.error);
  }
  return (
    <div className="page">
      <div className="Container">
        <div className="auth-container">
        <h1 className="page-title">{mode === 'signup' ? 'Sign Up' : 'Login'}</h1>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" name="email" required className="form-input" 
            {...register('email', { required: "Email is required" })} />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" name="password" required className="form-input"
            {...register('password', { required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              maxLength: { value: 20, message: "Password must be at most 20 characters" }              
             })} />
             {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          <button type="submit" className="btn btn-primary btn-large">{mode === 'signup' ? 'Sign Up' : 'Login'}</button>
        </form>
        </div>
      </div>
      <div className="auth-switch">
        <p>{mode === 'signup' ? 'Already have an account?' : "Don't have an account?"} 
            <span onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')} 
              className="auth-link">{mode === 'signup' ? ' Login' : ' Sign Up'}</span></p>
      </div>
    </div>
  )
}