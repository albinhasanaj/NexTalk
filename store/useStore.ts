import { create } from "zustand";

type UserStore = {
    userId: string;
    userProfilePic: string;
    isGithubUser: boolean;
    setUserId: (userId: string) => void;
    setUserProfilePic: (userProfilePic: string) => void;
    setIsGithubUser: (isGithubUser: boolean) => void;
}

type SelectedFriendStore = {
    friendId: string;
    receiverUsername: string;
    receiverNickname: Map<string, string>;
    setFriendId: (friendId: string) => void;
    setReceiverUsername: (receiverUsername: string) => void;
    setReceiverNickname: (receiverNickname: Map<string, string>) => void;
}

type FriendsListStore = {
    friends: Map<string, string>;
    setFriends: (update: { friendId: string, nickname: string }) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    userId: "",
    userProfilePic: "",
    isGithubUser: false,
    setUserId: (userId: string) => set({ userId }),
    setUserProfilePic: (userProfilePic: string) => set({ userProfilePic }),
    setIsGithubUser: (isGithubUser: boolean) => set({ isGithubUser }),
}));


export const useSelectedFriendStore = create<SelectedFriendStore>((set) => ({
    friendId: "",
    receiverUsername: "",
    receiverNickname: new Map<string, string>(),
    setFriendId: (friendId) => set({ friendId }),
    setReceiverUsername: (receiverUsername) => set({ receiverUsername }),
    setReceiverNickname: (receiverNickname) => set({ receiverNickname }),
}));


export const useFriendsListStore = create<FriendsListStore>((set) => ({
    friends: new Map<string, string>(), // Initial map
    setFriends: (update) => set(state => ({
        friends: new Map(state.friends).set(update.friendId, update.nickname)
    })),
}));