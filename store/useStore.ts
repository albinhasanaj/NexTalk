import { create } from "zustand";

type ChatSessionStore = {
    friendId: string;
    receiverUsername: string;
    userId: string;
    userProfilePic: string;
    setFriendId: (friendId: string) => void;
    setReceiverUsername: (receiverUsername: string) => void;
    setUserId: (userId: string) => void;
    setUserProfilePic: (userProfilePic: string) => void;
}

export const useChatSessionStore = create<ChatSessionStore>((set) => ({
    friendId: "",
    receiverUsername: "",
    userId: "",
    userProfilePic: "",
    setFriendId: (friendId) => set({ friendId }),
    setReceiverUsername: (receiverUsername) => set({ receiverUsername }),
    setUserId: (userId) => set({ userId }),
    setUserProfilePic: (userProfilePic) => set({ userProfilePic })
}));