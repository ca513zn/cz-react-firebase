import React, { createContext, useReducer } from 'react';

const initialTabState = {
  currTab: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    //Change a property in the user's state
    case 'SET_TAB': {
      const { tab } = action.payload;
      return {
        ...state,
        currTab: tab
      };
    }

    default: {
      return { ...state };
    }
  }
};

const TabsContext = createContext({
  ...initialTabState,
  setTab: () => {}
});

export const TabsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialTabState);

  const setTab = tab => {
    dispatch({
      type: 'SET_TAB',
      payload: {
        tab
      }
    });
  };

  return (
    <TabsContext.Provider
      value={{
        ...state,
        setTab
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export default TabsContext;
