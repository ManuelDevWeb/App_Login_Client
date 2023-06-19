import axios from "axios";
import { useEffect, useState } from "react";

// Helpers
import { getUsername } from "../helpers/helper";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Custom hook to fetch data from the server
const useFetch = (query) => {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData({
          isLoading: true,
          apiData: undefined,
          status: null,
          serverError: null,
        });

        const { username } = !query ? await getUsername() : "";

        const { data, status } = !query
          ? await axios.get(`/api/v1/user/${username}`)
          : await axios.get(`/api/v1${query}`);

        if (status === 200) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: data,
            status,
          }));
        }

        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
        // setData({
        //   isLoading: false,
        //   apiData: undefined,
        //   status: null,
        //   serverError: error,
        // });
      }
    };

    fetchData();
  }, [query]);

  return [getData, setData];
};

export { useFetch };
