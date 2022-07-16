import { toast } from 'react-toastify';

import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { apiService } from '../../services/api-service';
import { Gallery } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    status: 'idle',
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const img = this.props.searchValue;
    const page = this.state.page;

    if (prevProps.searchValue !== img) {
      this.setState({ status: 'pending' });

      apiService(img, page)
        .then(({ hits }) => {
          this.setState({
            images: hits,
            status: 'resolved',
          });
          if (hits.length === 0) {
            this.setState({ status: 'idle' });
            toast.error(
              'Sorry, but nothing was found for your query. Try again'
            );
            return;
          }
        })
        .catch(error => console.log(error));
    }

    if (prevState.page !== page) {
      this.setState({ status: 'pending' });

      apiService(img, page)
        .then(({ hits }) => {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            status: 'resolved',
          }));
        })
        .catch(error => console.log(error));
    }
  }

  toggleModal = img => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: img,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, showModal, largeImageURL } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolved') {
      return (
        <>
          <Gallery className="gallery">
            <ImageGalleryItem images={images} onClick={this.toggleModal} />
          </Gallery>
          <Button onClick={this.loadMore} />
          {showModal && (
            <Modal imgLarg={largeImageURL} onClose={this.toggleModal} />
          )}
        </>
      );
    }
  }
}
