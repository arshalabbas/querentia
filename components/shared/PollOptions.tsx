"use client";

import { useState } from "react";

import Image from "next/image";

const PollOptions = ({ register }: { register: any }) => {
  const [options, setOptions] = useState([
    {
      id: 0,
      title: "",
    },
  ]);

  const addOption = () => {
    if (options.length >= 5) return;
    const newOption = {
      id: options[options.length - 1].id + 1,
      title: "",
    };

    setOptions((prev) => [...prev, newOption]);
    const optionsList = document.querySelector("#options-list");
    const newOptionElement = optionsList?.lastElementChild;
    newOptionElement?.scrollIntoView({ behavior: "smooth" });
  };

  const deleteOption = (id: number) => {
    setOptions((prev) =>
      prev
        .filter((option) => option.id !== id)
        .map((option, index) => ({
          id: index,
          title: option.title,
        }))
    );
  };

  return (
    <div>
      <p className="text-lg my-2">Options</p>
      <div className="flex flex-col gap-5">
        <div id="options-list" className="flex flex-col gap-5">
          {options.map((option) => (
            <div className="flex gap-5 items-center" key={option.id}>
              <input
                type="text"
                placeholder={`Option ${option.id + 1}`}
                className="input input-bordered w-full max-w-xs"
                name={"option-" + option.id}
                {...register("option-" + option.id)}
              />
              <button
                className={`btn btn-circle ${
                  options.length <= 1 && "btn-disabled opacity-30"
                }`}
                type="button"
                onClick={() => deleteOption(option.id)}
              >
                <Image
                  src={"/assets/delete.svg"}
                  alt="delete-icon"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          ))}
        </div>

        <div className={`self-center mt-2 ${options.length >= 5 && "hidden"}`}>
          <button type="button" className="btn btn-wide" onClick={addOption}>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12H20M12 4V20"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollOptions;
