import { create } from "zustand";

type ChatSessionStore = {
    friendId: string;
    receiverUsername: string;
    userId: string;
    userProfilePic: string;
    isGithubUser: boolean;
    receiverNickname: string;
    setFriendId: (friendId: string) => void;
    setReceiverUsername: (receiverUsername: string) => void;
    setReceiverNickname: (receiverNickname: string) => void;
    setUserId: (userId: string) => void;
    setUserProfilePic: (userProfilePic: string) => void;
    setIsGithubUser: (isGithubUser: boolean) => void;
}

export const useChatSessionStore = create<ChatSessionStore>((set) => ({
    friendId: "",
    receiverUsername: "",
    userId: "",
    userProfilePic: "",
    isGithubUser: false,
    receiverNickname: "",
    setReceiverNickname: (receiverNickname) => set({ receiverNickname }),
    setFriendId: (friendId) => set({ friendId }),
    setReceiverUsername: (receiverUsername) => set({ receiverUsername }),
    setUserId: (userId) => set({ userId }),
    setUserProfilePic: (userProfilePic) => set({ userProfilePic }),
    setIsGithubUser: (isGithubUser) => set({ isGithubUser })
}));