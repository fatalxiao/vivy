/**
 * @file index.js
 */

import {createBrowserHistory} from 'history';
import Vivy from 'src/vivy';

const history = createBrowserHistory();
const vivy = Vivy(history);
const store = vivy.createStore();
