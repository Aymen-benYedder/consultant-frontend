import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import SearchBar from './SearchBar';

function Header({ onSearch }) {
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
        <header className="bg-blue-500 text-white p-4 relative">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

                <div className="flex items-center w-full md:w-auto">
                    <h1 className="text-xl font-bold mb-2 md:mb-0">Consultant App</h1>
                    <div className="absolute top-2 right-2 ">
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onFailure={handleFailure}
                            logo="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            className="flex items-center bg-white text-gray-800 text-xs px-1 py-0.5 rounded-full shadow hover:bg-gray-200 transition duration-200"
                        >
                            Connect with Google
                        </GoogleLogin>
                    </div>
                   

                </div>
                
            </div>
            <SearchBar onSearch={onSearch} />
        </header>
    );
}

export default Header; 