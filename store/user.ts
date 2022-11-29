import { Account } from "appwrite";
import toast from "react-hot-toast";
import create from "zustand";

import { devtools } from "zustand/middleware";
import appwrite from "../appwrite";

export type UserType = {
  user: {
    $id: string;
    email: string;
    name: string;
    phone: string;
  };
  getUser: () => void;
};

const UserStore = (set: any): UserType => ({
  user: {
    $id: "",
    email: "",
    name: "",
    phone: "",
  },
  getUser: async () => {
    const account = new Account(appwrite);
    try {
      const user = await account.get();
      console.log(user);

      set({ user });
    } catch (e) {
      toast.error("Somthing went wrong");
    }
  },
});

const useUserStore = create(devtools(UserStore));

export default useUserStore;
