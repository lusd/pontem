import React from 'react';
import { ISwapModel } from '../../store';
import './modal.scss';

export function ModalContent({
  id, title, description, blocksCount, address,
}: ISwapModel) {
  return (
    <div className="modal_details">
      <span>title:</span>
      {' '}
      <span>{title}</span>
      <span>id:</span>
      {' '}
      <span>{id}</span>
      <span>description:</span>
      {' '}
      <span>{description}</span>
      <span>blocksCount:</span>
      <span>{blocksCount}</span>
      <span>address:</span>
      <span>{address}</span>
    </div>
  );
}
