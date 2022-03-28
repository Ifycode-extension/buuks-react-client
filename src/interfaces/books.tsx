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
  persistInstruction: boolean,
  persistFormBody: boolean,
  persistTitle: boolean,
  persistDescription: boolean,
  persistFile: boolean,
  title: string;
  buttonText: string;
  placeholderText: {
    title: string;
    description: string;
  }
  method: string;
  apiEndpoint: string;
  bookId: string | null;
}