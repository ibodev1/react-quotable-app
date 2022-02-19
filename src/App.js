import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const reload = () => {
    setLoading(true);
    axios
      .get("https://api.quotable.io/random?minLength=100&maxLength=120", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("https://api.quotable.io/random?minLength=100&maxLength=120", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-800">
      <div className="w-96 h-60 rounded-2xl relative p-4 bg-gray-700 text-center">
        <p className="text-green-400 my-2">
          {loading ? "Loading..." : data.author && data.author}
        </p>
        <h3 className="text-xl font-medium my-3 text-gray-200">
          "{loading ? "Loading..." : data.content && data.content}"
        </h3>
        <div className="w-full h-auto flex items-center justify-center">
          <div className="w-5/12 h-1 mx-1 bg-gray-600 rounded-2xl"></div>
          <div className="w-1 h-4 mx-1 bg-gray-300 rounded-2xl"></div>
          <div className="w-1 h-4 mx-1 bg-gray-300 rounded-2xl"></div>
          <div className="w-5/12 h-1 mx-1 bg-gray-600 rounded-2xl"></div>
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-13%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={reload}
            className="w-11 h-11 mx-1 rounded-full flex items-center justify-center text-gray-800 bg-green-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z" />
            </svg>
          </button>
          <button
            onClick={() => {
              const copy = navigator.clipboard.writeText(
                '"' + data.content + '" -' + data.author
              );
              toast.promise(copy, {
                loading: "Just a second..",
                success: "Copied To Clipboard!",
                error: "Error occurred while copying!",
              });
            }}
            className="w-11 h-11 mx-1 rounded-full flex items-center justify-center text-gray-800 bg-green-400"
          >
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z" />
            </svg>
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
