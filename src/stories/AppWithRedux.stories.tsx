import AppWithRedux from "../AppWithRedux/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";


export default {
    title: 'AppwithReduxStories',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export function AppWithReduxExample() {
    return <AppWithRedux/>
}