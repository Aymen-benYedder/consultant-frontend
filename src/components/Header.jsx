import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { AppContext } from '../AppContext';
import LogoBrand from './header/LogoBrand';
import UserProfile from './header/UserProfile';

const Header = () => {
  const { user, login, logout } = useContext(AppContext);
  const [showFallbackButton, setShowFallbackButton] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!user && window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || 
            notification.isSkippedMoment() || 
            notification.isDismissedMoment()) {
          setShowFallbackButton(true);
        }
      });
    }
  }, [user]);

  const handleGoogleLogin = (credentialResponse) => {
    try {
      const userData = jwtDecode(credentialResponse.credential);
      login(userData);
      setShowFallbackButton(false);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-sky-950 text-white sticky top-0 z-50">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
        <LogoBrand />
        <div className="flex items-center gap-4">
          {user ? (
            <UserProfile
              user={user}
              isOpen={dropdownOpen}
              onToggle={toggleDropdown}
              onLogout={handleLogout}
            />
          ) : showFallbackButton ? (
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.error('Login Failed')}
              useOneTap={false}
              theme="outline"
              size="medium"
              text="signin_with"
              shape="rectangular"
              type="standard"
            />
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;