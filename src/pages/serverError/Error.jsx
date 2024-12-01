import React from "react";

export default function Error() {
  return (
    <div className="w-full h-[100vh] bg-white justify-center items-center flex">
      <div className="text-white text-center">
        <img
          src="https://i.pinimg.com/originals/c3/35/f6/c335f6b435f96ca830a2e509f5a01ee0.gif"
          alt=""
        />
        <h1 className="text-3xl  font-bold read-only:text-[#52BDF1] select-none">
          500 SERVERDA TEXNIK NOSOZLIK
        </h1>
      </div>
    </div>
  );
}
