"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import instance from "../configs/axiosconfig";

interface ExtraInfo {
  totalPages?: number;
}

const useFetchList = (url: string, query: any) => {
  const [data, setData] = useState([]);
  const [extraInfo, setExtraInfo] = useState<ExtraInfo>({});

  useEffect(() => {
    const fetchData = async () => {
      const queryString = new URLSearchParams(query).toString();

      const res = await axios.get(
        `${instance.defaults.baseURL}${url}?${queryString}`
      );

      if (res.status !== 200) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.data;
      setData(data.data);
      setExtraInfo(data.extraInfo);
    };
    fetchData();
  }, [url, query]);

  return { data, extraInfo };
};

export default useFetchList;
