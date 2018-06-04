import React from 'react'
import ReactDOMServer from 'react-dom/server';

import App from '../../src/containers/App';

import configureStore from '../../src/containers/App/configureStore';
import createHistory from 'history/createMemoryHistory'
import rootSaga from '../../src/containers/App/saga';


const path = require("path");
const fs = require("fs");

const initialState = {};

const history = createHistory();

const store = configureStore(initialState, history);

store.runSaga(rootSaga);

export default (req, res) => {

    const filePath = path.resolve(__dirname, '../../dist/index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            return res.status(404).end()
        }

        const html = ReactDOMServer.renderToString(
          <App store={store} history={history} />
        );

        return res.send(
            htmlData.replace(
                '<div id="root"></div>',
                `<div id="root">${html}</div>`
            )
        );
    });
}