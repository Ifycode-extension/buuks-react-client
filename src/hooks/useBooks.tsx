import { ChangeEvent, useState } from "react";
import { fetchOptions } from "../lib/books";
import { BooksObject, PostForm } from "../interfaces/books";
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

  const fetchBookData = async (e: any, method: string, endpoint: string, bookId: string | null) => {
    if (method === 'POST' /* or 'UPDATE' */) e.preventDefault();
    console.log('loading...');
    let response: Response;
    response = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, fetchOptions(method, form));
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

  return {
    books,
    modal,
    form,
    handleModal,
    fetchBookData,
    handleInputChange
  }
}