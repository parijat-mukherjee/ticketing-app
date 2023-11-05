import React from "react";

const StatusDisplay = ({ status }) => {
  function getClass(status) {
    let formatString =
      "inline-block rounded-full px-2 py-1 text-xs font-semibold";

    switch (status) {
      case "not started":
        formatString += " text-yellow-700 bg-red-200";
      case "started":
        formatString += " text-white-700 bg-gray-200";
      case "done":
        formatString += " text-gray-700 bg-green-200";
      default:
        formatString += " text-yellow-700 bg-black-200";
    }
    return formatString;
  }

  return <span className={getClass(status)}>{status}</span>;
};
export default StatusDisplay;
