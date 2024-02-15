import React, { useEffect, useState } from 'react';
import './AdminDashboard.css'; // Assume we have some basic CSS for layout
import Kategorije from './Kategorije';
import Programi from './Programi';
import Blog from './Blog';
import Mentori from './Mentori';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store';
import axios from 'axios';
import ApiConfig from '../assets/ApiConfig';

const AdminDashboard = () => {
  const [user, setUser] = useState();
  const [activeSection, setActiveSection] = useState('kategorije'); // Default to 'kategorije'
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendRequest = async () => {
    const res = await axios.get(`${ApiConfig.baseUrl}/api/user`, {
        withCredentials: true
    }).catch((err) => console.log(err));
    const data = await res.data;
    return data;
}
const sendLogoutRequest = async () => {
  axios.defaults.withCredentials = true;
  const res = await axios.post(`${ApiConfig.baseUrl}/api/logout`, null, {
    withCredentials: true,
  });
  if (res.status === 200) {
    return res;
  }
  throw new Error('Unable to logout. Try again');
};

const handleLogout = async () => {
  try {
    await sendLogoutRequest();

    dispatch(authActions.logout());
    // Clear other user-related data or perform additional logout tasks
    localStorage.removeItem('isLoggedIn');
  } catch (error) {
    console.error('Logout failed:', error.message);
    // Handle the error as needed (show a message to the user, etc.)
  }
};
  useEffect(() => {
    // Check if the cookie exists
    const cookieExists = document.cookie.includes('yourCookieNameHere');

    if (cookieExists) {
      // Log the user in
      dispatch(authActions.login());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user)
    });

}, []);

  return (
    <div className="admin-dashboard">
      {user && (
        <>
        <div className="admin-sidebar">
        <button onClick={() => setActiveSection('kategorije')}>Kategorije</button>
        <button onClick={() => setActiveSection('programi')}>Programi</button>
        <button onClick={() => setActiveSection('mentori')}>Mentori</button>
        <button onClick={() => setActiveSection('blog')}>Blog</button>
        <button onClick={handleLogout}>Odjavi se</button>
      </div>
      <div className="admin-content">
        {/* Content will be conditionally rendered based on activeSection */}
        {activeSection === 'kategorije' && <Kategorije />}
        {activeSection === 'programi' && <Programi />}
        {activeSection === 'mentori' && <Mentori />}
        {activeSection === 'blog' && <Blog />}
      </div>
      </>
      )}
    </div>
  );
};

export default AdminDashboard;
