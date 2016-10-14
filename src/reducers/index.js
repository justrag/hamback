import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import { startGame, chooseLine } from '../actionCreators';
import { dieRoll } from '../game_utils';


export const getLines = (state) => state.lines;
export const getScreen = (state) => state.screen;
export const getRoll = (state) => state.roll;

const bulba = (state, payload) => {
  console.debug('state, payload: %o %o', state, payload);
  return Date.now();
};

const screen = createReducer({
  [startGame]: () => 'GAMESCREEN',
}, 'BEGINSCREEN'
  );

const chooseLineReducer = (state, payload) => {
  const lines = [...state];
  lines[payload] -= 1;
  return lines;
};

const lines = createReducer({
  [startGame]: () => [0, 0, 0, 0, 0, 0, 6],
  [chooseLine]: chooseLineReducer,
}, []
  );

const roll = createReducer({
  [startGame]: () => dieRoll(),
  [chooseLine]: () => dieRoll(),
}, 0
  );

const reducer = combineReducers({
  bulba,
  screen,
  lines,
  roll,
});

export default reducer;
