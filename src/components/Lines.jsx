import React from 'react';

const Lines = ({ lines, handler }) => (
  <div style={{ display: 'flex' }}>
    {lines.map((l, index) => (
      <div
        key={index}
        onClick={() => handler(index)}
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
};
export default Lines;
