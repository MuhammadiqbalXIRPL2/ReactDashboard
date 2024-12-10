import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:8000/api/';

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return { data, error, loading, refetch: fetchData };
};

export default useFetch;
