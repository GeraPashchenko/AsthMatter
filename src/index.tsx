import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { GridThemeProvider } from "styled-bootstrap-grid";
import gridTheme from "./config/theme/grid";
import defaultTheme from "./config/theme/index";
import Root from "./routing/index";
import {Provider} from "react-redux";
import {createStore} from "redux";
import Reducer from "./redux/reducers";

const store = createStore(Reducer); // Creating redux storage

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <GridThemeProvider gridTheme={gridTheme}>
              <Provider store={store}>
                <Root />
              </Provider>
            </GridThemeProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
