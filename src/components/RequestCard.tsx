/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from "solid-js";
import { IRestRequest } from "../interfaces/rest.requests";
import { selected, setSelected } from "../states";

type RequestCardProps = {
  request: IRestRequest;
  onFocused: (index: number) => void;
  ind: number;
};

const RequestCard: Component<RequestCardProps> = (props) => {
  const toggleSelection = () => {
    setSelected(props.ind);
  };

  return (
    <div
      class="w-full h-14 my-5 rounded-lg py-1 px-3 select-none cursor-pointer"
      onClick={toggleSelection}
      classList={{
        "bg-gradient-to-tr from-sky-300 to-purple-400":
          selected() === props.ind,
      }}
    >
      <h1
        class="text-md font-semibold"
        classList={{
          "text-black": selected() !== props.ind,
          "text-neutral-100": selected() === props.ind,
        }}
      >
        {props.request.name}
      </h1>
      <p
        class="text-sm whitespace-nowrap overflow-hidden text-ellipsis"
        classList={{
          "text-black": selected() !== props.ind,
          "text-neutral-100": selected() === props.ind,
        }}
      >
        {props.request.request.method}: {props.request.desc}
      </p>
    </div>
  );
};

export default RequestCard;
