import React from 'react';
import { connect } from 'react-redux';
import Lines from '../components/Lines';
import { getLines, getRoll } from '../reducers';
import { chooseLine } from '../actionCreators';

const GameScreen = ({ lines, roll, chooseLineAction }) => (
  <div>
    <h1>Hamback!</h1>
    <div>Roll: {roll}</div>
    <div>
      <Lines lines={lines} handler={chooseLineAction} roll={roll} />
    </div>
  </div>
  );
GameScreen.propTypes = {
  roll: React.PropTypes.number.isRequired,
  lines: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  chooseLineAction: React.PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  roll: getRoll(state),
  lines: getLines(state),
});
export default connect(mapStateToProps, {
  chooseLineAction: chooseLine,
})(GameScreen);

