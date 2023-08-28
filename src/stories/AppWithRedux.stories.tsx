import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";


export  default {
    title: 'AppwithReduxStories',
    component: AppWithRedux
}

export function AppWithReduxExample(){
    return<Provider store={store}><AppWithRedux/></Provider>
}