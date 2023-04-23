import { Component } from "solid-js";
import SideNav from "../components/SideNav";

const Home: Component<{}> = () => {
  return (
    <main class="container h-9/10">
      <div class="flex flex-wrap justify-center items-center h-full">
        <section class="w-1/4 h-full overflow-auto flex justify-center items-center">
          <SideNav />
        </section>
        <section class="w-3/4 h-full bg-blue-700 overflow-auto">
          right
        </section>
      </div>
    </main>
  );
};

export default Home;
