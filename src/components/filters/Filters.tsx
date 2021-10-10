import React from 'react';

// material-ui
import { Button } from '@mui/material';
import { Pagination } from '@mui/material';

// styling
import './Filters.scss';

// interface
import { FiltersProps } from '../../interfaces/interfaces';

const Filters = ({ setActiveSortingOption, activeSortingOption, count, currentPage, paginate }: FiltersProps) => {
  const sortingOptions: string[] = ['Sort A - Z', 'Sort Z - A', 'Sort Initial order'];

  const chooseActiveSortingOption = (): void => {
    setActiveSortingOption(
      activeSortingOption === 2 ? 0 : activeSortingOption + 1
    );
  }

  return (
    <div className="filters-container">
      <Button
        onClick={chooseActiveSortingOption}
        variant="contained"
        color="primary"
      >
        {sortingOptions[activeSortingOption]}
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
