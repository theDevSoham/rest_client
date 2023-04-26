import { Component, createEffect, createSignal } from "solid-js";
import { IRestRequest, IRestResponse } from "../interfaces/rest.requests";
import { responses } from "../states";

type ResponseFormProps = {
	currentId: IRestRequest["id"];
};

const staticResponse:IRestResponse = {
	id: "none",
	request_id: "none",
	response: {
		status: 400,
		headers: [],
		data: null,
	},
};

const ResponseForm: Component<ResponseFormProps> = (props) => {

	const [response, setResponse] = createSignal<IRestResponse>();

	createEffect(() => {
		if(responses().some((response) => response.request_id === props.currentId)) {
			setResponse(responses().find((response) => response.request_id === props.currentId));
		} else {
			setResponse(staticResponse);
		}
	});

  return (
    <div class="w-full h-full bg-neutral-300 rounded-lg shadow-lg p-3 overflow-auto">
      <h1 class="text-2xl font-semibold">Response of {props.currentId}</h1>
    </div>
  );
};

export default ResponseForm;
