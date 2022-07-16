import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchValue: '',
  };

  hendlrSubmitForm = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <Container>
        {' '}
        <Searchbar onSubmit={this.hendlrSubmitForm} />
        <ImageGallery searchValue={searchValue} />
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
