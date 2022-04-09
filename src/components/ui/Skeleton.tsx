import { ReactElement } from "react";
import { AuthContainer } from "../../hooks/useAuth";

const Skeleton = (): ReactElement | null => {
  const { isLoading, getRequest } = AuthContainer.useContainer();
  if (isLoading && getRequest) {
    return (
      <div className="cursor-progress grid lg:grid-cols-3 md:grid-cols-2 gap-y-6 md:gap-6 my-6">
        {
          [...Array(6)].map(((book: any, index: number) => {
            return (
              <div key={index} className="grid grid-rows-1 shadow-sm">
                <div className="bg-white rounded-tl rounded-tr p-4 border-x border-t border-gray-300">
                  <h3 className="appcss-pulse appcss-wordbreak font-medium leading-tight text-xl mt-0 mb-2 text-gray-300 bg-gray-300 rounded w-5/6 mb-2">Skeleton title</h3>
                  <p className="appcss-pulse appcss-wordbreak mb-1 text-sm text-gray-300 bg-gray-300 rounded w-3/4">Skeleton description text</p>
                  <p className="appcss-pulse underline decoration-gray-300 text-white bg-white rounded w-fit">Preview or download PDF</p>
                </div>
                <div className="flex">
                  <div className="flex justify-center flex-grow bg-white text-gray-300 p-2 border border-gray-300 active:shadow-lg mouse shadow transition ease-in duration-100">
                      <span className="appcss-pulse block text-sm text-gray-300 bg-gray-300 min-w-fit rounded">Skeleton</span>
                  </div>
                  <div className="flex justify-center flex-grow bg-gray-300 text-white p-2 border border-transparent active:shadow-lg mouse shadow transition ease-in duration-100">
                      <span className="appcss-pulse block text-sm text-white bg-white min-w-fit rounded">Skeleton</span>
                  </div>
                </div>
              </div>
            )
          }))
        }
      </div>
    )
  }
  return null;
}

export default Skeleton;