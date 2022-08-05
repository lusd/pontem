import React, { useCallback } from 'react';

import { Swap } from '../swap';
import { ISwapModel } from '../../store';

interface IRowProps {
  style: React.CSSProperties;
  index: number;
  data: Array<ISwapModel>;
  handleOpenModal: (index: number) => void;
}

export function Row({
  style, index, data, handleOpenModal,
}: IRowProps) {
  const onOpenModal = useCallback(() => {
    handleOpenModal(index);
  }, [handleOpenModal, index]);

  return (
    <div style={style}>
      <Swap {...data[index]} onOpenModal={onOpenModal} />
    </div>
  );
}
