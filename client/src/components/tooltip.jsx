import React, { useState } from 'react';
import '../Tooltip.css'; // Importe o CSS

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {visible && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default Tooltip;
