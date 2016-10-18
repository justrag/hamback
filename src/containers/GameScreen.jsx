import React from 'react';
import { connect } from 'react-redux';
import Lines from './Lines';
import { getLines, getTurn, getRoll,
  isTemporarilyBlocked, isPermanentlyBlocked, isWon } from '../reducers';
import { endGame, unblock } from '../actionCreators';

const GameScreen = ({
  turn,
  roll,
  displayEndGame, endGameAction,
  displayUnblock, unblockAction,
  displayVictory }) => (
    <div>
      <h1>Hamback!</h1>
      <div>Turn: {turn}</div>
      <div>Roll: {roll}</div>
      <div>
        <Lines />
      </div>
      { displayUnblock && <div onClick={() => unblockAction()}>UNBLOCK</div> }
      { displayEndGame && <div onClick={() => endGameAction()}>GAME END</div> }
      { displayVictory && <div onClick={() => endGameAction()}>YOU WON!</div> }
    </div>
  );
GameScreen.propTypes = {
  turn: React.PropTypes.number.isRequired,
  roll: React.PropTypes.number.isRequired,
  lines: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  endGameAction: React.PropTypes.func.isRequired,
  unblockAction: React.PropTypes.func.isRequired,
  displayUnblock: React.PropTypes.bool.isRequired,
  displayEndGame: React.PropTypes.bool.isRequired,
  displayVictory: React.PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  turn: getTurn(state),
  roll: getRoll(state),
  lines: getLines(state),
  displayUnblock: isTemporarilyBlocked(state),
  displayEndGame: isPermanentlyBlocked(state),
  displayVictory: isWon(state),
});
export default connect(mapStateToProps, {
  endGameAction: endGame,
  unblockAction: unblock,
})(GameScreen);

