import React, { PropTypes } from 'react';

const countersColors = {
  1: '#5E91AB',
  2: '#C94E3C',
  3: '#6CAE3F',
  4: '#C04E86',
  5: '#EAE448',
  6: '#EDB639',
};

const Line = ({ index, counters, active, handler }) => (
  <div
    onClick={() => handler()}
    className={`line-container ${active ? 'active' : 'inactive'}`}
  >
    <div>Line {index}</div>
    {counters.map(c =>
      <div
        key={`c${c}`}
        className="counter"
        style={{ backgroundColor: countersColors[c] }}
      >
        {c}
      </div>
    )}
  </div>
  );
Line.propTypes = {
  index: PropTypes.number.isRequired,
  counters: PropTypes.arrayOf(PropTypes.number).isRequired,
  handler: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};
export default Line;
