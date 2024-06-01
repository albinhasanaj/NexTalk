import { FC } from 'react';

interface EmojiMenuProps {
    triggerEffect: (effectName: string) => void;
}

const EmojiMenu: FC<EmojiMenuProps> = ({ triggerEffect }) => {
    return (
        <div className="emoji-menu absolute bottom-[110%] right-[23%] bg-[rgba(126,125,125,0.2)] flex gap-4 rounded-full rounded-br-none">
            <button onClick={() => triggerEffect('freeze')} className='text-[1.5rem] hover:-translate-y-1 transition-all'>🥶</button>
            <button onClick={() => triggerEffect('fire')} className='text-[1.5rem] hover:-translate-y-1 transition-all'>🔥</button>
            <button onClick={() => triggerEffect('ufo')} className='text-[1.5rem] hover:-translate-y-1 transition-all'>👽</button>
            <button onClick={() => triggerEffect('confetti')} className='text-[1.5rem] hover:-translate-y-1 transition-all'>🎉</button>
            <button onClick={() => triggerEffect('mystery')} className='text-[1.5rem] hover:-translate-y-1 transition-all'>❓</button>
        </div>
    );
};

export default EmojiMenu;
