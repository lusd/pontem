import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Input } from '../input';
import { Button } from '../button';
import './search.scss';
import {
  selectSearch, setSearch, useAppDispatch, setSearchOption, TSearchOptions, buttonNames,
} from '../../store';
import { projectUrl } from '../../index';

export function Search() {
  const dispatch = useAppDispatch();
  const { value, option } = useSelector(selectSearch);
  const navigation = useNavigate();
  const { pathname } = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value));
    if (event.target.value !== undefined) {
      navigation(`${projectUrl}/search/${event.target.value}`, { replace: true });
    }
  };

  const handleButtonClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.textContent) return;
    dispatch(setSearchOption(event.currentTarget.textContent as TSearchOptions));
  };

  /* This useEffect should proceed once on mount to catch url string as search parameter */
  useEffect(() => {
    if (pathname !== '/' && pathname.startsWith(`${projectUrl}/search/`)) {
      const searchParam = pathname.replace(`${projectUrl}/search/`, '');
      const searchString = decodeURIComponent(searchParam);
      dispatch(setSearch(searchString));
    }
  }, []);

  return (
    <div className="search_block">
      <Input
        value={value}
        placeholder="Search by operation or DeFi company name"
        onChange={handleChange}
      />
      <div className="search_buttons">
        <Button name={buttonNames.all} appearance="default" toggle={option === buttonNames.all} onClick={handleButtonClick} />
        <Button name={buttonNames.selected} appearance="default" toggle={option === buttonNames.selected} onClick={handleButtonClick} />
      </div>
    </div>
  );
}
