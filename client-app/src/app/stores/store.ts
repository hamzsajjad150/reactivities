import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

//creating an interface that will store our stores
interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
}

//intiazling a store that has activityStore
export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore()
}

//creating a react context for this
// this will give us access to property observerable and computed property of obserable store
export const StoreContext = createContext(store);

//creating a simple react hook that will allow us to use our stores
//inside our components
export function useStore(){
    //returning the content of ours stores using the usecontext function
    //this is a react hook to use the context we create
    return useContext(StoreContext);
}