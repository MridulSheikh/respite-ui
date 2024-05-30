import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { cn } from "../../../lib/utils";

type TDeafultPropsType = {
  children: ReactNode;
  className?: string;
  onToogle?: () => void;
  onOpen?: boolean;
};

type TMenuContext = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onToogle?: () => void;
  onOpen?: boolean;
};

const MenuContext = createContext<TMenuContext | null>(null);

const Menu = ({ children, className, onOpen, onToogle }: TDeafultPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen, onOpen, onToogle }}>
      <div className={cn(className)}>{children}</div>
    </MenuContext.Provider>
  );
};

const ToogleButton = ({ children, className }: TDeafultPropsType) => {
  const { setIsOpen, onToogle } = useContext(MenuContext) as TMenuContext;
  const handleToogle = () => {
    return onToogle ? onToogle : setIsOpen((prev) => !prev);
  };
  return (
    <div onClick={handleToogle} className={cn(className)}>
      {children}
    </div>
  );
};

const Body = ({ children, className }: TDeafultPropsType) => {
  const { isOpen, onOpen } = useContext(MenuContext) as TMenuContext;
  return (
    <div
      className={cn(
        "h-full bg-white w-full p-5 fixed top-0 left-0 hidden",
        className,
        { "inline-block": onOpen || isOpen }
      )}
    >
      {children}
    </div>
  );
};

Menu.toogleButton = ToogleButton;
Menu.body = Body;

export default Menu;
