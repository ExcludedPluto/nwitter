import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'myFirebase';

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? (
                <AppRouter
                    isLoggedIn={Boolean(userObj)}
                    userObj={userObj}
                ></AppRouter>
            ) : (
                'Initializing'
            )}
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
