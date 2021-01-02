import React, { useEffect, useState } from 'react';
import { dbService } from 'myFirebase';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        dbService
            .collection('nweets')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const nweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNweets((prev) => nweetArray);
            });
        return;
    }, []);

    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                        displayName={userObj.displayName}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
