import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import Back from '../Img/back.png';
import {Link} from "react-router-dom";

function EmojiTab() {

    const [selectEmoji, setSelectEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setSelectEmoji(event.emoji);
        console.log(event.emoji);
    };

  return (
    <div style={{ height: "100vh" }}>
        <h1 className='pageHeader'>Emoji Search</h1>

        <Link to="/">
            <img title='Back To Home Page' className='backBtn' src={Back} />
        </Link>
        <p className='bmiInput' >
            {selectEmoji ? (
                <span>Your Choose Emoji: {selectEmoji}</span>
            ) : (
                <span>No Emoji</span>
            )}
        </p>
        <Picker  width={1500} onEmojiClick={onEmojiClick} />
    </div>
  )
}

export default EmojiTab