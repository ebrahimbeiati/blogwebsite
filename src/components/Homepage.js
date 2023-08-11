import React from 'react';
import GoogleLogin from '@leecheuk/react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import{
    selectSignedIn,
    setSignedIn,
    setUserData,

} from '../features/userSlice.js';
import '../styling/home.css'

const Homepage = () => {
  return (
    <div>Homepage</div>
  )
}

export default Homepage