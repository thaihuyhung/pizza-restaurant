import Loadable from 'react-loadable';
import express from 'express';
import path from 'path';

import serverRenderer from './middleware/renderer';

const port = process.env.PORT || 4000;

const app = express();
const router = express.Router();


router.use(express.static(path.resolve(__dirname, '../dist')));

/**
 * Ideally we should handle all the routes and render its corresponding component.
 * For now, i will just render the App component. 
 * So if you request a restaurant detail page, it still response app component HTML in the response.
 */
router.use('*', serverRenderer);

app.use(router);

Loadable.preloadAll().then(() => {
    app.listen(port, () => {
        // eslint-disable-next-line
        console.log(`Listening on port ${port}`);
    });
});

