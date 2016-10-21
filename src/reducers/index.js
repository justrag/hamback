import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import { startGame, chooseLine, endGame, unblock } from '../actionCreators';
import { dieRoll, getKeyByValue } from '../game_utils';

export const getLines = (state) =>
 [0, 1, 2, 3, 4, 5, 6]
    .map(lineIndex => getAllCounters(state.counters)
                      .filter(c => (c.position === lineIndex)).length);
export const getCountersOnLines = (state) =>
 [0, 1, 2, 3, 4, 5, 6]
    .map(lineIndex => getAllCounters(state.counters)
    .filter(c => (c.position === lineIndex))
    .reduce((prev, curr) => {
      prev.push(curr.id);
      return prev;
    }, [])
    );

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

const getAllCounters = (counters) =>
  [1, 2, 3, 4, 5, 6].map(i => counters[i]);

const chooseLineReducer = (state, payload) => {
  const { lineIndex, roll } = payload;
  const traveller = getAllCounters(state).find(c => (c.position === lineIndex));
  const newState = { ...state };
  newState[traveller.id].position = lineIndex - roll;
  return newState;
  // return { ...state,
  //   [traveller.id]: { ...state[traveller.id], position: lineIndex - roll },
  //        };
};

const unblockReducer = (state) => {
  const traveller = getAllCounters(state).find(c => (c.position === 0));
  return { ...state,
    [traveller.id]: { ...state[traveller.id], position: 6 },
         };
};

const startingCounters = () =>
   [1, 2, 3, 4, 5, 6].reduce(
    (prev, curr) => {
      prev[curr] = { id: curr, position: 6 };
      return prev;
    }, {});
// 1: {id: 1, position: 6},
// 2: {id: 2, position: 6},
// ...
// 6: {id: 6, position: 6},

const counters = createReducer({
  [startGame]: startingCounters,
  [chooseLine]: chooseLineReducer,
  [unblock]: unblockReducer,
}, {}
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
  counters,
  roll,
});

export default reducer;
