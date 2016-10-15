import React from 'react';

const Lines = ({ lines, handler, roll }) => (
  <div style={{ display: 'flex' }}>
    {lines.map((l, index) => (
      <div
        key={index}
        onClick={() => handler(index, roll)}
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
  lines: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  handler: React.PropTypes.func.isRequired,
  roll: React.PropTypes.number.isRequired,
};
export default Lines;
