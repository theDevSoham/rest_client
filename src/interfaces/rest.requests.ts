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
	desc: string;
	request: IRequest;
}

interface IRestResponse{
	data: any;
	status: number;
	headers: any;
}

export type { IRestRequest, IRestResponse }