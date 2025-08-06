import { PhoneIcon, VideoIcon } from "lucide-react";

const CallButton = ({ handleVideoCall, handleAudioCall }) => {
  return (
    <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0">
      <button
        onClick={handleAudioCall}
        className="btn btn-secondary btn-sm text-white mr-2"
      >
        <PhoneIcon className="size-5" />
      </button>
      <button
        onClick={handleVideoCall}
        className="btn btn-primary btn-sm text-white"
      >
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
};

export default CallButton;
