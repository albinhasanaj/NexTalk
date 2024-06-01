import { create } from "zustand";

type FriendStoreProps = {
    friendId: string;
    receiverUsername: string;
    userId: string;
    userProfilePic: string;
    setFriendId: (friendId: string) => void;
    setReceiverUsername: (receiverUsername: string) => void;
    setUserId: (userId: string) => void;
    setUserProfilePic: (userProfilePic: string) => void;
}

export const useFriendStore = create<FriendStoreProps>((set) => ({
    friendId: "",
    receiverUsername: "",
    userId: "",
    userProfilePic: "",
    setFriendId: (friendId) => set({ friendId }),
    setReceiverUsername: (receiverUsername) => set({ receiverUsername }),
    setUserId: (userId) => set({ userId }),
    setUserProfilePic: (userProfilePic) => set({ userProfilePic })
}));