import React, { useContext } from 'react';
import './index.scss';

import { ContextStore } from '../../App'

const navItems = [
  {title: 'My Tasks', status: 'all'}, 
  {title: 'In progress', status: 'inProgress'},
  {title: 'Completed', status: 'completed'}
];

const Header = () => {
  const { state, dispatch } = useContext(ContextStore);

  const navItemHandler = (item) => {
    return () => {
      dispatch({ type: 'SWITCH_TODO', payload: item.status})
    }
  }

  return (
    <header>
      <nav>
        <ul>
          {navItems.map(item => {
            return (
              <li key={item.status}
                  className={`nav-item ${state.status === item.status ? 'active' : ''}`}
                  onClick={navItemHandler(item)}>
                  {item.title}
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
