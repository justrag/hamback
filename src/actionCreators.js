import { createAction } from 'redux-act';

export const startGame = createAction('START_GAME');
export const chooseLine = createAction('CHOOSE_LINE', (lineIndex, roll) => ({ lineIndex, roll }));
export const endGame = createAction('END_GAME');
export const unblock = createAction('UNBLOCK');
