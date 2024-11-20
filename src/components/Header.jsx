import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import LogoBrand from './header/LogoBrand';
import AuthButtons from './header/AuthButtons';
import UserProfile from './header/UserProfile';

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
            <div className="w-full max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
                <LogoBrand />
                <div className="relative">
                    {!isConnected ? (
                        <AuthButtons
                            onGoogleLogin={handleGoogleLogin}
                            onGoogleFailure={handleFailure}
                            onSimulateSession={simulateClientSession}
                        />
                    ) : (
                        <UserProfile
                            isOpen={dropdownOpen}
                            onToggle={toggleDropdown}
                        />
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;