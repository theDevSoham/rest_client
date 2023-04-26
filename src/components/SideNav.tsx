/* eslint-disable no-unused-vars */
import { Component, For, createEffect } from "solid-js";
import RequestCard from "./RequestCard";
import { requests, responses, setRequests, setResponses } from "../states";
import AddIcon from "../assets/svgs/AddIcon";
import { IRestRequest, IRestResponse } from "../interfaces/rest.requests";

type SideNavProps = {
  onFocused: (index: number) => void;
};

const SideNav: Component<SideNavProps> = (props) => {

  const getCurrentIndex = (index: number) => {
    props.onFocused(index);
  };

  const generateRandID = ():string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const addRequest = () => {

    const newID = generateRandID();

    setRequests((prev) => {

      const newRequest:IRestRequest = {
        id: `${newID}`,
        name: "New Request",
        request: {
          method: "GET",
          url: "https://jsonplaceholder.typicode.com/todos/1",
          headers: [],
          body: "",
        }
      }
      return [...prev, newRequest];
    });

    setResponses((prev) => {

      const newResponse:IRestResponse = {
        id: `${generateRandID()}`,
        request_id: `${newID}`,
        response: {
          status: 200,
          headers: [],
          data: "",
        },
      }
      return [...prev, newResponse];
    });
  };

  createEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests()));
    localStorage.setItem("responses", JSON.stringify(responses()));
  });

  return (
    <section class="w-4/5 h-4/5 rounded-2xl bg-gradient-to-tr from-slate-300 to-green-100 px-5 overflow-auto">
      <div class="flex justify-between items-center my-5">
        <h1 class="text-2xl font-semibold">REST Requests</h1>
        <button class="text-sm text-gray-500" onClick={addRequest}>
          <AddIcon />
        </button>
      </div>

      <For each={requests()}>
        {(item, i) => <RequestCard request={item} ind={i()} onFocused={getCurrentIndex}/>}
      </For>
    </section>
  );
};

export default SideNav;
