import './index.scss';

const Header = ({ filterState, setFilterState }) => {
  const navItems = [
    {title: 'My Tasks', status: 'all'}, 
    {title: 'In progress', status: 'inProgress'},
    {title: 'Completed', status: 'completed'}
  ];

  const navItemHandler = (e) => {
    const status = e.currentTarget.dataset.name;
      setFilterState(status)
    }

  return (
    <header>
      <nav>
        <ul>
          {navItems.map(item => {
            return (
              <li key={item.status}
                  className={`nav-item ${filterState === item.status ? 'active' : ''}`} 
                  data-name={item.status}
                  onClick={navItemHandler}>
                  {item.title}
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  );
}

// Header.propTypes = {
//   filterState: PropTypes.string.isRequired, 
//   setFilterState: PropTypes.func.isRequired,
// }

export default Header;
