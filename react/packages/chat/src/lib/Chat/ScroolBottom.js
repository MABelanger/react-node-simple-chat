import React from 'react';

function ScroolBottom ({reference}) {
  return (
    <div style={{ float:"left", clear: "both" }}
         ref={(el) => { reference(el); }}>
    </div>
  )
}

export default ScroolBottom;
