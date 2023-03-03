import { Component } from 'react';
import './App.css';
import { FetchImg } from 'services/fetchImges';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
let page = 1;
export class App extends Component {
  state = {
    inputData: '',
    images: [],
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
        const { totalHits, hits } = FetchImg(inputData, this.state.page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          alert('Немає фото');
        } else {
          this.setState({
            images: hits,
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
      const { hits } = FetchImg(inputData, (page += 1));
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  render() {
    const { status, totalHits, images } = this.state;
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
          <ImageGallery page={this.state.page} images={this.state.images} />
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
          <ImageGallery page={this.state.page} images={this.state.images} />
          {totalHits > 12 && totalHits > images.length && (
            <Button onClick={this.AddMore} />
          )}
        </div>
      );
    }
  }
}
