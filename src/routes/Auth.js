import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'myFirebase';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTwitter,
    faGoogle,
    faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        authService.setPersistence(authService.Auth.Persistence.SESSION);
        console.log(data);
    };
    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={'#04AAFF'}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button
                    onClick={onSocialClick}
                    name="google"
                    className="authBtn"
                >
                    구글로 로그인 <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button
                    onClick={onSocialClick}
                    name="github"
                    className="authBtn"
                >
                    깃허브로 로그인 <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
};
export default Auth;
