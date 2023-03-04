import { Component } from 'react';
import './App.css';
import { fetchImages } from 'services/fetchImges';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
let page = 1;
export class App extends Component {
  state = {
    inputData: 'cat',
    items: [],
    status: 'idle',
    totalHits: 0,
  };

  handleSubmit = inputData => {
    page = 1;
    if (inputData.trim() === '') {
      alert('Введіть назву фотографії');
      return;
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = fetchImages(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          alert('Немає фото');
        } else {
          this.setState({
            items: hits,
            inputData,
            totalHits: totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };
  AddMore = () => {
    const { inputData } = this.state;
    this.setState({ status: 'pending' });
    try {
      const { hits } = fetchImages(inputData, (page += 1));
      console.log(hits);
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  render() {
    const { status, totalHits, items } = this.state;
    if (status === 'idle') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.AddMore} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <span>Wrong!!</span>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.AddMore} />
          )}
        </div>
      );
    }
  }
}
