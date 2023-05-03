import type { Component } from "solid-js";
import { cancelRequest } from "./AxiosConfig/axiosConfig";

const Loader: Component<{}> = () => {
  return (
    <section class="w-full h-full flex flex-col justify-center items-center">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-5"
          onClick={() => {
            cancelRequest("Request cancelled by user");
          }}
        >
          Cancel Request
        </button>
    </section>
  );
};

export default Loader;
