import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import cn from 'clsx';

const NavBar = () => {
  return (
    <nav className={'navbar'}>
      <NavLink
        to={'/'}
        className={({ isActive }) =>
          cn('navbar__link', { 'navbar__link--active': isActive })
        }
        end
      >
        Home
      </NavLink>
      <NavLink
        to={'/history'}
        className={({ isActive }) =>
          cn('navbar__link', { 'navbar__link--active': isActive })
        }
      >
        History
      </NavLink>
    </nav>
  );
};

export default NavBar;
