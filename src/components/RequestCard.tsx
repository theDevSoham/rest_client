/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from "solid-js";
import { IRestRequest } from "../interfaces/rest.requests";
import { selected, setRequests, setSelected } from "../states";
import DelIcon from "../assets/svgs/DelIcon";

type RequestCardProps = {
  request: IRestRequest;
  onFocused: (index: number) => void;
  ind: number;
};

const RequestCard: Component<RequestCardProps> = (props) => {
  const toggleSelection = () => {
    setSelected(props.ind);
    props.onFocused(props.ind);
  };

  const delRequest = (index: number) => {
    if (confirm("Are you sure you want to delete this request?")) {
      setRequests((prev) => {
        return prev.filter((_, i) => i !== index);
      });
    }
  };

  return (
    <div
      class="w-full h-14 my-5 rounded-lg py-1 px-3 select-none cursor-pointer relative"
      onClick={toggleSelection}
      classList={{
        "bg-gradient-to-tr from-sky-300 to-purple-400":
          selected() === props.ind,
        "hover:bg-stone-300": selected() !== props.ind,
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

      <div class="absolute right-0 bottom-0 w-10 h-full flex justify-center items-center z-10">
        <button class="mb-5" onClick={() => delRequest(props.ind)}>
          <DelIcon />
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
