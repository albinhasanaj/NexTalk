import { create } from "zustand";

type FriendStoreProps = {
    friendId: string;
    username: string;
    userId: string;
    userProfilePic: string;
    setFriendId: (friendId: string) => void;
    setUsername: (username: string) => void;
    setUserId: (userId: string) => void;
    setUserProfilePic: (userProfilePic: string) => void;
}

export const useFriendStore = create<FriendStoreProps>((set) => ({
    friendId: "",
    username: "",
    userId: "",
    userProfilePic: "",
    setFriendId: (friendId) => set({ friendId }),
    setUsername: (username) => set({ username }),
    setUserId: (userId) => set({ userId }),
    setUserProfilePic: (userProfilePic) => set({ userProfilePic })
}));