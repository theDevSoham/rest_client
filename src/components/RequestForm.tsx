/* eslint-disable solid/reactivity */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Component, For, Show, createEffect, createSignal } from "solid-js";
import { methods, requests, setRequests } from "../states";
import AddIcon from "../assets/svgs/AddIcon";
import DelIcon from "../assets/svgs/DelIcon";
import DeleteAlert from "../pages/DeleteAlert";

type RequestFormProps = {
  currentId: number;
};

type ChangeType = "name" | "url" | "key" | "value" | "method" | "body";

type HeaderIndex<T extends ChangeType> = T extends "key" | "value"
  ? number
  : undefined;

const RequestForm: Component<RequestFormProps> = (props) => {
  const [showDelAlert, setShowDelAlert] = createSignal<boolean>(false);

  const addHeaders = (e: Event): void => {
    e.preventDefault();
    setRequests((prev) =>
      prev.map((item, i) => {
        if (i === props.currentId) {
          const newItem = {
            ...item,
            request: {
              ...item?.request,
              headers:
                item?.request.headers !== undefined
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

  const reqDeleteHeader = (e: Event): void => {
    e.preventDefault();
    setShowDelAlert(true);
  };

  const getChoice = (choice: boolean, index: number): void => {
    setShowDelAlert(false);

    if (choice) {
      setRequests((prev) =>
        prev.map((item, i) => {
          if (i === props.currentId) {
            const newItem = {
              ...item,
              request: {
                ...item?.request,
                headers: item?.request.headers?.filter((_, i) => i !== index),
              },
            };
            return newItem;
          }

          return item;
        })
      );
    } else {
      return;
    }
  };

  const changeRequest = (
    e: Event,
    type: ChangeType,
    id: HeaderIndex<ChangeType>
  ): void => {
    const target = e.target as HTMLInputElement;
    setRequests((prev) =>
      prev.map((item, i) => {
        if (i === props.currentId) {
          const newItem = {
            ...item,
            name: type === "name" ? target.value : item?.name,
            request: {
              ...item?.request,
              url: type === "url" ? target.value : item?.request.url,
              method: type === "method" ? target.value : item?.request.method,
              body: type === "body" ? target.value : item?.request.body,
              headers: item?.request.headers?.map((header, i) => {
                if (i === id) {
                  return {
                    key: type === "key" ? target.value : header.key,
                    value: type === "value" ? target.value : header.value,
                  };
                }
                return header;
              }),
            },
          };
          return newItem;
        }

        return item;
      })
    );
  };

  const sendRequest = (e: Event): void => {
    e.preventDefault();
    alert(requests()[props.currentId]?.request);
  };

  createEffect(() => {
    console.log(requests());
    localStorage.setItem("requests", JSON.stringify(requests()));
  });

  return (
    <Show
      when={requests()[props.currentId]?.name !== undefined}
      fallback={
        <div class="w-full h-full px-5 py-5">
          <div class="w-full h-full bg-neutral-300 rounded-lg shadow-lg p-3 flex justify-center items-center">
            <p class="text-lg text-gray-700">
              Select a request from the left panel 👈
            </p>
          </div>
        </div>
      }
    >
      <div class="w-full h-full p-2 flex flex-wrap justify-between items-center">
        <section class="w-1/2 h-full p-3">
          <div class="w-full h-full bg-neutral-300 rounded-lg shadow-lg p-3 overflow-auto">
            <h1 class="text-2xl font-semibold">Request</h1>
            <div class="flex flex-row-reverse justify-between items-center w-full h-9/10">
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
                    value={requests()[props.currentId]?.name}
                    onChange={(e: Event) => changeRequest(e, "name", undefined)}
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
                    value={requests()[props.currentId]?.request.url}
                    onChange={(e: Event) => changeRequest(e, "url", undefined)}
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
                    when={
                      requests().length > 0 &&
                      requests()[props.currentId]?.request.headers &&
                      requests()[props.currentId]?.request.headers.length > 0
                    }
                    fallback="No headers"
                  >
                    <For each={requests()[props.currentId]?.request.headers}>
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
                                onChange={(e: Event) =>
                                  changeRequest(e, "key", i())
                                }
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
                                onChange={(e: Event) =>
                                  changeRequest(e, "value", i())
                                }
                              />
                            </div>
                            <div>
                              <button
                                onClick={(e: Event) => reqDeleteHeader(e)}
                              >
                                <DelIcon />
                              </button>
                              {showDelAlert() && (
                                <DeleteAlert
                                  toDelete={i()}
                                  onChoose={getChoice}
                                  body={{
                                    topic: "Delete Header",
                                    message:
                                      "Are you sure you want to delete this header? This action cannot be undone.",
                                    confirmOption: "Delete",
                                    rejectionOption: "Cancel",
                                  }}
                                />
                              )}
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
                    onChange={(e: Event) =>
                      changeRequest(e, "method", undefined)
                    }
                  >
                    <For each={methods()}>
                      {(method) => {
                        if (
                          method === requests()[props.currentId]?.request.method
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

                {requests()[props.currentId]?.request.method ===
                  methods()[1] && (
                  <div class="mb-4 mt-2">
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
                      value={
                        requests()[props.currentId]?.request.body === undefined
                          ? ""
                          : requests()[props.currentId]?.request.body
                      }
                      onChange={(e: Event) =>
                        changeRequest(e, "body", undefined)
                      }
                    />
                  </div>
                )}

                <div class="mb-4 mt-2">
                  <button
                    type="button"
                    class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={sendRequest}
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <section class="w-1/2 h-full p-3">
          <div class="w-full h-full bg-neutral-300 rounded-lg shadow-lg"></div>
        </section>
      </div>
    </Show>
  );
};

export default RequestForm;
