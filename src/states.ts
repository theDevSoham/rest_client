import { createSignal } from "solid-js";
import { IRestRequest } from "./interfaces/rest.requests";

const [requests, setRequests] = createSignal<IRestRequest[]>([
  {
    id: "1",
    name: "Get Sample",
    desc: "https://jsonplaceholder.com/posts",
    request: {
      method: "GET",
      url: "https://jsonplaceholder.com/posts",
    },
  },
  {
    id: "2",
    name: "Get Sample 2",
    desc: "https://jsonplaceholder.com/posts",
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

const [selected, setSelected] = createSignal(0);
const [methods] = createSignal(["GET", "POST", "PUT", "DELETE"]);
const [currentId, setCurrentId] = createSignal(0);

export { requests, setRequests, setSelected, selected, methods, currentId, setCurrentId };
