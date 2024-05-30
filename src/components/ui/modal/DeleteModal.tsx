import { FaRegTrashAlt } from "react-icons/fa";
import Modal from ".";
import { useState } from "react";

type TDeleteModal = {
  action: () => void;
  confirmText?: string;
  title?: string;
  description?: string;
};

const DeleteModal = ({
  action,
  confirmText,
  title,
  description,
}: TDeleteModal) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [inputText, setInputText] = useState("");

  const handelConfirmation = () => {
    if (confirmText) {
      if (confirmText != inputText) return;
    }
    action();
    setOpenModal(false);
  };
  return (
    <Modal onOpen={openModal} onToogle={() => setOpenModal((prev) => !prev)}>
      <Modal.ToggleButton>
        <button className=" bg-red-500 text-white px-3 rounded-sm py-2 flex items-center gap-x-2 hover:bg-red-600">
          <FaRegTrashAlt />
          Delete
        </button>
      </Modal.ToggleButton>
      <Modal.Portal>
        <Modal.Body className="animate-jump-in dark:bg-slate-900 dark:text-white">
          <h1>{title}</h1>
          <p>{description}</p>
          {confirmText && (
            <input
              className=" border w-full py-2 px-4 mt-2"
              placeholder={`Please type '${confirmText}'`}
              onBlur={(e) => setInputText(e.target.value)}
            />
          )}
          <div className=" flex justify-end items-center gap-x-2">
            <Modal.ToggleButton>
              <button className=" bg-red-500 px-3 py-2 mt-3 rounded-sm hover:bg-red-600 text-white">
                Cancel
              </button>
            </Modal.ToggleButton>
            <button
              className=" bg-green-500 px-3 py-2 mt-3 rounded-sm hover:bg-green-600 text-white"
              onClick={handelConfirmation}
            >
              Confirm
            </button>
          </div>
        </Modal.Body>
      </Modal.Portal>
    </Modal>
  );
};

export default DeleteModal;
