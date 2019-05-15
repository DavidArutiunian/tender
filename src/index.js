import React from "react";
import ReactDOM from "react-dom";
import App from "containers/App";
import * as ServiceWorker from "./ServiceWorker";
import { connectReduxDevtools } from "mst-middlewares";
import { types } from "mobx-state-tree";
import UserStore from "./models/User";
import UiStore from "models/UI";

const model = types.model({
    user: UserStore,
    ui: UiStore,
});
const store = model.create({
    user: {
        current: undefined,
    },
    ui: {
        isLoggedIn: false,
    },
});

if (process.env.NODE_ENV === "development") {
    connectReduxDevtools(require("remotedev"), store);
}

export const StoreContext = React.createContext(store);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ServiceWorker.unregister();
