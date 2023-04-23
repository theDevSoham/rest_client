import { Component } from "solid-js";
import { A } from '@solidjs/router';

const NavBar: Component<{}> = () => {
  return (
    <nav class="bg-white dark:bg-gray-900 w-full h-1/10 z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <A href="/" end class="flex items-center">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            REST in peace
          </span>
        </A>
        <div class="flex md:order-2">
          <A
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			href="/about"
          >
            About
          </A>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
