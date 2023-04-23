/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from "solid-js";

type RequestFormProps = {
  currentId: number;
};

const RequestForm: Component<RequestFormProps> = (props) => {
  return (
    <div class="w-full h-full p-2 flex flex-wrap justify-between items-center">
      <section class="w-1/2 h-full p-3">
		<div class="w-full h-full bg-neutral-300 rounded-lg shadow-lg p-3">
		</div>
	  </section>
	  <section class="w-1/2 h-full p-3">
		<div class="w-full h-full bg-neutral-300 rounded-lg shadow-lg"></div>
	  </section>
    </div>
  );
};

export default RequestForm;
