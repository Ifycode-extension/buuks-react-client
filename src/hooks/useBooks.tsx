import { ChangeEvent, useState } from "react";
import { BooksObject, PostForm } from "../interfaces/books";
// import { AuthContainer } from "./useAuth";
export const useBooks = () => {
  // const auth = AuthContainer.useContainer();
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
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('pdf', form.pdf as File);
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