import { Component, For } from "solid-js";
import RequestCard from "./RequestCard";
import { requests, setRequests } from "../states";
import AddIcon from "../assets/svgs/AddIcon";
import { IRestRequest } from "../interfaces/rest.requests";

const SideNav: Component<{}> = () => {

  const getCurrentIndex = (index: number) => {
    console.log(index);
  };

  const addRequest = () => {
    setRequests((prev) => {

      const newRequest:IRestRequest = {
        id: `${prev.length + 1}`,
        name: "New Request",
        desc: "New Request",
        request: {
          method: "GET",
          url: "",
          headers: [],
          body: "",
        }
      }
      return [...prev, newRequest];
    });
  };

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
