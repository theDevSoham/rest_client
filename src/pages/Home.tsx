import type { Component } from "solid-js";
import { createEffect, lazy } from "solid-js";
const SideNav = lazy(() => import("../components/SideNav"));
const RequestResponseForm = lazy(() => import("../components/RequestResponseForm"));
import { currentId, setCurrentId, setRequests, setResponses } from "../states";

const Home: Component<{}> = () => {

  const getId = (id: number) => {
    setCurrentId(id);
  };

  createEffect(() => {
    if(localStorage.getItem("requests")) {
      setRequests(JSON.parse(localStorage.getItem("requests")!));
    }

    if(localStorage.getItem("responses")) {
      setResponses(JSON.parse(localStorage.getItem("responses")!));
    }
  });

  return (
    <main class="container h-9/10 relative">
      <div class="flex flex-wrap justify-center items-center h-full">
        <section class="w-1/4 h-full overflow-auto flex justify-center items-center">
          <SideNav onFocused={getId}/>
        </section>
        <section class="w-3/4 h-full overflow-auto">
          <RequestResponseForm currentId={currentId()} />
        </section>
      </div>
    </main>
  );
};

export default Home;
