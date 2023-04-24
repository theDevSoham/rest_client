/* eslint-disable solid/reactivity */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Component, For, Show } from "solid-js";
import { methods, requests, setRequests } from "../states";
import AddIcon from "../assets/svgs/AddIcon";
import DelIcon from "../assets/svgs/DelIcon";

type RequestFormProps = {
  currentId: number;
};

const RequestForm: Component<RequestFormProps> = (props) => {
  const addHeaders = (e: Event): void => {
    e.preventDefault();
    setRequests((prev) =>
      prev.map((item, i) => {
        if (i === props.currentId) {
          const newItem = {
            ...item,
            request: {
              ...item.request,
              headers:
                item.request.headers !== undefined
                  ? [...item.request.headers, { key: "", value: "" }]
                  : [{ key: "", value: "" }],
            },
          };

          return newItem;
        }

        return item;
      })
    );
  };

  const delHeader = (e: Event, index: number): void => {
    e.preventDefault();
    setRequests((prev) =>
      prev.map((item, i) => {
        if (i === props.currentId) {
          const newItem = {
            ...item,
            request: {
              ...item.request,
              headers: item.request.headers?.filter((_, i) => i !== index),
            },
          };
          return newItem;
        }

        return item;
      })
    );
  };

  return (
    <div class="w-full h-full p-2 flex flex-wrap justify-between items-center">
      <section class="w-1/2 h-full p-3">
        <div class="w-full h-full bg-neutral-300 rounded-lg shadow-lg p-3 overflow-auto">
          <h1 class="text-2xl font-semibold">Request</h1>
          <div class="flex flex-row-reverse justify-between items-center">
            <form class="w-full h-full p-4">
              <div class="mb-4 mt-2">
                <label
                  for="name"
                  class="block mb-2 text-lg font-medium text-black-900 dark:text-white"
                >
                  Name of Request
                </label>
                <input
                  type="text"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Request"
                  required
                  value={requests()[props.currentId].name}
                />
              </div>

              <div class="mb-4 mt-2">
                <label
                  for="url"
                  class="block mb-2 text-lg font-medium text-black-900 dark:text-white"
                >
                  URL
                </label>
                <input
                  type="text"
                  id="url"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="URL"
                  required
                  value={requests()[props.currentId].request.url}
                />
              </div>

              <div class="mt-6 mb-4">
                <div class="flex justify-between items-center">
                  <label
                    for="first_name"
                    class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Headers
                  </label>

                  <button onClick={addHeaders}>
                    <AddIcon />
                  </button>
                </div>

                <Show
                  when={requests()[props.currentId].request.headers && requests()[props.currentId].request.headers.length > 0}
                  fallback="No headers"
                >
                  <For each={requests()[props.currentId].request.headers}>
                    {(header, i) => {
                      return (
                        <div class="grid gap-6 mb-6 md:grid-cols-3">
                          <div>
                            <label
                              for="key"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Key
                            </label>
                            <input
                              type="text"
                              id="key"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Enter Key"
                              required
                              value={header.key}
                            />
                          </div>
                          <div>
                            <label
                              for="value"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Value
                            </label>
                            <input
                              type="text"
                              id="value"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Enter value"
                              required
                              value={header.value}
                            />
                          </div>
                          <div>
                            <button onClick={(e: Event) => delHeader(e, i())}>
                              <DelIcon />
                            </button>
                          </div>
                        </div>
                      );
                    }}
                  </For>
                </Show>
              </div>

              <div class="mb-4 mt-2">
                <label
                  for="methods"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Method
                </label>
                <select
                  id="methods"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <For each={methods()}>
                    {(method) => {
                      if (
                        method === requests()[props.currentId].request.method
                      ) {
                        return (
                          <option selected value={method}>
                            {method}
                          </option>
                        );
                      }

                      return <option value={method}>{method}</option>;
                    }}
                  </For>
                </select>
              </div>

              {requests()[props.currentId].request.method === methods()[1] && <div class="mb-4 mt-2">
                <label
                  for="body"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Body
                </label>
                <textarea
                  id="body"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Body"
				  value={requests()[props.currentId].request.body === undefined ? "" : requests()[props.currentId].request.body}
                />
              </div>}
            </form>
          </div>
        </div>
      </section>
      <section class="w-1/2 h-full p-3">
        <div class="w-full h-full bg-neutral-300 rounded-lg shadow-lg"></div>
      </section>
    </div>
  );
};

export default RequestForm;
