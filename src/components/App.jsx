import { Component } from 'react';
import { FetchImg } from 'services/fetchImges';
export class App extends Component {
  state = {
    inputValue: 'cat',
  };
  componentDidMount() {
    FetchImg(this.state.inputValue, 1)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }
  render() {
    return '123';
  }
}
