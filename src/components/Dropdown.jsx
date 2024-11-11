import React, { useState, useRef, useEffect } from 'react';

function Dropdown({ title, items, nested }) {
  const [openSubmenu, setOpenSubmenu] = useState({});
  const dropdownRef = useRef(null); 

  const toggleSubmenu = (index, event) => {
    event.stopPropagation(); 
    setOpenSubmenu(prev => ({
      ...prev,
      [index]: !prev[index] 
    }));
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenSubmenu({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="btn btn-secondary btn-large-custom dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        {title}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {items.map((item, index) => nested ? (
          <li key={index}>
            <button className="dropdown-item" onClick={(e) => toggleSubmenu(index, e)}>{item.title}</button>
            {openSubmenu[index] && (
              <ul className="itmes2">
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex} className='item3'><a className="dropdown-item" href={subItem.href}>{subItem.label}</a></li>
                ))}
              </ul>
            )}
          </li>
        ) : (
          <li key={index}><a className="dropdown-item" href={item.href}>{item.label}</a></li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
