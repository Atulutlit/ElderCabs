import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const useFetch = (path) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}${path}`, {
            headers: {
                authorization: `bearer ${API_KEY}`
            }
        })
            .then(res => res.json())
            .then(resData => {
                setLoading(false);
                setData(resData);
            })
            .catch(err => {
                console.error(err);
                setError(true);
            })
    }, [path]);

    return { loading, error, data };
}

export default useFetch;