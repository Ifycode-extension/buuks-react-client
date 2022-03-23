export interface BooksObject {
  _id: string;
  title: string;
  description: string;
  pdf: string;
  request: Record<string, any>
}