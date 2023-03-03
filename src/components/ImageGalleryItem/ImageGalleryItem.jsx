import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  Modal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { image } = this.props;
    const { webformatURL } = image;
    return (
      <li className="ImageGalleryItem">
        <img
          onClick={this.Modal}
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt="img"
        />
        {this.state.showModal && <Modal onClose={this.Modal} image={image} />}
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
