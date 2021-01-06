import React, { useContext } from 'react';
import './index.scss';

import { ContextStore } from '../../App';
import { navItems } from '../../constant';

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
        {navItems().map(item => {
          return (
            <div key={item.status}
              className={`nav-item ${state.status === item.status ? 'active' : ''}`}
              onClick={navItemHandler(item)}>
              {item.title}
            </div>
          )
        })}
      </nav>
    </header>
  );
}

export default Header;
