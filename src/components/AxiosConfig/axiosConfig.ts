import axios, { AxiosInstance, CancelTokenSource } from "axios";

const axiosInstance: AxiosInstance = axios.create();
export { axiosInstance };

export const cancelToken = axios.CancelToken;
export const source: CancelTokenSource = axios.CancelToken.source();

export const cancelRequest = (message: string) => {
	source.cancel(message);
};