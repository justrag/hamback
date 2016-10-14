import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../actionCreators';

const BeginScreen = ({ bulba, startGameAction }) => (
  <div onClick={() => startGameAction()}>
  START GAME
  </div>
  );
BeginScreen.propTypes = {
  startGameAction: React.PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  bulba: state.bulba,
});
export default connect(mapStateToProps, {
  startGameAction: startGame,
})(BeginScreen);
