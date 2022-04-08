import { ChangeEvent, useEffect, useState } from "react";
import { fetchOptions } from "../lib/books";
import { BooksObject, ModalForm, PostForm } from "../interfaces/books";
// import { AuthContainer } from "./useAuth";

export const useBooks = ({ user, isAuthenticated }: { user: any, isAuthenticated: boolean }): Record<string, any> => {
  // const auth = AuthContainer.useContainer();
  let [books, setBooks] = useState<BooksObject[]>([]);
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [booksLoading, setBooksLoading] = useState<boolean | null>(null);
  const initialForm = {
    title: '',
    description: '',
    pdf: ''
  };
  const initialModalform = {
    persistInstruction: false,
    persistFormBody: false,
    persistTitle: false,
    persistDescription: false,
    persistFile: false,
    title: '',
    buttonText: '',
    placeholderText: {
      title: '',
      description: ''
    },
    method: '',
    apiEndpoint: '',
    bookId: ''
  }
  const [form, setForm] = useState<PostForm>(initialForm);
  const [modalForm, setModalForm] = useState<ModalForm>(initialModalform);

    useEffect(() => {
    if (isAuthenticated) getBooks();
  }, [isAuthenticated]);

  const getBooks = () => fetchBookData(null, 'GET', `books/user/${user._id}`, null);

  const fetchBookData = async (e: any, method: string, apiEndpoint: string, bookId: string | null) => {
    if (method === 'POST' || method === 'PUT') e.preventDefault();
    // if (method === 'GET' && !auth.isLoading) setBooksLoading(false);
    // if (method !== 'GET' && !auth.isLoading) setBooksLoading(null);
    // trackProgress(true, false, '');
    let response: Response;
    response = await fetch(`${process.env.REACT_APP_BASE_URL}/${apiEndpoint}`, fetchOptions(method, form));
    const data = await response.json();
    console.log(apiEndpoint);
    if (response.ok) {
      // trackProgress(false, false, '');
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
      // if (method === 'POST') trackProgress(false, true, 'All fields are required. Also, only PDF files are allowed.');
      // if (method === 'PUT') trackProgress(false, true, 'Only PDF files are allowed.');
      // if (method === 'POST' && data[0].code === 'too_small') trackProgress(false, true, `${data[0].message}. All fields are required. Also, only PDF files are allowed.`);
    }
    if (response.status === 401) {
      // trackProgress(false, true, 'Your session has expired, please login again');
      // auth.setUnAuthorizedError(true);
      // const removeError = () => auth.setUnAuthorizedError(false);
      // const interval = setInterval(removeError, 200);
      // const removeInterval = () => {
      //   auth.handleLogout();
      //   clearInterval(interval);
      // }
      // setTimeout(removeInterval, 200);
    }
    console.log('data: ', data);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, checkboxString: string) => { // checkboxString: string |  null
    const { name, value, files, checked } = e.target;
    if (name === 'title' || name === 'description') setForm({ ...form, [name]: value } as Pick<PostForm, keyof PostForm>);
    if (name === 'pdf') setForm({ ...form, [name]: files![0] } as Pick<PostForm, keyof PostForm>);
    if (name === 'checkbox') {
      if (checked) {
        setModalForm({ ...modalForm, [checkboxString]: true });
      } else {
        setModalForm({ ...modalForm, [checkboxString]: false });
      }
    }
    // trackProgress(false, false, '');
  }

  // const trackProgress = (loading: boolean, errBool: boolean, errString: string) => {
  //   auth.setIsLoading(loading);
  //   auth.handleError(errBool, errString);
  // }

  const handleModal = (boolean: boolean) => {
    setModal(boolean);
    if (!boolean) {
      setModalForm(initialModalform);
      // auth.handleError(false, '');
      resetForm();
    }
  }

  const handlePostRequestForm = (boolean: boolean, operation: string, bookId: string | null) => {
    handleModal(boolean);
    if (operation === 'add') {
      setModalForm({
        persistInstruction: false,
        persistFormBody: true,
        persistTitle: true,
        persistDescription: true,
        persistFile: true,
        title: 'New Book - Form',
        buttonText: 'Submit new book',
        placeholderText: {
          title: 'New book title',
          description: 'New book description'
        },
        method: 'POST',
        apiEndpoint: 'books',
        bookId: bookId
      });
    }
    if (operation === 'update') {
      setModalForm({
        persistInstruction: true,
        persistFormBody: true,
        persistTitle: false,
        persistDescription: false,
        persistFile: false,
        title: 'Update Book - Form',
        buttonText: 'Update book',
        placeholderText: {
          title: 'Update book title',
          description: 'Update book description'
        },
        method: 'PUT',
        apiEndpoint: `books/${bookId}`,
        bookId: bookId
      });
      const cardInfo = books.filter((book) => book._id === bookId)[0];
      setForm({
        title: cardInfo.title,
        description: cardInfo.description,
        pdf: ''
      })
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
    getBooks,
    handleInputChange,
    handlePostRequestForm,
    modalForm,
    booksLoading,
    success,
    successMessage
  }
}







// import { ChangeEvent, useState } from "react";
// import { fetchOptions } from "../lib/books";
// import { BooksObject, ModalForm, PostForm } from "../interfaces/books";
// import { AuthContainer } from "./useAuth";

// export const useBooks = (): Record<string, any> => {
//   const auth = AuthContainer.useContainer();
//   let [books, setBooks] = useState<BooksObject[]>([]);
//   const [modal, setModal] = useState(false);
//   const [success, setSuccess] = useState<boolean>(false);
//   const [successMessage, setSuccessMessage] = useState<string>('');
//   const [booksLoading, setBooksLoading] = useState<boolean | null>(null);
//   const initialForm = {
//     title: '',
//     description: '',
//     pdf: ''
//   };
//   const initialModalform = {
//     persistInstruction: false,
//     persistFormBody: false,
//     persistTitle: false,
//     persistDescription: false,
//     persistFile: false,
//     title: '',
//     buttonText: '',
//     placeholderText: {
//       title: '',
//       description: ''
//     },
//     method: '',
//     apiEndpoint: '',
//     bookId: ''
//   }
//   const [form, setForm] = useState<PostForm>(initialForm);
//   const [modalForm, setModalForm] = useState<ModalForm>(initialModalform);

//   const fetchBookData = async (e: any, method: string, apiEndpoint: string, bookId: string | null) => {
//     if (method === 'POST' || method === 'PUT') e.preventDefault();
//     if (method === 'GET' && !auth.isLoading) setBooksLoading(false);
//     if (method !== 'GET' && !auth.isLoading) setBooksLoading(null);
//     trackProgress(true, false, '');
//     let response: Response;
//     response = await fetch(`${process.env.REACT_APP_BASE_URL}/${apiEndpoint}`, fetchOptions(method, form));
//     const data = await response.json();
//     if (response.ok) {
//       trackProgress(false, false, '');
//       if (method === 'GET') setBooks(data.books);
//       if (method === 'DELETE') setBooks(books.filter(book => book._id !== bookId));
//       if (method === 'POST') {
//         books.unshift(data.book);
//         handleModal(false);
//       }
//       if (method === 'PUT') {
//         const updated = books.map((book) => {
//           if (book._id === bookId) return { ...book, ...data.book };
//           return book;
//         });
//         setBooks(updated);
//         handleModal(false);
//       }
//       if (method !== 'GET') {
//         setSuccessMessage(data.message)
//         setSuccess(true);
//         const removeSuccessMsg = () => setSuccess(false);
//         const interval = setInterval(removeSuccessMsg, 2000);
//         const removeInterval = () => clearInterval(interval);
//         setTimeout(removeInterval, 2000);
//       }
//       resetForm();
//     }
//     if (response.status === 400) {
//       if (method === 'POST') trackProgress(false, true, 'All fields are required. Also, only PDF files are allowed.');
//       if (method === 'PUT') trackProgress(false, true, 'Only PDF files are allowed.');
//       if (method === 'POST' && data[0].code === 'too_small') trackProgress(false, true, `${data[0].message}. All fields are required. Also, only PDF files are allowed.`);
//     }
//     if (response.status === 401) {
//       trackProgress(false, true, 'Your session has expired, please login again');
//       auth.setUnAuthorizedError(true);
//       const removeError = () => auth.setUnAuthorizedError(false);
//       const interval = setInterval(removeError, 200);
//       const removeInterval = () => {
//         auth.handleLogout();
//         clearInterval(interval);
//       }
//       setTimeout(removeInterval, 200);
//     }
//     // console.log('data: ', data);
//   }

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>, checkboxString: string) => { // checkboxString: string |  null
//     const { name, value, files, checked } = e.target;
//     if (name === 'title' || name === 'description') setForm({ ...form, [name]: value } as Pick<PostForm, keyof PostForm>);
//     if (name === 'pdf') setForm({ ...form, [name]: files![0] } as Pick<PostForm, keyof PostForm>);
//     if (name === 'checkbox') {
//       if (checked) {
//         setModalForm({ ...modalForm, [checkboxString]: true });
//       } else {
//         setModalForm({ ...modalForm, [checkboxString]: false });
//       }
//     }
//     trackProgress(false, false, '');
//   }

//   const trackProgress = (loading: boolean, errBool: boolean, errString: string) => {
//     auth.setIsLoading(loading);
//     auth.handleError(errBool, errString);
//   }

//   const handleModal = (boolean: boolean) => {
//     setModal(boolean);
//     if (!boolean) {
//       setModalForm(initialModalform);
//       auth.handleError(false, '');
//       resetForm();
//     }
//   }

//   const handlePostRequestForm = (boolean: boolean, operation: string, bookId: string | null) => {
//     handleModal(boolean);
//     if (operation === 'add') {
//       setModalForm({
//         persistInstruction: false,
//         persistFormBody: true,
//         persistTitle: true,
//         persistDescription: true,
//         persistFile: true,
//         title: 'New Book - Form',
//         buttonText: 'Submit new book',
//         placeholderText: {
//           title: 'New book title',
//           description: 'New book description'
//         },
//         method: 'POST',
//         apiEndpoint: 'books',
//         bookId: bookId
//       });
//     }
//     if (operation === 'update') {
//       setModalForm({
//         persistInstruction: true,
//         persistFormBody: true,
//         persistTitle: false,
//         persistDescription: false,
//         persistFile: false,
//         title: 'Update Book - Form',
//         buttonText: 'Update book',
//         placeholderText: {
//           title: 'Update book title',
//           description: 'Update book description'
//         },
//         method: 'PUT',
//         apiEndpoint: `books/${bookId}`,
//         bookId: bookId
//       });
//       const cardInfo = books.filter((book) => book._id === bookId)[0];
//       setForm({
//         title: cardInfo.title,
//         description: cardInfo.description,
//         pdf: ''
//       })
//     }
//   }

//   const resetForm = () => {
//     setForm(initialForm);
//   }

//   return {
//     books,
//     modal,
//     form,
//     handleModal,
//     fetchBookData,
//     handleInputChange,
//     handlePostRequestForm,
//     modalForm,
//     booksLoading,
//     success,
//     successMessage
//   }
// }