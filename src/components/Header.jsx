import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import logoPath from '../medi/logo.png';

function Header() {
    const [isConnected, setIsConnected] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleGoogleLogin = (credentialResponse) => {
        const userObject = jwtDecode(credentialResponse.credential);
        console.log(userObject);
        alert('Connected with Google!');
    };

    const handleFailure = (error) => {
        console.error(error);
        alert('Failed to connect with Google.');
    };

    const simulateClientSession = () => {
        setIsConnected(true);
        alert('Client session connected successfully!');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="bg-sky-950 text-white sticky top-0 z-50">
            <div className="flex justify-between items-center px-4 py-2 flex-wrap">
                <div className="flex flex-col items-start">
                    <div
                        className="w-[60px] h-[60px] bg-cover"
                        style={{ backgroundImage: `url(${logoPath})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                    ></div>
                    <h1 className="text-xl font-bold text-left text-[#d6b884]">lavocato</h1>
                </div>
                <div className="flex items-center ml-auto mt-2">
                    {!isConnected ? (
                        <>
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
                            <button 
                                onClick={simulateClientSession} 
                                className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                            >
                                Simulate Client Session
                            </button>
                        </>
                    ) : (
                        <div className="relative">
                            <button 
                                id="dropdownAvatarNameButton" 
                                onClick={toggleDropdown} 
                                className="flex items-center text-sm font-medium text-[#d6b884] rounded-full hover:text-white-100" 
                                type="button"
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 me-2 rounded-full" src="https://toplawyerscanada.ca/wp-content/uploads/Criminal-Defence-Lawyer-Toronto-Richard-Posner.jpg" alt="user photo" />
                                Bonnie Green
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                    <div className="px-4 py-3 text-sm text-gray-900">
                                        <div className="font-medium">Pro User</div>
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700">
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Earnings</a>
                                        </li>
                                    </ul>
                                    <div className="py-2">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;