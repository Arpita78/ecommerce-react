import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUp, login, logout, user } = useContext(AuthContext);

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
          {user && <p>Welcome, {user.email}!</p>}
          <button onClick={logout} className="btn btn-secondary btn-large">Logout</button>
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