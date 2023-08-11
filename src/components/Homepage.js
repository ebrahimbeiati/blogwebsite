import React from "react";
import GoogleLogin from "@leecheuk/react-google-login";

import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  setSignedIn,
  setUserData,
} from "../features/userSlice";

import "../styling/home.css";

const Homepage = () => {
  const isSignedIn = useSelector(selectSignedIn);
  const dispatch = useDispatch();
  const signedIn = useSelector(selectSignedIn);
  const login =(response) => {
    dispatch(setSignedIn(true));
    dispatch(setUserData(response));
  }

  return <div className="home_page" style={{display:isSignedIn ? "none" : "" }}>
  {!isSignedIn ? (
    <div className="login_message">
        <h2>📗</h2>
        <h1>A Readers favourite place!</h1>
        <p>
            We provide high quality online resource for reading blogs. Just sign
            up and start reading some quality blogs.
        </p>
        <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
        render={(renderProps)=>(
          <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login_button">Login with Google </button>

        )}
        onSuccess={login}
        onFailure={login}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
        />
    </div>

  ):(
    ""
  )}
  </div>;
};

export default Homepage;
