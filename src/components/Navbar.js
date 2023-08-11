import React, {useState}from 'react'
import { Avatar } from '@mui/material';
import { GoogleLogout } from '@leecheuk/react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, setSignedIn, setUserData, setInput, selectUserData } from '../features/userSlice';
import "../styling/navbar.css";


const Navbar = () => {
const isSignedIn = useSelector(selectSignedIn);
const [inputValue, setInputValue] = useState("sport");
const userData = useSelector(selectUserData);
const dispatch = useDispatch();


const logout =(response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
};

const handleClick =(e)=>{
    e.preventDefault();
    dispatch(setInput(inputValue));
}
return (
    <div className="navbar">
        <div className="navbar__header">
            <h1>Blog Website</h1>
            {isSignedIn && (
                <div className='blog_search'>
                    <input 
                        type="text"
                        placeholder="Search"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={handleClick}>Search</button>
                    </div>
            )}
            {isSignedIn ? (
                <div className='navbar_user_data'>
                    <Avatar 
                    className='user'
                    src={userData?.imageUrl}
                    alt={userData?.name}
                    />
                    <h1 className='signedIn'>
                        {userData?.givenName}
                    </h1>
                    <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
                        render={(renderProps)=>(
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login_button">Logout 😞 </button>

                        )}
                        onLogoutSuccess={logout}
                        />
                </div>
            ):(
                <h1 className='notSignedIn'>
                    Not Signed In😒
                </h1>
            )}
                </div>
    </div>
);
            }



export default Navbar;