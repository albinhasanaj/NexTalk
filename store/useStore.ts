import { create } from "zustand";

type FriendStoreProps = {
    friendId: string;
    username: string;
    setFriendId: (friendId: string) => void;
    setUsername: (username: string) => void;
}

export const useFriendStore = create<FriendStoreProps>((set) => ({
    friendId: "",
    username: "",
    setFriendId: (friendId) => set({ friendId }),
    setUsername: (username) => set({ username }),
}));