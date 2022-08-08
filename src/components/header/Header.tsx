import React from 'react';
import './header.scss';
import logo from '../../assets/images/header.svg';
import { projectUrl } from '../../index';

export function Header() {
  return (
    <header className="header">
      <a className="header_link" href={`/${projectUrl}`}>
        <div className="header_logo">
          <img src={logo} alt="header logo" />
        </div>
      </a>
      <div className="header_username">Dmitry Kuksenko</div>
    </header>
  );
}
