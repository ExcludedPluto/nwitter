import React, { useCallback, useState, useEffect } from 'react';
import { dbService } from 'myFirebase';
import Nweet from 'components/Nweet';

function MyNweet({ userId }) {
    const [nweets, setNweets] = useState([]);
    const getMyNweet = useCallback(async () => {
        dbService
            .collection('nweets')
            .where('creatorId', '==', userId)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const nweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNweets((prev) => nweetArray);
            });
    }, [userId]);

    useEffect(() => {
        getMyNweet();
    }, [getMyNweet]);

    return (
        <div>
            {nweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={true} />
            ))}
        </div>
    );
}
export default MyNweet;
