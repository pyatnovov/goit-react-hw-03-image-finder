import { Component } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

// const RootModal = document.queryCommandValue('#RootModal');
export class Modal extends Component {
  KeyPress = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  Overlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.KeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.KeyPress);
  }

  render() {
    const { largeImageURL } = this.props.image;
    return createPortal(
      <div onClick={this.Overlay} className="Overlay">
        <div className="Modal">
          <img src={largeImageURL} alt="IMG" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};
