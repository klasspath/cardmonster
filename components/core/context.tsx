import { createContext, FC, useContext, useMemo, useReducer } from "react";

type ModalView = "SIGNUP" | "LOGIN" | "FORGOT";

interface CartItem {
  productId: string
  count: number;
}

interface State {
  displayModal: boolean;
  displaySidebar: boolean;
  modalView: ModalView;
  cartItems: CartItem[]
}

const initialState: State = {
  displayModal: false,
  displaySidebar: false,
  modalView: "LOGIN",
  cartItems: JSON.parse("[]"),
};

interface Action {
  type: ActionType;
  value?: any;
}

type ActionType =
  | "OPEN_SIDEBAR"
  | "CLOSE_SIDEBAR"
  | "OPEN_MODAL"
  | "CLOSE_MODAL"
  | "SET_MODAL_VIEW"
  | "ADD_CART_ITEM";

interface Dispatch {
  openSidebar: () => void;
  closeSidebar: () => void;
  openModal: () => void;
  closeModal: () => void;
  setModalView: (view: ModalView) => void;
}

const Context = createContext<State | any>(initialState);

function reduce(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalView: action.value,
      };
    }
    case "ADD_CART_ITEM": {
      /* const items: CartItem[] = JSON.parse(localStorage.getItem("bag") || "[]")
      const { productId, count } = action.value

      if (items.some((item) => item.productId == productId)) {
        const index = items.findIndex((item) => item.productId == productId)
        const newItem = { ...items[index], count: items[index].count + count }
        const newCart = [...items]
        newCart[index] = newItem
        return {
          ...state,
          cartItems: newCart
        }
      } else {
        return {
          ...state,
          cartItems: {
            productId,
            count,
          }
        }
      } */
    }
    default: {
      return state;
    }
  }
}

const Provider: FC = (props) => {
  const [state, dispatch] = useReducer(reduce, initialState);

  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });
  const openModal = () => dispatch({ type: "OPEN_MODAL" });
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });
  const setModalView = (view: ModalView) => dispatch({ type: "SET_MODAL_VIEW", value: view });
  const addCartItem = (productId: string, count: number) => dispatch({ type: "ADD_CART_ITEM", value: { productId, count } })

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      openModal,
      closeModal,
      setModalView,
      addCartItem,
    }),
    [state]
  );

  return <Context.Provider value={value} {...props} />;
};

const useState = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("GlobalProvider not part of application");
  }
  return context;
};

export { Provider as GlobalProvider, Context as GlobalContext, useState as useGlobalState };
export type { State as GlobalState };
