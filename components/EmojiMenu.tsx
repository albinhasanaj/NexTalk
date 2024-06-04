import { FC } from 'react';

interface EmojiMenuProps {
    triggerEffect: (effectName: string) => void;
    sendReaction: (reaction: string) => void;
}

const effects = {
    freeze: '🥶',
    fire: '🔥',
    ufo: '👽',
    confetti: '🎉',
    mystery: '❓'
};

const EmojiMenu: FC<EmojiMenuProps> = ({ triggerEffect, sendReaction }) => {
    return (
        <div className="emoji-menu absolute bottom-[110%] right-[23%] bg-[rgba(126,125,125,0.2)] flex gap-4 rounded-full rounded-br-none">
            {Object.entries(effects).map(([effectName, emoji]) => (
                <button
                    key={effectName} // Added a key for React list rendering best practices
                    onClick={() => { triggerEffect(effectName); sendReaction(emoji); }}
                    className='text-[1.5rem] hover:-translate-y-1 transition-all'
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
};

export default EmojiMenu;
