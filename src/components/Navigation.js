import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ displayName }) => (
    <nav>
        <ul
            style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
        >
            <li>
                <Link
                    to="/"
                    style={{
                        marginRight: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontSize: 12,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faTwitter}
                        color={'#04AAFF'}
                        size="2x"
                    />
                    <span style={{ marginTop: 10 }}>홈</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/profile"
                    style={{
                        marginLeft: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontSize: 12,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faUser}
                        color={'#04AAFF'}
                        size="2x"
                    />
                    <span style={{ marginTop: 10 }}>
                        {displayName ? `${displayName}의 프로필` : '프로필'}
                    </span>
                </Link>
            </li>
            <li>
                <Link
                    to="MyNweet"
                    style={{
                        marginLeft: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontSize: 12,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faBookOpen}
                        color={'#04AAFF'}
                        size="2x"
                    />
                    <span style={{ marginTop: 10 }}>내 Nweet들</span>
                </Link>
            </li>
        </ul>
    </nav>
);
export default Navigation;
