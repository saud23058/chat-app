import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold my-20">REAL TIME CHATTING APP</h1>
      <Link href={"/room-chat"}>
        {" "}
        <button className="bg-white text-black text-xl font-bold p-3 rounded-md hover:cursor-pointer">
          Create Room
        </button>
      </Link>
    </div>
  );
};

export default Home;
