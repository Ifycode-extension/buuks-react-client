import { Fragment, ReactElement } from 'react'
import { AuthContainer } from '../hooks/useAuth';

const BooksBody= ({ hook }: { hook: Record<string, any> }): ReactElement => {
  const auth = AuthContainer.useContainer();
  return (
    <Fragment>
      {(!hook.showBooks) &&
        (<div className={hook.books.length ? 'grid lg:grid-cols-3 md:grid-cols-2 gap-y-6 md:gap-6 my-6' : 'mt-4'}>
          {
            hook.books.length ? hook.books.map(((book: any) => {
              return (
                <div key={book._id} className="grid grid-rows-1 shadow-sm">
                  <div className="bg-white rounded-tl rounded-tr p-4 border-x border-t border-gray-300">
                    <h3 className="appcss-wordbreak font-medium leading-tight text-xl md:text-2xl mt-0 mb-2 text-pink-700 mb-2">{book.title}</h3>
                    <p className="appcss-wordbreak mb-1">{book.description}</p>
                    <a
                      className="text-blue-700 underline"
                      href={book.pdf}
                      target="_blank"
                      rel="noopener noreferrer">
                      Preview or download PDF</a>
                  </div>
                  <div className="flex">
                    <button className="flex-grow bg-white text-pink-800 p-2 border border-pink-900 hover:bg-pink-700 hover:text-white active:shadow-lg mouse shadow transition ease-in duration-100"
                      onClick={(e) => hook.handlePostRequestForm(true, 'update', book._id)}>
                      Edit
                    </button>
                    <button
                      className="flex-grow bg-pink-800 text-white p-2 border border-transparent hover:bg-pink-700 active:shadow-lg mouse shadow transition ease-in duration-100"
                      onClick={(e) => hook.fetchBookData(null, 'DELETE', `books/${book._id}`, book._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )
            })) :
              <div className={auth.isLoading ? 'hidden' : ''}>You have not added any book yet. Click on the add button to begin.</div>
          }
        </div>
        )}
    </Fragment>
  )
}

export default BooksBody;