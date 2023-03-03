import { Component } from 'react';
import './App.css';
import { FetchImg } from 'services/fetchImges';
import { Searchbar } from './Searchbar/Searchbar';
export class App extends Component {
  state = {
    inputValue: 'cat',
    images: [],
    status: 'idle',
    totalHits: 0,
  };
  componentDidMount() {
    FetchImg(this.state.inputValue, 1)
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }
  render() {
    const { status } = this.state;
    if (status === 'idle') {
      return <Searchbar />;
    }
  }
}
