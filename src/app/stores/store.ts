import { createContext, useContext } from "react";
import ChatStore from "./chatStore";
import ActivityStore from "./chatStore";

interface Store {
    chatStore: ChatStore
}

export const store: Store = {
    chatStore: new ChatStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
