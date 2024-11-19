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
        <header className="bg-sky-950 text-white relative">
              <div className="flex items-center ml-auto">
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
            <div className="flex justify-between items-center px-4 ">
                
                <div className="flex items-center space-x-4">
                    <div
                        className="w-[120px] h-[120px] bg-cover bg-left"
                        style={{ backgroundImage: `url(${logoPath})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                    ></div>
                    <h1 className="text-xl font-bold text-left text-[#d6b884] my-8">lavocato</h1>
                </div>
              
            </div>
        </header>
    );
}

export default Header; 