import { dbService, storageService } from 'myFirebase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

function NweetFactory({ userObj }) {
    const [nweet, setNweet] = useState('');
    const [attachment, setAttachment] = useState('');

    const onSubmit = async (event) => {
        if (nweet === '') {
            return;
        }
        event.preventDefault();
        let attachmentUrl = '';
        if (attachment !== '') {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(
                attachment,
                'data_url'
            );
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
            displayName: userObj.displayName,
        };

        await dbService.collection('nweets').add(nweetObj);
        setNweet('');
        setAttachment('');
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        if (theFile != null) {
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const {
                    currentTarget: { result },
                } = finishedEvent;
                setAttachment((prev) => result);
            };
            reader.readAsDataURL(theFile);
        }
    };
    const onClearAttachment = () => setAttachment('');
    return (
        <div>
            {!userObj.displayName && (
                <div
                    className="factoryForm"
                    style={{
                        textAlign: 'center',
                        marginBottom: 20,
                    }}
                >
                    {' '}
                    프로필에서 이름을 설정하세요 !{' '}
                </div>
            )}
            <form onSubmit={onSubmit} className="factoryForm">
                <div className="factoryInput__container">
                    <input
                        className="factoryInput__input"
                        value={nweet}
                        onChange={onChange}
                        type="text"
                        placeholder="무엇을 생각하고 있나요?"
                        maxLength={120}
                    />
                    <input
                        type="submit"
                        value="&rarr;"
                        className="factoryInput__arrow"
                    />
                </div>
                <label for="attach-file" className="factoryInput__label">
                    <span>사진 추가</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input
                    id="attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{
                        opacity: 0,
                    }}
                />
                {attachment && (
                    <div className="factoryForm__attachment">
                        <img
                            src={attachment}
                            style={{
                                backgroundImage: attachment,
                            }}
                            alt="error"
                        />
                        <div
                            className="factoryForm__clear"
                            onClick={onClearAttachment}
                        >
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
export default NweetFactory;
