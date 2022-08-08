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

const itemSize = Number(cssVars.SWAP_BLOCK_HEIGHT) + Number(cssVars.SWAP_BLOCK_GAP);

export const List = React.memo(({ items }: IListProps) => {
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);
  const [availableWidth, setAvailableWidth] = useState(window.innerWidth);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const { value: searchValue, option: searchOption } = useSelector(selectSearch);

  const handleCloseModal = useCallback(() => {
    setModalIndex(null);
  }, []);
  const handleOpenModal = useCallback((index: number) => {
    setModalIndex(index);
  }, []);

  const handleResize = () => {
    setAvailableHeight(window.innerHeight);
    const rootElement = document.getElementById('root') as HTMLElement;
    setAvailableWidth(rootElement.clientWidth);
  };

  const height = useMemo(() => (
    availableHeight
      - cssVars.HEADER_HEIGHT
      - cssVars.SEARCH_BLOCK_HEIGHT
      - cssVars.SWAP_BLOCK_VERTICAL_PADDING
  ), [availableHeight]);

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

  // Add or remove resize addEventListener once the component mounted or unmounted;
  useEffect(() => {
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
        modalIsOpen={modalIndex !== null}
        handleCloseModal={handleCloseModal}
        title="Details"
      >
        {modalIndex !== null ? <ModalContent {...items[modalIndex]} /> : null}
      </ModalComponent>
    </div>
  );
});
