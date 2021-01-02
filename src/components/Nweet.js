import { dbService, storageService } from 'myFirebase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function Nweet({ nweetObj, isOwner }) {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const getDate = (date) => {
        const months = [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
        ];

        return (
            date.getYear() -
            100 +
            '/' +
            months[date.getUTCMonth()] +
            '/' +
            (date.getUTCDate() < 10
                ? '0' + date.getUTCDate()
                : date.getUTCDate())
        );
    };
    const onDeleteClick = async () => {
        const ok = window.confirm('정말로 삭제하시겠습니까?');
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };

    return (
        <div className="nweet">
            {editing ? (
                isOwner && (
                    <>
                        <form
                            onSubmit={onSubmit}
                            className="container nweetEdit"
                        >
                            <input
                                text="text"
                                placeholder="Edit your nweet"
                                value={newNweet}
                                required
                                onChange={onChange}
                            />
                            <input
                                type="submit"
                                value="Update Nweet"
                                className="formBtn"
                            />
                        </form>
                        <span
                            onClick={toggleEditing}
                            className="formBtn cancelBtn"
                        >
                            Cancel
                        </span>
                    </>
                )
            ) : (
                <>
                    <h3>
                        <span style={{ fontWeight: 'bold' }}>
                            {nweetObj.displayName
                                ? nweetObj.displayName
                                : '익명'}
                        </span>
                        {!isOwner && (
                            <span style={{ float: 'right' }}>
                                {getDate(new Date(nweetObj.createdAt))}
                            </span>
                        )}
                    </h3>
                    <hr />
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img src={nweetObj.attachmentUrl} alt="error" />
                    )}
                    {isOwner && (
                        <div class="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                            <br></br>
                            <span style={{ float: 'right' }}>
                                {getDate(new Date(nweetObj.createdAt))}
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
export default Nweet;
