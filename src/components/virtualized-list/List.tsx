import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { FixedSizeList } from 'react-window';
import { useSelector } from 'react-redux';

import './list.scss';
import cssVars from '../layout/variables.module.scss';
import { selectSearch, buttonNames, ISwapModel } from '../../store';
import { ModalComponent, ModalContent } from '../modal';
import { Row } from './Row';

interface IListProps {
  items: ISwapModel[];
}

export const List = React.memo(({ items }: IListProps) => {
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);
  const [availableWidth, setAvailableWidth] = useState(window.innerWidth);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { value: searchValue, option: searchOption } = useSelector(selectSearch);

  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false);
    setModalIndex(null);
  }, []);
  const handleOpenModal = useCallback((index: number) => {
    setModalIsOpen(true);
    setModalIndex(index);
  }, []);

  const height = availableHeight
      - cssVars.HEADER_HEIGHT
      - cssVars.SEARCH_BLOCK_HEIGHT
      - cssVars.SWAP_BLOCK_VERTICAL_PADDING;
  const itemSize = Number(cssVars.SWAP_BLOCK_HEIGHT) + Number(cssVars.SWAP_BLOCK_GAP);

  const filteredList = useMemo(() => items.filter(({ title, description, selected }) => {
    if (searchOption === buttonNames.selected && !selected) {
      return false;
    }
    if (!searchValue) {
      return true;
    }
    if (title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return description.toLowerCase().includes(searchValue.toLowerCase());
  }), [items, searchValue, searchOption]);

  useEffect(() => {
    function handleResize() {
      setAvailableHeight(window.innerHeight);
      setAvailableWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="list_wrapper">
      <FixedSizeList
        className="list"
        height={height}
        width={availableWidth >= 600 ? 600 : availableWidth - cssVars.APP_MOBILE_SIDE_PADDING * 2}
        itemSize={itemSize}
        itemCount={filteredList.length}
        itemData={filteredList}
      >
        {(({ ...props }) => <Row {...props} handleOpenModal={handleOpenModal} />)}
      </FixedSizeList>
      <ModalComponent
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        title="Details"
      >
        {modalIndex !== null ? <ModalContent {...items[modalIndex]} /> : null}
      </ModalComponent>
    </div>
  );
});
