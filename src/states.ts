import { createSignal } from "solid-js";
import { IRestRequest, IRestResponse } from "./interfaces/rest.requests";

const [requests, setRequests] = createSignal<IRestRequest[]>([
  {
    id: "1",
    name: "Get Sample",
    request: {
      method: "GET",
      url: "https://jsonplaceholder.com/posts",
    },
  },
  {
    id: "2",
    name: "Get Sample 2",
    request: {
      method: "POST",
      url: "https://jsonplaceholder.com/posts",
      body: JSON.stringify({
        title: "foo",
        body: "bar",
      }),
    },
  },
]);

const [responses, setResponses] = createSignal<IRestResponse[]>([
  {
    id: "1",
    request_id: "1",
    duration: 0,
    size: 0,
    response: {
      data: {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      },
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-powered-by": "Express",
      },
    },
  },
  {
    id: "2",
    request_id: "2",
    duration: 0,
    size: 0,
    response: {
      data: {
        userId: 2,
        id: 2,
        title: "lorem ipsum dolor sit amet consectetur adipisicing elit",
      },
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-powered-by": "Express",
      },
    },
  },
]);

const [selected, setSelected] = createSignal<number>(0);
const [methods] = createSignal<string[]>(["GET", "POST", "PUT", "DELETE"]);
const [currentId, setCurrentId] = createSignal<number>(0);
const [isLoading, setIsLoading] = createSignal<boolean>(false);

export {
  requests,
  setRequests,
  setSelected,
  selected,
  methods,
  currentId,
  setCurrentId,
  responses,
  setResponses,
  isLoading,
  setIsLoading,
};
