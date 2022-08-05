import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';

import { useAppDispatch, setSelected, selectSearch } from '../../store';
import './swap.scss';
import cube_1 from '../../assets/images/cube_1.svg';
import cube_2 from '../../assets/images/cube_2.svg';
import cube_3 from '../../assets/images/cube_3.svg';
import cube_4 from '../../assets/images/cube_4.svg';
import cube_0 from '../../assets/images/cube_0.svg';
import { Button } from '../button';

export interface ISwapProps {
  id: string;
  // eslint-disable-next-line react/no-unused-prop-types
  address: string;
  title: string;
  description: string;
  blocksCount: number;
  onOpenModal: () => void;
  selected?: boolean;
}

const getCubeSrc = (count: number) => {
  switch (count) {
    case 0: return cube_0;
    case 1: return cube_1;
    case 2: return cube_2;
    case 3: return cube_3;
    default: return cube_4;
  }
};

export const Swap = React.memo(({
  id, title, description, blocksCount, selected, onOpenModal,
}: ISwapProps) => {
  const dispatch = useAppDispatch();
  const { value: searchValue } = useSelector(selectSearch);

  const handleMarkSelection = useCallback(() => {
    dispatch(setSelected({ id, selected: !selected }));
  }, [selected, id, dispatch]);

  return (
    <div className="swap">
      <figure className="swap_image_block">
        <img className="swap_image" src={getCubeSrc(blocksCount)} alt="Counter of blocks" />
        <figcaption className="swap_caption">
          {blocksCount}
          {' '}
          {blocksCount === 1 ? 'block' : 'blocks'}
        </figcaption>
      </figure>
      <div className="swap_description_block">
        <Highlighter
          className="swap_title"
          searchWords={[searchValue]}
          autoEscape
          textToHighlight={title}
        />
        <Highlighter
          className="swap_description"
          searchWords={[searchValue]}
          autoEscape
          textToHighlight={description}
        />
      </div>
      <div className="swap_buttons_block">
        <Button name="Details" appearance="form" onClick={onOpenModal} />
        <Button name={selected ? 'Skip selection' : 'Mark as suitable'} appearance="form" toggle={selected} onClick={handleMarkSelection} />
      </div>
    </div>
  );
});
