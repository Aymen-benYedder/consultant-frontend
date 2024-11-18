import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


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
        <header className="bg-gray-100 text-white p-4 relative">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Consultant App</h1>
                <div className="flex items-center ml-4">
                    <GoogleLogin
                        size='small'
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
            <div className="flex justify-center mt-6">
               
            </div>
        </header>
    );
}

export default Header; 