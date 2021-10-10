import React from 'react';

// material-ui
import { Button } from '@mui/material';
import { Pagination } from '@mui/material';

// styling
import './Filters.scss';

// interface
import { FiltersProps, SortingOption } from '../../interfaces/interfaces';

const Filters = ({ sort, activeSortingOption, count, currentPage, paginate }: FiltersProps) => {
  const sortingOptions: SortingOption[] = [
    {
      label: 'Sort A - Z',
      value: 0,
    },
    {
      label: 'Sort Z - A',
      value: 1,
    },
    {
      label: 'Sort Initial order',
      value: 2,
    },
  ];

  return (
    <div className="filters-container">
      <Button
        onClick={() => sort(sortingOptions[activeSortingOption])}
        variant="contained"
        color="primary"
      >
        {sortingOptions[activeSortingOption].label}
      </Button>
      <Pagination
        color="primary"
        count={count}
        page={currentPage}
        onChange={(_, value) => paginate(value)}
      />
    </div>
  );
};

export default Filters;
