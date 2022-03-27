import { ReactElement } from "react";
import Error from "../Error";
import Loader from "../Loader";

const BookForm = ({ auth, hook }: { auth: Record<string, any>, hook: Record<string, any> }): ReactElement => {
  const atLeastOneCheckboxIsTicked = hook.modalForm.persistTitle || hook.modalForm.persistDescription || hook.modalForm.persistFile;
  return (
    <form method="post" encType="multipart/form-data" onSubmit={(e) => hook.fetchBookData(e, hook.modalForm.method, hook.modalForm.apiEndpoint, hook.modalForm.bookId)}>
      <div>
        <h1 className="font-medium leading-tight text-xl md:text-2xl mt-0 mb-8 text-pink-800 mb-2">
          {hook.modalForm.title}
        </h1>
        {hook.modalForm.persistInstruction && (
          <div>
            <p className="mb-3">Tick the checkboxes below to show the input field(s) you wish to edit:</p>
            <div className="mb-6">
              <span>
                <span>Title</span>
                <input
                  className="ml-2 mr-3 scale-110"
                  type="checkbox"
                  name="checkbox"
                  onChange={(e) => hook.handleInputChange(e, 'persistTitle')}
                />
              </span>
              <span>
                <span>Description</span>
                <input
                  className="ml-2 mr-3 scale-110"
                  type="checkbox"
                  name="checkbox"
                  onChange={(e) => hook.handleInputChange(e, 'persistDescription')}
                />
              </span>
              <span>
                <span>File upload</span>
                <input
                  className="ml-2 mr-3 scale-110"
                  type="checkbox"
                  name="checkbox"
                  onChange={(e) => hook.handleInputChange(e, 'persistFile')}
                />
              </span>
            </div>
            {!atLeastOneCheckboxIsTicked &&
              <div className="py-6 border border-gray-400 rounded">
                <p className="w-11/12 mx-auto">Input fields and button will show up here when you tick any of the checkboxes above</p>
              </div>
            }
          </div>
        )}
        {(hook.modalForm.persistFormBody && atLeastOneCheckboxIsTicked) && (
          <div>
            {hook.modalForm.persistTitle &&
              <input
                type="text"
                placeholder={hook.modalForm.placeholderText.title}
                name="title"
                value={hook.form.title}
                onChange={(e) => hook.handleInputChange(e, null)}
              />
            }

            {hook.modalForm.persistDescription &&
              <input
                type="text"
                placeholder={hook.modalForm.placeholderText.description}
                name="description"
                value={hook.form.description}
                onChange={(e) => hook.handleInputChange(e, null)}
              />
            }
            {hook.modalForm.persistFile &&
              <input
                type="file"
                name="pdf"
                onChange={(e) => hook.handleInputChange(e, null)}
              />
            }
            <button className="rounded bg-pink-800 text-white text-lg py-2 px-4 mt-4 hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-200">
              {hook.modalForm.buttonText}
            </button>
          </div>
        )}
        {auth.isLoading && <Loader />}
        {auth.error && <Error />}
      </div>
    </form>
  );
}

export default BookForm;
