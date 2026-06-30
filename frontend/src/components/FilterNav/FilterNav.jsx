import React from 'react';
import './FilterNav.css';

function FilterNav({ activeFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'recent', label: 'Recent' },
    { value: 'Celebration', label: 'Celebration' },
    { value: 'Thank you', label: 'Thank You' },
    { value: 'Inspiration', label: 'Inspiration' },
  ];

  return (
    <nav className="filter-nav">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`filter-button ${
            activeFilter === filter.value ? 'active' : ''
          }`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </nav>
  );
}

export default FilterNav;
