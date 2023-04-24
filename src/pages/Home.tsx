import { Component, createEffect, onMount } from "solid-js";
import SideNav from "../components/SideNav";
import RequestForm from "../components/RequestForm";
import { currentId, requests, setCurrentId, setRequests } from "../states";

const Home: Component<{}> = () => {

  const getId = (id: number) => {
    setCurrentId(id);
  };

  onMount(() => {
    if(localStorage.getItem("requests")) {
      setRequests(JSON.parse(localStorage.getItem("requests")!));
    }
  });

  createEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests(), null, 2));
  });

  return (
    <main class="container h-9/10 relative">
      <div class="flex flex-wrap justify-center items-center h-full">
        <section class="w-1/4 h-full overflow-auto flex justify-center items-center">
          <SideNav onFocused={getId}/>
        </section>
        <section class="w-3/4 h-full overflow-auto">
          <RequestForm currentId={currentId()} />
        </section>
      </div>
    </main>
  );
};

export default Home;
