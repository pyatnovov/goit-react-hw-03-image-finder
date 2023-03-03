import './Button.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className="Button-load">
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
