import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PriorityDisplay = ({ priority }) => {
  return (
    <div className="flex justify-start align-baseline">
      {[...Array(priority)].map((e, i) => (
        <FontAwesomeIcon key={i} icon={faFire} className="text-red-400" />
      ))}
    </div>
  );
};

export default PriorityDisplay;
