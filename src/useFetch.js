import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal : abortCont.signal })
            .then((response) => {
                if (!response.ok){
                    throw Error('Could not fetch data');
                }
                return response.json();
            }).then((response) => {
                setData(response);
                // console.log(response.blogs);
                setIsPending(false);
                setError(null);
            }).catch((err) => {
                // console.log('fetch failed ', err.message);
                if (err.name === 'AbortError'){
                    console.log('fetch aborted');
                } else {
                    setError(err.message);
                    setIsPending(false);
                }
            });
        }, 1000);

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error};
}

export default useFetch;