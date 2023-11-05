import React, { useRef } from 'react';
import useClickEffect from '../../utils/hooks/useClickEffect';

const Plus = () => {
  const refPlus = useRef(null);
  const { handleBtnMD, handleBtnMU } = useClickEffect(refPlus);
  return (
    <img
      src="/media/images/Buttons/plus.png"
      style={{
        width: 40,
        height: 40,
        transition: '0.3s',
        cursor: 'pointer',
      }}
      ref={refPlus}
      onMouseDown={handleBtnMD}
      onMouseUp={handleBtnMU}
      onMouseEnter={() => (refPlus.current.style.transform = 'scale(1.1)')}
      onMouseLeave={() => (refPlus.current.style.transform = 'scale(1)')}
    />
  );
};

export default Plus;
