import { ReactElement } from "react";
import Error from "../Error";
import Loader from "../Loader";

const BookForm = ({ auth, hook }: { auth: Record<string, any>, hook: Record<string, any> }): ReactElement => {
  return (
    <form method="post" encType="multipart/form-data" onSubmit={(e) => hook.fetchBookData(e, hook.modalForm.method, hook.modalForm.apiEndpoint, hook.modalForm.bookId)}>
      <div>
        <h1 className="font-medium leading-tight text-xl md:text-2xl mt-0 mb-8 text-pink-800 mb-2">
          {hook.modalForm.title}
        </h1>
        <input
          type="text"
          placeholder={hook.modalForm.placeholderText.title}
          name="title"
          value={hook.form.title}
          onChange={(e) => hook.handleInputChange(e)}
        />
        <input
          type="text"
          placeholder={hook.modalForm.placeholderText.description}
          name="description"
          value={hook.form.description}
          onChange={(e) => hook.handleInputChange(e)}
        />
        <input
          type="file"
          name="pdf"
          onChange={(e) => hook.handleInputChange(e)}
        />
        <button className="rounded bg-pink-800 text-white text-lg py-2 px-4 mt-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200">
          {hook.modalForm.buttonText}
        </button>
        {auth.isLoading && <Loader />}
        {auth.error && <Error />}
      </div>
    </form>
  );
}

export default BookForm;
