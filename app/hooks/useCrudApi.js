import { useState } from "react";

export default useCrudApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  //   const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);
    // if(response.ok) {setResult(true)} else {setResult(false)};

    setError(!response.ok);

    if (response.data != null) setData(response.data);
    // setData(response.data);
    //  console.log(response.data);
    //  return response;
  };
  // console.log(loading);

  return { data, error, loading, request };
};
