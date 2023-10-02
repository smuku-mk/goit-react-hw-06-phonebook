import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/slices';

import PropTypes from 'prop-types';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = evt => {
    dispatch(setFilter(evt.target.value));
  };

  return (
    <label>
      <span>Find contacts by name</span>
      <input type="text" name="filter" onChange={handleFilterChange} />
    </label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func,
};
