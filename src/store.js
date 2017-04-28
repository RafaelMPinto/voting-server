/**
 * Created by Rafael.Pinto on 27/04/2017.
 */

import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore() {
    return createStore(reducer);
}
