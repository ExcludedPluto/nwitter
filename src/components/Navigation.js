import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ displayName }) => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="profile">{displayName}'s Profile</Link>
            </li>
            <li>
                <Link to="MyNweet">My Nweets</Link>
            </li>
        </ul>
    </nav>
);
export default Navigation;
