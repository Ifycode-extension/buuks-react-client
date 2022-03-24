import { ChangeEvent, useState } from "react";
import { fetchOptions } from "../lib/books";
import { BooksObject, ModalForm, PostForm } from "../interfaces/books";
import { AuthContainer } from "./useAuth";

export const useBooks = () => {
  const auth = AuthContainer.useContainer();
  let [books, setBooks] = useState<BooksObject[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<PostForm>({
    title: '',
    description: '',
    pdf: ''
  });
  const [modalForm, setModalForm] = useState<ModalForm>({
    title: '',
    buttonText: '',
    method: '',
    endpoint: '',
    bookId: ''
  });

  const fetchBookData = async (e: any, method: string, endpoint: string, bookId: string | null) => {
    if (method === 'POST' || method === 'PUT') e.preventDefault();
    console.log('loading...');
    let response: Response;
    response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, fetchOptions(method, form));
    if (response.ok) {
      const data = await response.json();
      if (method === 'GET') setBooks(data.books);
      if (method === 'DELETE') setBooks(books.filter(book => book._id !== bookId));
      if (method === 'POST') {
        books.unshift(data.book);
        handleModal(false);
      }
      if (method === 'PUT') {
        const updated = books.map((book) => {
          if (book._id === bookId) return { ...book, ...data.book };
          return book;
        });
        setBooks(updated);
        handleModal(false);
      }
      console.log('data: ', data);
    }
    if (response.status === 401) {
      auth.handleLogout();
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name !== 'pdf') setForm({ ...form, [name]: value } as Pick<PostForm, keyof PostForm>);
    if (name === 'pdf') setForm({ ...form, [name]: files![0] } as Pick<PostForm, keyof PostForm>);
  }

  const handleModal = (boolean: boolean) => {
    setModal(boolean);
  }

  const handlePostRequestForm = (boolean: boolean, operation: string, bookId: string | null) => {
    handleModal(boolean);
    if (operation === 'add') {
      setModalForm({
        title: 'New Book - Form',
        buttonText: 'Submit new book',
        method: 'POST',
        endpoint: 'books',
        bookId: bookId
      });
    }
    if (operation === 'update') {
      setModalForm({
        title: 'Update Book - Form',
        buttonText: 'Update book',
        method: 'PUT',
        endpoint: `books/${bookId}`,
        bookId: bookId
      });
    }
  }

  return {
    books,
    modal,
    form,
    handleModal,
    fetchBookData,
    handleInputChange,
    handlePostRequestForm,
    modalForm
  }
}