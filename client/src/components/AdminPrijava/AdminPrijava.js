import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiConfig from '../../assets/ApiConfig';
import Header from "../Header/Header.js";
import axios from 'axios'; // Make sure to install axios if you haven't
import { authActions } from '../../store/index.js';
import { useDispatch } from 'react-redux';

const AdminSignIn = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [errorM, seterrorM] = useState('');

  function handleErrorM() {
    seterrorM('Netočni podaci!');
  }

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    seterrorM('');
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${ApiConfig.baseUrl}/api/login`, {
        email: inputs.email,
        password: inputs.password,
      });

      if (res.data) {
        return res.data;
      } else {
        handleErrorM();
        return null;
      }
    } catch (err) {
      console.error(err);
      handleErrorM();
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendRequest();

    if (data) {
      dispatch(authActions.login());
      history('/admin');
    }
  };

  return (
    <>
    <Header />
    <div className='login-main'>
      <div className='login-main-component'>
      {errorM && <p style={{ color: 'red' }}>{errorM}</p>}
      <form onSubmit={handleSubmit}>
        <div>
        <input
              className={`input-login-signup errorM ${emailFocused ? 'focused' : ''}`}
              value={inputs.email}
              onChange={handleChange}
              type="email"
              name="email"
              id="kor-email"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              placeholder="e-mail adresa"
              autoComplete='email'
            />
        </div>
        <div>
        <input
              className={`input-login-signup errorM ${passwordFocused ? 'focused' : ''}`}
              value={inputs.password}
              onChange={handleChange}
              type='password'
              name="password"
              id="kor-lozinka"
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              placeholder="lozinka"
              autoComplete='current-password'
            />
        </div>
        <button type="submit" className='login-prijava-btn'>Prijavi se</button>
      </form>
      </div>
    </div>
    </>
  );
};

export default AdminSignIn;
