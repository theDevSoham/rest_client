/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import { Component, createEffect, createSignal } from "solid-js";
import { IRestRequest } from "../interfaces/rest.requests";
import { requests, responses, selected, setRequests, setResponses, setSelected } from "../states";
import DelIcon from "../assets/svgs/DelIcon";
import DeleteAlert from "../pages/DeleteAlert";

type RequestCardProps = {
  request: IRestRequest;
  onFocused: (index: number) => void;
  ind: number;
};

const RequestCard: Component<RequestCardProps> = (props) => {
  const [toggleDelete, setToggleDelete] = createSignal<boolean>(false);

  const toggleSelection = () => {
    setSelected(props.ind);
    props.onFocused(props.ind);
  };

  const delRequest = () => {
    setToggleDelete(true);
  };

  const deleteRequest = (prompt: boolean, index: number) => {
    setToggleDelete(false);
    if (prompt && requests().length > 1) {

      setResponses((prev) => {
        return prev.filter((res) => res.request_id !== requests()[index].id);
      });

      setRequests((prev) => {
        return prev.filter((_, i) => i !== index);
      });
    } else {
      alert("You can't delete the last request");
      return;
    }
  };

  createEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests()));
    localStorage.setItem("responses", JSON.stringify(responses()));
  });

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
        {props.request.request.method}: {props.request.request.url}
      </p>

      <div class="absolute right-0 bottom-0 w-10 h-full flex justify-center items-center z-10">
        <button class="mb-5" onClick={() => delRequest()}>
          <DelIcon />
        </button>
        {toggleDelete() && (
          <DeleteAlert
            toDelete={props.ind}
            onChoose={deleteRequest}
            body={{
              topic: "Delete Request",
              message:
                "Are you sure you want to delete this Request? This action cannot be undone.",
              confirmOption: "Delete",
              rejectionOption: "Cancel",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RequestCard;
