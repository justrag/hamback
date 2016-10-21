import React from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
import { getCountersOnLines, getRoll } from '../reducers';
import { chooseLine } from '../actionCreators';

const countersColors = {
  1: '#5E91AB',
  2: '#C94E3C',
  3: '#6CAE3F',
  4: '#C04E86',
  5: '#EAE448',
  6: '#EDB639',
};

const onClickHandler = (lineValue, roll, lineIndex, action) => {
  if (lineValue > 0 && lineIndex >= roll) {
    action(lineIndex, roll);
  }
};

const Lines = ({ roll, countersOnLines, chooseLineAction }) => (
  <div style={{ display: 'flex' }}>
    <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
    {countersOnLines.map((l, index) => (
      <div
        key={`l${index}`}
        onClick={() => onClickHandler(l.length, roll, index, chooseLineAction)}
        style={{
          flex: 1,
          border: 'thick solid black',
          margin: '5px',
          padding: '5px',
          textAlign: 'center',
        }}
      >
        {l.map(c =>
          <div
            key={`l${index}-c${c}`}
            style={{
              border: 'thin dashed black',
              backgroundColor: countersColors[c],
              borderRadius: '50%' }}
          >
            {c}
          </div>
          )}
      </div>
      )
    )}
    </FlipMove>
  </div>
  );
Lines.propTypes = {
  roll: React.PropTypes.number.isRequired,
  countersOnLines:  React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.number)).isRequired,
  chooseLineAction: React.PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  roll: getRoll(state),
  countersOnLines: getCountersOnLines(state),
});
export default connect(mapStateToProps, {
  chooseLineAction: chooseLine,
})(Lines);
