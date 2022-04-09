import { useEffect, useState } from "react"

export const useLoader = ({ fixed }: { fixed: boolean }) => {
  const [loader, setLoader] = useState({
    text: '',
    style: ''
  });
  useEffect(() => {
    if (fixed) {
      setLoader({
        text: 'Loading...',
        style: 'fixed bottom-6 right-6 py-2 px-3 md:text-lg md:px-4 rounded border border-pink-800'
      });
    } else {
      setLoader({
        text: 'Fetching all books...',
        style: 'mt-4'
      });
    }
  }, [fixed]);

  return {
    loader
  }
}