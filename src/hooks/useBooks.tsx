import { useState } from "react";
// import { AuthContainer } from "./useAuth";
import { BooksObject } from "../interfaces/books";

export const useBooks = () => {
  // const auth = AuthContainer.useContainer();
  let [books, setBooks] = useState<BooksObject[]>([]);
  const [modal, setModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdf, setPdf] = useState<File>();


  const fetchBookData = async (e: any, method: string, endpoint: string, bookId: string | null) => {
    if (method === 'POST' /* or 'UPDATE' */) e.preventDefault();
    console.log('loading...');
    let response: Response;
    let options: any;

    if (method !== 'GET') {
      options = {
        method: method,
        headers: {
          'Authorization': `Bearer ${localStorage.accessToken}`,
          'x-access-token': `${localStorage.accessToken}`
        }
      }
    }

    if (method === 'POST') {
      let formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('pdf', pdf as File);
      options = {
        ...options,
        body: formData
      }
    }

    response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, options);
    if (response.ok) {
      const data = await response.json();
      if (method === 'GET') setBooks(data.books.reverse());
      if (method === 'DELETE') setBooks(books.filter(book => book._id !== bookId));
      if (method === 'POST') {
        books.unshift(data.book);
        handleModal(false);
      }
      console.log('data: ', data);
    }
    console.log(response.statusText);
  }

  //----------------------------------------------------------------

  const handleTitle = (eventTargetValue: string) => {
    setTitle(eventTargetValue);
  }

  const handleDescription = (eventTargetValue: string) => {
    setDescription(eventTargetValue);
  }

  const handleFileAddition = (e: any) => {
    setPdf(e.target.files![0]);
  }

  //----------------------------------------------------------------

  const handleModal = (boolean: boolean) => {
    setModal(boolean);
  }

  return {
    books,
    modal,
    handleModal,
    fetchBookData,

    title,
    description,
    pdf,
    handleTitle,
    handleDescription,
    handleFileAddition
  }
}