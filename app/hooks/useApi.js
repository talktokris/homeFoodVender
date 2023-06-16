import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const responce = await apiFunc(...args);
    setLoading(false);

    setError(!responce.ok);
    setData(responce.data);
    return responce;
  };

  return { data, error, loading, request };
};
