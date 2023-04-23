import { Component, createSignal } from "solid-js";
import SideNav from "../components/SideNav";
import RequestForm from "../components/RequestForm";

const Home: Component<{}> = () => {

  const [currentId, setCurrentId] = createSignal(0);

  const getId = (id: number) => {
    setCurrentId(id);
  };

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
