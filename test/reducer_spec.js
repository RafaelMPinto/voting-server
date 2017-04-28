/**
 * Created by Rafael.Pinto on 26/04/2017.
 */

import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['filme1']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['filme1']
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['filme1', 'filme2']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['filme1', 'filme2']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['filme1', 'filme2']
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'filme1'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['filme1', 'filme2'],
                tally: {filme1: 1}
            },
            entries: []
        }));
    });

    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['filme1']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['filme1']
        }));
    });

    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['filme1', 'filme2']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'filme1'},
            {type: 'VOTE', entry: 'filme2'},
            {type: 'VOTE', entry: 'filme1'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'filme1'
        }));
    });

});