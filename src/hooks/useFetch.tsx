import { useState } from 'react';
import { Forecast } from '../App.model';

const useFetch = () => {
  const [status, setStatus] = useState({ lodaing: false, error: '' });

  const sendRequest = async (
    url: string,
    transformData: (data: Forecast) => void
  ) => {
    setStatus({ lodaing: false, error: '' });
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      transformData(data);
    } catch (err) {
      setStatus({ lodaing: false, error: 'Error: ' + err });
    }
    setStatus((pv) => ({ ...pv, lodaing: false }));
  };

  return { sendRequest, status };
};

export default useFetch;
