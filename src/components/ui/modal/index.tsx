import {
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { cn } from "../../../lib/utils";
import { createPortal } from "react-dom";

type TModal = {
  children: ReactNode;
  className?: string;
  onToogle?: () => void;
  onOpen?: boolean;
};

type TModalContext = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onToogle?: () => void;
  handleToggle: () => void;
  onOpen?: boolean;
};

const ModalContext = createContext<TModalContext | null>(null);

const Modal = ({ children, onToogle, onOpen }: TModal) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleToggle = () => {
    if (onToogle) {
      onToogle();
      return;
    }
    setIsOpen((prev) => !prev);
  };
  return (
    <ModalContext.Provider
      value={{ isOpen, setIsOpen, onToogle, onOpen, handleToggle }}
    >
      {children}
    </ModalContext.Provider>
  );
};

type TPortal = {
  children: ReactNode;
  className?: string;
};

const Portal = ({ className, children }: TPortal) => {
  const { isOpen, onOpen, handleToggle } = useContext(
    ModalContext
  ) as TModalContext;
  const containerRef = useRef<HTMLDivElement>(null);
  const handleOutSideClose = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(e.target as Node)) {
      handleToggle();
    }
  };
  return createPortal(
    (isOpen || onOpen) && (
      <div
        className={cn(
          " fixed top-0 left-0 w-screen h-full bg-black/50 flex justify-center items-center z-50",
          className
        )}
        onClick={handleOutSideClose}
      >
        <div ref={containerRef}>{children}</div>
      </div>
    ),
    document.getElementById("portal") as HTMLElement
  );
};

type TBody = {
  children: ReactNode;
  className?: string;
};

const Body = ({ className, children }: TBody) => {
  return (
    <div className={cn("p-7 rounded-md bg-white border", className)}>
      {children}
    </div>
  );
};

const ToggleButton = ({ className, children }: TBody) => {
  const { handleToggle } = useContext(ModalContext) as TModalContext;
  return (
    <button onClick={handleToggle} className={cn("bg-transparent ", className)}>
      {children}
    </button>
  );
};

Modal.Portal = Portal;
Modal.ToggleButton = ToggleButton;
Modal.Body = Body;

export default Modal;
