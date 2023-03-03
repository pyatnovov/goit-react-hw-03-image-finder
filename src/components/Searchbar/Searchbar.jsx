import './Searchbar.css';
import { Component } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
export class Searchbar extends Component {
  state = {
    inputValue: '',
  };
  inputChange = e => {
    this.setState({ inputData: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };
  render() {
    const { inputValue } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <BiSearchAlt size={25} />
          </button>

          <input
            className="SearchForm-input"
            value={inputValue}
            onChange={this.inputChange}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
