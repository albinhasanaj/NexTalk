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

declare interface JwtPayload {
    id: string;
    username: string;
    email: string;
    provider?: string;
}

declare interface MainComponentSidebarProps {
    view: string;
    setView: (view: string) => void;
};

declare interface MainComponentProps {
    view: string;
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