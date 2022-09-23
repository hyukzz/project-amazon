export const initialState = {
	basket: [],
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
				...state, //스프레드 신택스: 배열빼고, 배열안의 값만 가져오기
				basket: [...state.basket, action.item],
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
