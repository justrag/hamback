import React from 'react';
import { connect } from 'react-redux';
import { getLines, getRoll } from '../reducers';
import { chooseLine } from '../actionCreators';

const onClickHandler = (lineValue, roll, lineIndex, action) => {
  if (lineValue > 0 && lineIndex >= roll) {
    action(lineIndex, roll);
  }
};

const Lines = ({ roll, lines, chooseLineAction }) => (
  <div style={{ display: 'flex' }}>
    {lines.map((l, index) => (
      <div
        key={index}
        onClick={() => onClickHandler(l, roll, index, chooseLineAction)}
        style={{
          flex: 1,
          border: 'thick solid black',
          margin: '5px',
          padding: '5px',
          textAlign: 'center',
        }}
      >
        {l}
      </div>
      )
    )}
  </div>
  );
Lines.propTypes = {
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
})(Lines);
