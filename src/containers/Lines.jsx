import React from 'react';
import { connect } from 'react-redux';
import { getCountersOnLines, getRoll, getActiveLines } from '../reducers';
import { chooseLine } from '../actionCreators';
import Line from '../components/Line';

const clickHandler = (active, roll, index, action) => {
  if (active) {
    action(index, roll);
  }
};

const Lines = ({ roll, countersOnLines, activeLines, chooseLineAction }) => (
  <div className="flexdiv">
    {countersOnLines.map((l, index) =>
      <Line
        key={`l${index}`}
        index={index}
        counters={l}
        active={activeLines[index]}
        handler={() => clickHandler(activeLines[index], roll, index, chooseLineAction)}
      />
    )}
  </div>
  );
Lines.propTypes = {
  roll: React.PropTypes.number.isRequired,
  countersOnLines:
    React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)).isRequired,
  chooseLineAction: React.PropTypes.func.isRequired,
  activeLines: React.PropTypes.arrayOf(React.PropTypes.bool).isRequired,
};
const mapStateToProps = (state) => ({
  roll: getRoll(state),
  countersOnLines: getCountersOnLines(state),
  activeLines: getActiveLines(state),
});
export default connect(mapStateToProps, {
  chooseLineAction: chooseLine,
})(Lines);
