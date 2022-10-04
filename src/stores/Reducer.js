export const initialState = {
	basket: [],
	user: null,
};

export const getBasketTotal = basket =>
	basket?.reduce((amount, item) => item.price + amount, 0);
/*
0은 처음 값, amount는 초기값이자 앞으로 누적될 가격들이 저장될 인수
item은 현재의 아이템의 속성이 들어가는데 item.price 즉, 장바구니 아이템의 가격 
reduce는 배열의 모든 값을 합산할 때 사용
basket배열에서 item의 price를 합산하기 위해 reduce를 사용
ex) basket[11,22,33]
    1번 콜백 : 0(amount) + 11(item.price 1)
    2번 콜백 : 11(amount) + 22(item.price 2)
    3번 콜백 : 33(amount) + 33(item.price 3)
    => 66
*/

/*
reduce란 배열의 모든 요소에 대해서 지정된 콜백함수 호출하는 것
콜백함수란 우리가 1이란 것을 요청했을 때 1이 실행될 때 다시 콜백해주는 것
*/

const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_BASKET":
			return {
				...state,
				/*
				스프레드 신택스: 배열빼고, 배열안의 값만 가져오기
				...state는 []을 빼고 그안에 있는 값만 가져온다.
				*/
				basket: [...state.basket, action.item],
			};

		case "Empty_BASKET":
			return {
				...state,
				basket: [],
			};

		case "REMOVE_FROM_BASKET":
			/*
      findIndex를 이용해서 basketItem.id와 제거했을 때 아이디 action.id가 동일했던 위치를 index에 넣어준다.
      그리고 새로운 basket인 newBasket을 만들어준다. splice는 원본을 바꾸기 때문에 새로운 배열을 만들어주는 것 제거되도 상관이 없게하기 위해서
      제거된 새로운 배열안의 index를 제외하고 남은 index를 return basket에 넣어준다.
      하지만 findIndex로 제거하게 되면 동일한 id가 앞에 있으면 선택한 item이 아닌 앞에 있는 동일 id의 item이 제거되는 단점이있다. 
      이를 해결하기 위해서는 redux를 사용하거나 좀 더 세세한 위치정보를 짜야할 필요가 있다.
      */
			// console.log(state);
			// console.log(action);
			const index = state.basket.findIndex(
				basketItem => basketItem.id === action.id
				/*
        액션을 실행했을 때 첫번 째로 id와 일치하는 basketItem의 아이디의 위치(index)를 찾아서 전달한다.
        index변수는 동일한 위치의 정보가 담겨져 있다.
        */
			);
			let newBasket = [...state.basket];

			if (index >= 0) {
				newBasket.splice(index, 1);
				/*
        splice는 원본 배열을 바꾸는 메서드 
        splice(제거를 진행할 index, 몇 개를 제거할지)
        */
			} else {
				console.warn(
					" (id: " + action.id + ")이 장바구니에 존재하지 않습니다 "
				);
			}
			return {
				...state,
				basket: newBasket,
			};

		case "SET_USER":
			return {
				...state,
				user: action.user,
				/*
        기본 값으로 user:null 값이 있는데 
        App.js에서 보내준 action의 정보를 바꿔서 넣어준다.
        */
			};
		default:
			return state;
	}
};
export default reducer;

//장바구니 담기와 같은 행동을 데이터 레이어로 dispatch해준다.
//dispatch는 장바구니에 담기를 눌렀을 때 그것을 데이터 레이어로 쏘는 것이다.
//reducer는 이런 행동들에 맞는 state와 action을 return 해준다.

//셀렉터란 state에서 필요한 데이터를 가져오거나 계산을 수행해서 원하는 형태의 데이터의 형태를 가져오는 것
