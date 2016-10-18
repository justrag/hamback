import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import { startGame, chooseLine, endGame, unblock } from '../actionCreators';
import { dieRoll } from '../game_utils';


export const getLines = (state) => state.lines;
export const getScreen = (state) => state.screen;
export const getTurn = (state) => state.turn;
export const getRoll = (state) => state.roll;

export const isWon = (state) => (getLines(state)[0] === 6);

export const isBlocked = (state) => {
  const roll = getRoll(state);
  const lines = getLines(state);
  return (lines.filter((val, idx) => (val > 0 && idx >= roll)).length === 0);
};

export const isTemporarilyBlocked = (state) => {
  const lines = getLines(state);
  return (isBlocked(state) && lines[0] !== 0);
};

export const isPermanentlyBlocked = (state) => {
  const lines = getLines(state);
  return (isBlocked(state) && lines[0] === 0);
};

const bulba = (state, payload) => {
  console.debug('state, payload: %o %o', state, payload);
  return Date.now();
};

const screen = createReducer({
  [startGame]: () => 'GAMESCREEN',
  [endGame]: () => 'ENDSCREEN',
}, 'BEGINSCREEN'
  );

const chooseLineReducer = (state, payload) => {
  const { index, roll } = payload;
  const lines = [...state];
  lines[index] -= 1;
  lines[index - roll] += 1;
  return lines;
};

const unblockReducer = (state) => {
  const lines = [...state];
  lines[0] -= 1;
  lines[6] += 1;
  return lines;
};

const lines = createReducer({
  [startGame]: () => [0, 0, 0, 0, 0, 0, 6],
  [chooseLine]: chooseLineReducer,
  [unblock]: unblockReducer,
}, []
  );

const roll = createReducer({
  [startGame]: () => dieRoll(),
  [chooseLine]: () => dieRoll(),
  [unblock]: () => dieRoll(),
}, 0
  );

const turn = createReducer({
  [startGame]: () => 0,
  [chooseLine]: (state) => state + 1,
  [unblock]: (state) => state + 1,
}, []
  );

const reducer = combineReducers({
  bulba,
  screen,
  turn,
  lines,
  roll,
});

export default reducer;
