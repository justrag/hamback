import React from 'react';
import { connect } from 'react-redux';
import Lines from '../components/Lines';
import { getLines, getRoll } from '../reducers';

const GameScreen = ({ lines, roll }) => (
  <div>
    <h1>Hamback!</h1>
    <div>Roll: {roll}</div>
    <div>
      <Lines lines={lines} />
    </div>
  </div>
  );
GameScreen.propTypes = {
  roll: React.PropTypes.number.isRequired,
  lines: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
};
const mapStateToProps = (state) => ({
  roll: getRoll(state),
  lines: getLines(state),
});
export default connect(mapStateToProps)(GameScreen);
