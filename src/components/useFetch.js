import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        // console.log(res);
        if (!res.ok) {
          throw Error("Error! Could not fetch the data from the URL");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setData(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsLoading(false);
          setError(error.message);
        }
      });

    return () => {
      abortCont.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
