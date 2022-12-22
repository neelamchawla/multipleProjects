import React, { useState } from 'react';
import Picker, { EmojiStyle, Emoji } from 'emoji-picker-react';

function EmojiTab() {

    const [selectEmoji, setSelectEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setSelectEmoji(event.emoji);
        console.log(event.emoji);
    };

  return (
    <div>
        <h1>Emoji Search</h1>
        {selectEmoji ? (
            <span>Your Choose Emoji: {selectEmoji}</span>
        ) : (
            <span>No Emoji</span>
        )
    }
    <Picker onEmojiClick={onEmojiClick} />
    </div>
  )
}

export default EmojiTab