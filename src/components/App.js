import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'myFirebase';

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
                setIsLoggedIn((prev) => true);
            } else {
                setIsLoggedIn((prev) => false);
            }
            setInit(true);
        });
    }, []);
    const refreshUser = () => {
        const user = authService.currentUser;
        if (user) {
            setUserObj((prev) => ({
                displayName: user.displayName,
                uid: user.uid,
                updateProfile: (args) => user.updateProfile(args),
            }));
        }
    };
    return (
        <>
            {init ? (
                <AppRouter
                    refreshUser={refreshUser}
                    isLoggedIn={isLoggedIn}
                    userObj={userObj}
                ></AppRouter>
            ) : (
                'Initializing'
            )}
        </>
    );
}

export default App;
