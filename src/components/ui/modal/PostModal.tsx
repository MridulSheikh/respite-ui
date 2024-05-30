import Modal from ".";
import { IoMdClose } from "react-icons/io";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { useRef, useState } from "react";
import { IoImages } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { UpladImageCloudinary, cn } from "../../../lib/utils";
import { toast } from "sonner";
import { usePostComunityPostMutation } from "../../../redux/features/post/postApi";

const PostModal = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [text, setText] = useState<null | string>();
  const [openImageBox, setOpenImageBox] = useState(false);
  const [showName, setShowName] = useState<any>({});
  const [showImagePreview, setShowImagePreview] = useState<any>({});
  const fileInputRef = useRef<any>();
  const [postCommunity] = usePostComunityPostMutation();
  const handleClearFile = () => {
    setShowName("");
    setShowImagePreview("");
    fileInputRef.current.value = "";
  };
  const user = useAppSelector(useCurrentUser);

  const onSubmit = async () => {
    const toastID = toast.loading("Posting...");
    try {
      let imageUrl = "";
      if (showName.file) {
        imageUrl = await UpladImageCloudinary(showName);
      }
      const date = new Date();
      const response = await postCommunity({
        userEmail: user?.email,
        text,
        img: imageUrl,
        like: [],
        dislike: [],
        comment: [],
        date: date,
      });
      if ("data" in response && response.data.success) {
        toast.success(response.data.message, { id: toastID });
      }
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastID });
    }
  };
  return (
    <Modal onOpen={openModal} onToogle={() => setOpenModal((prev) => !prev)}>
      <Modal.ToggleButton className="w-full">
        <button className="text-gray-400 bg-slate-100 text-left dark:bg-slate-800 w-full px-5 rounded-full py-2 hover:bg-slate-200">
          What's On Your Mind?
        </button>
      </Modal.ToggleButton>
      <Modal.Portal>
        <Modal.Body className="p-0 animate-fade-up animate-duration-500 border-none rounded-md overflow-hidden dark:bg-slate-900">
          <div className="lg:w-[calc(100vw-800px)] relative  max-h-[calc(100vh-100px)] overflow-y-scroll scrollbar-none">
            <div className=" flex sticky top-0 w-full justify-between px-4 py-2 bg-white dark:bg-slate-900 z-20 border-b dark:border-slate-800">
              <div></div>
              <h1 className="dark:text-white text-center text-xl">Post</h1>
              <Modal.ToggleButton className=" bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300">
                <IoMdClose className=" text-2xl text-gray-600  hover:text-[] " />
              </Modal.ToggleButton>
            </div>
            <div className="px-4 py-5">
              <div className=" flex gap-x-3">
                <div>
                  <div className=" relative size-10 rounded-full overflow-hidden ">
                    <img
                      src="/image/login/user.jpg"
                      className=" object-fill object-center"
                    />
                  </div>
                </div>
                <div>
                  <h2 className=" font-semibold text-sm dark:text-gray-300">
                    {user?.email}
                  </h2>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                    Public
                  </span>
                </div>
              </div>
              <input
                placeholder="What's on Your mind?"
                className=" w-full outline-none mt-5 mb-5 text-lg max-h-full scrollbar-none"
                onChange={(e) => setText(e.target.value)}
              />
              {/* image upload */}
              {openImageBox && (
                <div className="  mb-5 ">
                  {showName?.name ? (
                    <div className=" mx-auto flex max-w-[600px] items-center gap-x-6  rounded-lg border-2 border-dashed border-gray-400 p-5 bg-white">
                      <img
                        className="size-[100px] h-[100px] w-full max-w-[150px] rounded-lg object-cover"
                        src={showImagePreview}
                        alt={showName?.name}
                      />
                      <div className="flex-1 space-y-1.5 overflow-hidden">
                        <h5 className=" text-xl font-medium tracking-tight truncate">
                          {showName?.name}
                        </h5>
                        <p className=" text-gray-500">
                          {(showName.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <div onClick={handleClearFile}>
                        <svg
                          width={30}
                          viewBox="0 -0.5 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                              fill="#000000"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <label
                      className=" mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-6 bg-white relative"
                      htmlFor="file5"
                    >
                      <button
                        onClick={() => setOpenImageBox((prev) => !prev)}
                        className=" text-2xl text-gray-600 absolute top-2 right-2"
                      >
                        <MdOutlineClose />
                      </button>
                      <svg
                        width={50}
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 42 32"
                        enableBackground="new 0 0 42 32"
                        xmlSpace="preserve"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <path
                              fill="black"
                              d="M33.958,12.988C33.531,6.376,28.933,0,20.5,0C12.787,0,6.839,5.733,6.524,13.384 C2.304,14.697,0,19.213,0,22.5C0,27.561,4.206,32,9,32h6.5c0.276,0,0.5-0.224,0.5-0.5S15.776,31,15.5,31H9c-4.262,0-8-3.972-8-8.5 C1,19.449,3.674,14,9,14h1.5c0.276,0,0.5-0.224,0.5-0.5S10.776,13,10.5,13H9c-0.509,0-0.99,0.057-1.459,0.139 C7.933,7.149,12.486,1,20.5,1C29.088,1,33,7.739,33,14v1.5c0,0.276,0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5V14 c0-0.003,0-0.006,0-0.009c3.019,0.331,7,3.571,7,8.509c0,3.826-3.691,8.5-8,8.5h-7.5c-3.238,0-4.5-1.262-4.5-4.5V12.783l4.078,4.07 C25.176,16.951,25.304,17,25.432,17s0.256-0.049,0.354-0.146c0.195-0.195,0.195-0.513,0-0.707l-4.461-4.452 c-0.594-0.592-1.055-0.592-1.648,0l-4.461,4.452c-0.195,0.194-0.195,0.512,0,0.707s0.512,0.195,0.707,0L20,12.783V26.5 c0,3.804,1.696,5.5,5.5,5.5H33c4.847,0,9-5.224,9-9.5C42,17.333,37.777,13.292,33.958,12.988z"
                            ></path>{" "}
                          </g>
                        </g>
                      </svg>
                      <div className="space-y-1.5 text-center">
                        <h5 className="whitespace-nowrap text-lg font-medium tracking-tight ">
                          Upload your file
                        </h5>
                        <p className="text-sm text-gray-500">
                          File Should be in PNG, JPEG or JPG formate
                        </p>
                      </div>
                    </label>
                  )}

                  <input
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const imageFile = e.target.files[0];
                        setShowName(imageFile);
                        setShowImagePreview(URL.createObjectURL(imageFile));
                      }
                    }}
                    className="hidden"
                    id="file5"
                    type="file"
                  />
                </div>
              )}
            </div>
          </div>
          <div className=" bg-white dark:bg-slate-800 w-full py-5 sticky bottom-0 px-5 border-t flex justify-between items-center ">
            <button onClick={() => setOpenImageBox(true)} className=" text-xl">
              <IoImages />
            </button>

            <button
              onClick={onSubmit}
              disabled={!text && !showName?.name}
              className={cn(" bg-[#2f1793] text-white px-4 py-1 rounded-sm", {
                "bg-[#2f1793]/10": !text && !showName?.name,
              })}
            >
              Post
            </button>
          </div>
        </Modal.Body>
      </Modal.Portal>
    </Modal>
  );
};

export default PostModal;
