import React from 'react';
import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';
import MyNweet from 'routes/MyNweet';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation displayName={userObj.displayName} />}
            <Switch>
                {isLoggedIn ? (
                    <div
                        style={{
                            maxWidth: 890,
                            width: '100%',
                            margin: '0 auto',
                            marginTop: 80,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile
                                userObj={userObj}
                                refreshUser={refreshUser}
                            />
                        </Route>
                        <Route exact path="/MyNweet">
                            <MyNweet userId={userObj.uid} />
                        </Route>
                        <Redirect from="*" to="/" />
                    </div>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;
