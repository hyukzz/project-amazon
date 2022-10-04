import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
	return (
		<StateContext.Provider value={useReducer(reducer, initialState)}>
			{children}
		</StateContext.Provider>
	);
};
// 앱을 래핑하고 데이터 레이어를 제공

export const useStateValue = () => useContext(StateContext);
//Context를 통해 전역적 데이터를 공유할 때 효율적으로 사용가능하다.
