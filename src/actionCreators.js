import { createAction } from 'redux-act';

export const startGame = createAction('START_GAME');
export const chooseLine = createAction('CHOOSE_LINE', (index, roll) => ({ index, roll }));
export const endGame = createAction('END_GAME');
export const unblock = createAction('UNBLOCK');
