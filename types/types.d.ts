declare interface AuthFormProps {
    isLogin: boolean;
};

declare interface InputFieldProps {
    label: string;
    type: string;
    placeholder: string;
    customClasses: string;
    name: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

declare interface AccountProps {
    username: string;
    nickname?: string;
    profilePic: string;
    isOnline?: boolean;
    hasIcon?: string;
    isPinned?: boolean;
    newMessages?: number;
    isFriend: boolean;
    handleClick?: () => void;
    id: string;
    refreshFriends?: () => void;
};

declare interface FriendDetails {
    id?: string;
    username?: string;
    profilePic?: string | null;
    isOnline?: boolean;
    newMessages?: boolean;  // Adding new property here
}

declare interface JwtPayload {
    id: string;
    username: string;
    email: string;
    provider?: string;
}

declare interface MainComponentSidebarProps {
    view: string;
    setView: (view: string) => void;
    socket: SocketIOClient.Socket;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

declare interface MainComponentProps {
    isConnected: boolean;
    view: string;
    socket: SocketIOClient.Socket;
    isOpen: boolean;
};

declare interface SearchbarProps {
    searchQuery: string;
    setSearchQuery: (searchQuery: string) => void;
};

declare interface SearchResults {
    username: string;
    profilePic: string;
    isOnline: boolean;
    id: string;
};

declare interface ChatBubbleProps {
    message: string;
    isSender: boolean;
    profilePic: string;
    username: string;
};

declare interface ChatSelectedProps {
    socket: SocketIOClient.Socket;
    isConnected: boolean;
};

declare interface Message {
    isSender: boolean;
    content: string;
    senderId: string;
    receiverId: string;
    seen: boolean;
    sender: {
        profilePic: string;
    };
};

declare interface NoChatSelectedProps {
    socket: SocketIOClient.Socket;
};



declare type EmojiMap = {
    freeze: '🥶',
    fire: '🔥',
    ufo: '👽',
    confetti: '🎉',
    mystery: '❓',
};