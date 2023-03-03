import './Searchbar.css';
import { Component } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
export class Searchbar extends Component {
  state = {
    inputData: '',
  };
  inputChange = e => {
    this.setState({ inputData: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputData);
    this.setState({ inputData: '' });
  };
  render() {
    const { inputData } = this.state.inputData;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <BiSearchAlt size={25} />
          </button>

          <input
            className="SearchForm-input"
            value={inputData}
            name="inputData"
            onChange={this.inputChange}
            type="text"
            autoComplete="off"
            autoFocus
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
