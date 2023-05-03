interface IRequest{
	method: string;
	url: string;
	headers?: {
		[key: string]: string;
	}[];
	body?: any;
}

interface IRestRequest{
	id: string;
	name: string;
	request: IRequest;
}

interface IResponse{
	data: any;
	status: number;
	headers: any;
}

interface IRestResponse{
	id: string;
	request_id: string;
	duration: number;
	size: number;
	response: IResponse;
}

export type { IRestRequest, IRestResponse }