import { create } from "zustand";

type FriendStoreProps = {
    friendId: string;
    setFriendId: (friendId: string) => void;
}

export const useFriendStore = create<FriendStoreProps>((set) => ({
    friendId: "",
    setFriendId: (friendId) => set({ friendId }),
}));