import React, { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface Props {
  url: string;
  method: 'GET' | 'POST';
  body: Record<string, any>;
  onSuccess?: (data: any) => void;
}

const useRequest = ({ url, method, body, onSuccess }: Props) => {
  const [errors, setErrors] = useState<any>(null);
  let axiosRequest: <T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ) => Promise<R>;

  switch (method) {
    case 'GET':
      axiosRequest = axios.get;
      break;
    case 'POST':
      axiosRequest = axios.post;
      break;
  }

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axiosRequest(url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      setErrors(
        <div>
          <ul>
            {error.response?.data.errors.map((err: any) => {
              return <li key={err.message}>{err.message}</li>;
            })}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};

export default useRequest;
