import { ChangeEvent, useState } from "react";
import { fetchOptions } from "../lib/books";
import { BooksObject, ModalForm, PostForm } from "../interfaces/books";
import { AuthContainer } from "./useAuth";

export const useBooks = () => {
  const auth = AuthContainer.useContainer();
  let [books, setBooks] = useState<BooksObject[]>([]);
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showBooks, setShowBooks] = useState<boolean | null>(null);
  const initialForm = {
    title: '',
    description: '',
    pdf: ''
  }
  const [form, setForm] = useState<PostForm>(initialForm);
  const [modalForm, setModalForm] = useState<ModalForm>({
    title: '',
    buttonText: '',
    method: '',
    endpoint: '',
    bookId: ''
  });

  const fetchBookData = async (e: any, method: string, endpoint: string, bookId: string | null) => {
    if (method === 'POST' || method === 'PUT') e.preventDefault();
    if (method === 'GET' && !auth.isLoading) setShowBooks(false);
    if (method !== 'GET' && !auth.isLoading) setShowBooks(null);
    trackProgress(true, false, '');
    let response: Response;
    response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, fetchOptions(method, form));
    const data = await response.json();
    if (response.ok) {
      trackProgress(false, false, '');
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
      if (method !== 'GET') {
        setSuccessMessage(data.message)
        setSuccess(true);
        const removeSuccessMsg = () => setSuccess(false);
        const interval = setInterval(removeSuccessMsg, 2000);
        const removeInterval = () => clearInterval(interval);
        setTimeout(removeInterval, 2000);
      }
      resetForm();
    }
    if (response.status === 400) {
      if (method === 'POST') trackProgress(false, true, 'All fields are required. Also, only PDF files are allowed.');
      if (method === 'PUT') trackProgress(false, true, 'Only PDF files are allowed.');
      if (method === 'POST' && data[0].code === 'too_small') trackProgress(false, true, `${data[0].message}. All fields are required. Also, only PDF files are allowed.`);
    }
    if (response.status === 401) {
      trackProgress(false, true, 'Your session has expired, please login again');
      auth.setUnAuthorizedError(true);
      const removeError = () => auth.setUnAuthorizedError(false);
      const interval = setInterval(removeError, 200);
      const removeInterval = () => {
        auth.handleLogout();
        clearInterval(interval);
      }
      setTimeout(removeInterval, 200);
    }
    // console.log('data: ', data);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name !== 'pdf') setForm({ ...form, [name]: value } as Pick<PostForm, keyof PostForm>);
    if (name === 'pdf') setForm({ ...form, [name]: files![0] } as Pick<PostForm, keyof PostForm>);
    trackProgress(false, false, '');
  }

  const trackProgress = (loading: boolean, errBool: boolean, errString: string) => {
    auth.setIsLoading(loading);
    auth.handleError(errBool, errString);
  }

  const handleModal = (boolean: boolean) => {
    setModal(boolean);
    if (!boolean) {
      auth.handleError(false, '');
      resetForm();
    }
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

  const resetForm = () => {
    setForm(initialForm);
  }

  return {
    books,
    modal,
    form,
    handleModal,
    fetchBookData,
    handleInputChange,
    handlePostRequestForm,
    modalForm,
    showBooks,
    success,
    successMessage
  }
}