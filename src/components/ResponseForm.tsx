import { Component, For, Show, createEffect, createSignal } from "solid-js";
import { IRestRequest, IRestResponse } from "../interfaces/rest.requests";
import { responses } from "../states";

type ResponseFormProps = {
  currentId: IRestRequest["id"];
};

const staticResponse: IRestResponse = {
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
    if (
      responses().some((response) => response.request_id === props.currentId)
    ) {
      setResponse(
        responses().find((response) => response.request_id === props.currentId)
      );
    } else {
      setResponse(staticResponse);
    }
  });

  return (
    <div class="w-full h-full bg-neutral-300 rounded-lg shadow-lg p-3 overflow-auto">
      <h1 class="text-2xl font-semibold">Response</h1>
      <div class="flex flex-row-reverse justify-between items-center w-full h-9/10 overflow-auto">
        <form class="w-full h-full p-4">
          <div class="mb-4 mt-2">
            <label
              for="status"
              class="block mb-2 text-lg font-medium text-black-900 dark:text-white"
            >
              Status
            </label>
            <input
              type="text"
              id="status"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-green-600 dark:placeholder-white-400 dark:text-white"
              classList={{
                "bg-red-400": response()?.response.status.toString() !== "200",
                "bg-green-400":
                  response()?.response.status.toString() === "200",
                "border-red-700":
                  response()?.response.status.toString() !== "200",
                "border-green-700":
                  response()?.response.status.toString() === "200",
              }}
              placeholder="Request"
              required
              value={response()?.response.status.toString() || "404"}
              disabled
            />
          </div>
          <div class="mb-4 mt-2">
            <label
              for="headers"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Headers
            </label>
            <textarea
              id="headers"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Headers"
              disabled
            >
              <Show
                when={response()?.response.headers.length > 0}
                fallback={<h1 class="text-lg text-gray-700">No Headers</h1>}
              >
                <For each={response()?.response.headers}>
                  {(header) => `${header.key}: ${header.value}\n\n`}
                </For>
              </Show>
            </textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResponseForm;
