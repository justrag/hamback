import React from 'react';
import { connect } from 'react-redux';
import BeginScreen from './BeginScreen';
import GameScreen from './GameScreen';
import EndScreen from './EndScreen';
import { getScreen } from '../reducers';

const Screen = ({ screen }) => (
  <div>
    {(screen === 'BEGINSCREEN') && <BeginScreen /> }
    {(screen === 'GAMESCREEN') && <GameScreen /> }
    {(screen === 'ENDSCREEN') && <EndScreen /> }
  </div>
  );
Screen.propTypes = {
  screen: React.PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  screen: getScreen(state),
});
export default connect(mapStateToProps)(Screen);
