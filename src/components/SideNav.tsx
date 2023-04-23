import { Component, For } from "solid-js";
import RequestCard from "./RequestCard";
import { requests } from "../states";

const SideNav: Component<{}> = () => {

  const getCurrentIndex = (index: number) => {
    console.log(index);
  };

  return (
    <section class="w-4/5 h-4/5 rounded-2xl bg-gradient-to-tr from-slate-300 to-green-100 px-5 overflow-auto">
      <div class="flex justify-between items-center my-5">
        <h1 class="text-2xl font-semibold">Add Request</h1>
        <p class="text-sm text-gray-500">+</p>
      </div>

      <For each={requests()}>
        {(item, i) => <RequestCard request={item} ind={i()} onFocused={getCurrentIndex}/>}
      </For>
    </section>
  );
};

export default SideNav;
