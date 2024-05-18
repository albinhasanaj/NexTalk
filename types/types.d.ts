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

declare interface FriendProps {
    name: string;
    nickname: string;
    profilePic: string;
    isOnline: boolean;
    hasIcon: string;
    isPinned: boolean;
    newMessages: number;
};