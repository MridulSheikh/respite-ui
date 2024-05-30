import { FaPlay } from "react-icons/fa";
import Modal from ".";
import { MdOutlineClose } from "react-icons/md";

const PlayVideoModal = () => {
  return (
    <Modal>
      <Modal.ToggleButton>
        <button className=" py-1.5 px-5 border-2 border-[#f74f22] text-[#f74f22] rounded-sm  ease-in-out duration-200 hover:bg-[#f74f22] hover:text-white flex justify-center items-center gap-x-2">
          <FaPlay />
          Play Video
        </button>
      </Modal.ToggleButton>
      <Modal.Portal className="px-2 w-full">
        <Modal.Body className="p-0 relative bg-transparent rounded-none overflow-hidden border-none w-full  lg:w-[600px] h-[400px] animate-fade-down">
          <Modal.ToggleButton className=" absolute top-1 right-1 text-3xl">
            <MdOutlineClose className=" text-white" />
          </Modal.ToggleButton>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/20GMMUTcfcM?si=_TygDgpHGtZAAIKy&amp;start=32"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal.Portal>
    </Modal>
  );
};

export default PlayVideoModal;
