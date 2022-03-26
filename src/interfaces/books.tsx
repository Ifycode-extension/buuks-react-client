export interface BooksObject {
  _id: string;
  title: string;
  description: string;
  pdf: string;
  request: Record<string, any>
}

export interface PostForm {
  title: string;
  description: string;
  pdf: File | string;
}

export interface ModalForm {
  title: string;
  buttonText: string;
  method: string;
  apiEndpoint: string;
  bookId: string | null;
}