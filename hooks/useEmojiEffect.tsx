import { CSSProperties, useState } from "react";

export function useEmojiEffect() {
    const [emojis, setEmojis] = useState<string[]>([]);
    const [effect, setEffect] = useState<string | null>(null);
    const [showEmojiMenu, setShowEmojiMenu] = useState<boolean>(false);

    const triggerEffect = (effectName: string) => {
        setEffect(effectName);
        setShowEmojiMenu(false);
        const emojiMap = {
            freeze: '🥶',
            fire: '🔥',
            ufo: '👽',
            confetti: '🎉',
            mystery: '❓',
        };
        setEmojis(Array.from({ length: 50 }, () => emojiMap[effectName as keyof typeof emojiMap]));
        setTimeout(() => {
            setEffect(null);
            setEmojis([]);
        }, 3000);
    };

    const createRandomEmojiStyles = () => ({
        '--x': `${Math.random() * 200 - 100}vw`,
        '--y': `${Math.random() * 200 - 100}vh`,
        '--r': `${Math.random() * 720 - 360}deg`,
    }) as CSSProperties;

    return { emojis, effect, showEmojiMenu, triggerEffect, createRandomEmojiStyles, setShowEmojiMenu };
}
