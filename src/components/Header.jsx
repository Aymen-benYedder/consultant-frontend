import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import logoPath from '../medi/logo.png'


function Header() {
    const handleGoogleLogin = (credentialResponse) => {
        const userObject = jwtDecode(credentialResponse.credential);
        console.log(userObject);
        alert('Connected with Google!');
    };

    const handleFailure = (error) => { 
        console.error(error);
        alert('Failed to connect with Google.');
    };

    return (
<header className="bg-sky-950 text-white  relative">
    <div className="mx-8  flex justify-between items-center">
        <div 
            className="w-[60px] h-[60px] bg-cover bg-left" 
            style={{ backgroundImage: `url(${logoPath})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        ></div>
        <h1 className="text-xl font-bold text-left flex-1 ml-4">lavocato</h1> {/* Ensure text stays on one line */}
        <div className="flex items-center ml-4">
            <GoogleLogin
                size='medium'
                width='120px'
                onSuccess={handleGoogleLogin}
                onFailure={handleFailure}
                logo="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                className="flex items-center bg-white text-gray-800 text-xs px-2 py-1 rounded shadow hover:bg-gray-200 transition duration-200"
            >
                Google
            </GoogleLogin>
        </div>
    </div>

</header>


    );
}

export default Header; 