# project-amazon

아마존 디자인의 사이트로 firebase를 통한 로그인, 결제 기능이 주를 이루고 있다.

<img width="1200" alt="스크린샷 2022-10-06 오후 10 51 27" src="https://user-images.githubusercontent.com/81045794/194333823-79eb0b8e-afb2-4962-8e58-527712eb19ed.png">



## 배포 링크

https://project-amazon-1ifygzyse-hyukzz.vercel.app/

## 설치 방법

```
git clone https://github.com/hyukzz/project-amazon.git
```

```
npm install
```

```
npm start
```

## 설명

노션에서 상세내용 확인가능합니다.

https://www.notion.so/younhyuk/8555a2201c014d049186c699f275545a?v=5b434bcfb9b74623aa0f7ab0de5a8cc1

<details>
  <summary>1. 헤더</summary>

## 헤더

---

가장 먼저 최상단에 위치한 헤더를 먼저 만들었다. 기존에 있던 사이트를 참고해서 만들었기 때문에 로고 이미지와 텍스트와 같은 것들은 거의 참고해서 사용했다.

헤더의 구역을 로고, 서치바, 옵션들로 나눴다. 그리고 먼저 전체적인 css를 설정했다. 중요한 포인트로는 position: sticky; 속성을 통해 스크롤 위치에 따라 포지셔닝 시키고 z-index를 통해 컨텐츠가 겹칠 시 다른 컨텐츠보다 위에 나타날 수 있게 표현했다.

```jsx
//Header.css
.header {
	height: 8vh;
	display: flex; /*가로로 쌓기*/
	align-items: center; /*안에 내용을 가운대로 정렬*/
	background-color: black;
	position: sticky; /*스크롤위치에 따라 포지셔닝*/
	top: 0; /*상단에 헤더가 항상 머물게 함*/
	z-index: 100;
	/*
  컨텐츠가 겹칠 때 누가 상단에 있을지 결정하는 요소
  -1~1000까지 있고 숫자가 높을수록 컨텐츠 위쪽으로 낮을수록 아래로 깔림
  */
}
```

### 1. 로고

---

로고의 경우 기존에 사용되던 image 주소를 가져와서 사용했다. Link를 통해 나중에 다른 주소에서 로고를 클릭 시 메인페이지로 이동할 수 있도록 했다.

- logo image 넣기
- (”/”)에 Link 연결

```jsx
//Header.js
			<Link to="/">
				<img
					className="header_logo"
					src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
					alt=""
				/>
			</Link>

//Header.css
.header_logo {
	width: 100px;
	object-fit: contain; 
	/*
	logo의 사이즈는 천차만별인데, 
	object-fit: contain;을 사용해서 비율이 망가지지 않게 이미지를 조절
	*/
	margin: 0 20px; /* 0은 상하의 마진, 20px은 좌우의 마진*/
	margin-top: 15px;
}
```

### 2. 서치바

---

서치바의 경우 검색어를 입력하는 input과 검색 시 누를 버튼 디자인 두 가지를 합쳐서 넣어야 한다. 디자인의 경우 특별한 점은 없고, input과 버튼의 높이를 맞춰서 옆에 이어지는 듯한 느낌을 들게 만들었다. 또한 input의 border을 없애서 자연스러운 input창을 만들었다.

- input 창 생성
- search button icon 생성

```jsx
//Header.js
			<div className="header_search">
				<input className="header_searchInput" type="" />
				<SearchIcon className="header_searchIcon" />
			</div>

//Header.css
.header_search {
	display: flex;
	flex: 1; /*container가 차지하는 비율*/
	align-items: center;
	border-radius: 20px;
}

.header_searchInput {
	height: 1.7vh;
	/* height: 12px; */
	padding: 10px;
	border: none;
	width: 100%;
}

.header_searchIcon {
	background-color: #cd9042;
	padding: 5px; /*안쪽여백 늘리기*/
	height: 2vh;
	/* height: 15px; */
}
```

### 3. 옵션

---

옵션들의 경우 나중에 사용할 다양한 페이지의 주소들을 연결할 컨텐츠들과 장바구니 등을 헤더 창 우측에 생성했다. 

- 추후 사용할 페이지 주소 텍스트
- 장바구니 icon과 개수 숫자

```jsx
//Header.js
			<div className="header_nav">
				<div className="header_option">
					<span className="header_option_firstLine">안녕하세요</span>
					<span className="header_option_secondLine">로그인하기</span>
				</div>

				<div className="header_option">
					<span className="header_option_firstLine">돌아가기</span>
					<span className="header_option_secondLine">주문하기</span>
				</div>

				<div className="header_option">
					<span className="header_option_firstLine">반가워요</span>
					<span className="header_option_secondLine">구독과좋아요</span>
				</div>

				<Link to="basket">
					<div className="header_option">
						<span className="header_option_basket">
							<ShoppingBasket />
							<span className="header_option_basketCount">0</span>
						</span>
					</div>
				</Link>
			</div>

//Header.css
.header_nav {
	display: flex; /*옵션 3개를 순서대로 오른쪽으로 배치*/
	justify-content: space-evenly; /*안의 옵션의 배치 넓이를 조절*/
}

.header_option {
	display: flex;
	flex-direction: column; /*위에서 아래로 값을 나열한다. 그이유는 span이기 때문이다. */
	margin-left: 10px;
	margin-right: 10px;
	color: white;
}

.header_option_firstLine {
	font-size: 10px;
}

.header_option_secondLine {
	font-size: 13px;
	font-weight: 800;
	margin-top: 3px;
}

.header_option_basket {
	display: flex;
	align-items: center;
	color: white;
}

.header_option_basketCount {
	margin-left: 10px;
	margin-right: 10px;
}
```

### 4. 아이콘

---

아이콘의 경우 material-ui을 사용해서 진행했다. 

- 설치: `npm install @material-ui/core` && `npm install @mui/icons-material`

npm 설치중 의존성 에러를 마주했다. 이를 해결하기 위한 첫 번째 방법으로 package-lock.json에 몇가지의 다른 의존 버전들을 추가한다. 뒤에  `--force` 를 추가해 작성한다.

두 번째 해결방안으로는 peerDependency가 맞지 않아도 일단 설치하는 방법이 있는데 `--legacy-peer-deps` 를 뒤에 추가 작성한다. 

- import

```
import { ShoppingBasket, Search } from "@material-ui/icons";
```

상단에 필요한 아이콘을 import한다. 그 후 필요한 위치에 해당 아이콘을 사용한다. ex) <shoppingBasket />

### 5. 마무리

---

<img width="1423" alt="image" src="https://user-images.githubusercontent.com/81045794/194769575-291ff12c-00a1-4b4d-b54b-dca87c683e2d.png">


위의 과정을 다 진행하게 되면 위와 같은 디자인을 완성할 수 있다.
</details>

<details>
  <summary>2. 메인 페이지</summary>

## 메인 페이지

---

메인 페이지에는 뒤쪽에 보여질 이미지와 대표 상품들의 가격, 이미지, 평점, 제품명, 장바구니에 담는 버튼 등을 모아 놓은 컴포넌트들 몇 개를 나열하는 방식으로 제작했다.

### 1. 배경 이미지

---

먼저 뒤 이미지는 기존에 사용했었던 이미지를 img태그를 통해 그대로 사용했다. 여기서는 css적인 요소들을 몇 개 사용했다. 먼저 전에도 설정했었던 z-index 값을 가장 작은 -1 값을 사용하면서 항상 가장 하단에 위치 할 수 있도록 설정했다. 또한 이미지 하단에 그라데이션 효과를 넣어 자연스럽게 밑에 있는 듯한 효과를 얻었다.

```jsx
//Home.js
			<div className="home_container">
				<img
					className="home_image"
					src="https://images.idgesg.net/images/article/2017/09/firetvad2-100736366-orig.jpg"
					alt=""
				/>
//Home.css
.home_image {
	width: 100%;
	box-sizing: border-box;
	z-index: -1; /* 값을 가장 밑으로 깔아준다.*/
	margin-bottom: -150px; /* 마진 값을 마이너스로 줘서 안보이는 이미지가 이어지는 느낌을 준다. */
	mask-image: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 1),
		rgba(0, 0, 0, 0)
	); /* 이미지에 그라데이션 효과*/
}
```

### 2. 제품 컴포넌트

---

Home.js에 보여질 제품들을 컴포넌트로 관리하기 위해 Product.js파일을 생성하여 제품 정보만 따로 주게 되면 똑같은 툴에 정보들이 입력되게 만들었다.

```jsx
//Product.js
function Product({ id, title, price, rating, image }) {
	const navigate = useNavigate();

	return (
		<div className="product">
			<div className="product_info">
				<p>{title}</p>

				<p className="product_price">
					<small>가격</small>
					<strong>{price}</strong>
					<small>원</small>
				</p>

				<div className="product_rating">
					{
						Array(rating)
							.fill()
							.map(() => (
								<p>★</p>
							))
					}
				</div>
			</div>

			<img src={image} alt="" />
			<button onClick={() => navigate("/basket")}>장바구니에 담기</button>
		</div>
  );
}

export default Product;
```

먼저 Home.js에서 뿌려주는 id,title,price,rating,image의 정보들을 가져와 똑같은 컴포넌트 형식으로 뿌려주게 된다.

지금은 디자인 적인 부분만 신경쓰기 때문에 장바구니에 담는 버튼의 경우 별도의 담는 로직을 담지 않고 react의 useNavigate를 사용하여 (”/basket”) 주소로 버튼 클릭 시 이동하게 로직을 짰다.

### 🔥 평점 설정 로직

```jsx
{
						Array(rating)
							.fill()
							.map(() => (
								<p>★</p>
							))
}
```

1. rating 안의 크기만큼 Array가 생성된다.
2. 배열을 만든다. 
    
    => []
    
3. fill로 배열을 채운다. 
    
    => [undefined, undefined, undefined, undefined, undefined] 
    
4. map으로 별을 갯수만큼 찍어낸다.
=> [★, ★, ★, ★, ★]

p.s 개수이기 떄문에 소수점은 안된다.

Home.js에서 rating={number} 값을 보내면 그 수만큼 별이 생성된다.

### 3. 제품 값 설정

---

앞에서 만들어 놓은 Product.js에 값만 넣어주면 된다. 아래와 같이 값을 넣어주게 되면 메인 페이지에 아래 값으로 설정된 제품 컴포넌트가 나타나게 된다. 컴포넌트의 갯수는 설정하고 싶은 만큼 만들면 된다.

```jsx
//Home.js
					<Product
						id="1"
						title="제품1"
						price={3000}
						image="http://img.danawa.com/cp_images/service/103/4109708/97ee2ca2.jpg"
						rating={5}
					/>
```

### 4. 마무리

---

<img width="1425" alt="image" src="https://user-images.githubusercontent.com/81045794/194769717-73cbaedf-8465-406b-a566-f1e1621ec13f.png">

위의 과정을 마치게 되면 앞서 만들었던 헤더와 함께 설정한 메인 페이지의 모습을 확인할 수 잇다.
또 하나의 포인트는 헤더와 메인 페이지의 position: sticky와 top:0을 통해 헤더를 항상 상단에 고정하여 밑으로 스크롤을 진행해도 헤더를 항상 사용할 수 있도록 편의성을 신경썼다.
</details>

<details>
  <summary>3. 장바구니 페이지</summary>
  
  ## 장바구니 페이지

---

장바구니 페이지에서는 메인 페이지에 있는 제품을 장바구니에 담기 버튼을 누르게 되면 그 제품을 단기적으로 캐시에 저장하고 장바구니 페이지로 이동할 수 있게 한다. 이를 위해서 data layer를 만들어야 한다. 장바구니에 담기 버튼 ⇒ data layer ⇒ 장바구니 페이지로 이동한다. 또한 헤더에 있는 장바구니의 갯수 변경사항을 적용한다. 

### 1. 장바구니에 담기

---

장바구니에 담기 버튼을 클릭하게 될 때

```jsx
//Product.js
const addToBasket = () => {
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
				//action.item으로 값을 넣어주는 것
				//좌측 값은 명목, 우측 값은 데이터들
			},
		});
	};
```

위처럼 제품의 데이터들을 새로 추가하게 된다. 이렇게 갱신된 데이터를 사용하여 제품리스트를 새로 만들게 된다. 장바구니 안에 장바구니 리스트를 따로 만든다.

### 2. 장바구니에 매핑하기

---

```jsx
//BasketProduct.js
const removeFromBasket = () => {
		dispatch({
			type: "REMOVE_FROM_BASKET",
			id: id,
		});
	};
	return (
		<div className="basketProduct">
			<img className="basketProduct_image" src={image} alt="" />

			<div className="basketProduct_info">
				<p className="basketProduct_title">{title}</p>
				<p className="basketProduct_price">
					<small>₩</small>
					<strong>{price}</strong>
					<small>원</small>
				</p>

				<div className="basketProduct_rating">
					{Array(rating)
						.fill()
						.map(() => (
							<p>★</p>
						))}
				</div>
				<button onClick={removeFromBasket}>장바구니에서 제거하기</button>
			</div>
		</div>
	);
}

//Basket.js
				{
						basket.map(item => (
							<BasketProduct
								id={item.id}
								title={item.title}
								image={item.image}
								price={item.price}
								rating={item.rating}
							/>
						))
						/*item에 basket에 정보를 넣어준다.*/
					}
```

BasketProduct.js를 포함하고 있는 컴포넌트는 Basket.js이다. 그러므로 Basket.js에서 <BasketProduct />을 한 부분에서 image, id 등을 추가해줘야 한다. 이때 매핑을 해준다. 이는 새로운 배열을 만들어 주는 행위이다. 이로써 각각 제품에 따른 정보들이 장바구니 페이지에 들어올 수 있다.그리고 장바구니에 담기 버튼 대신 장바구니에서 제거하기 버튼을 만들어주고, reducer.js에서 case를 추가해준다.

### 3. 장바구니에서 제거하기

---

```jsx
//Reducer.js
case "REMOVE_FROM_BASKET":
			/*
      findIndex를 이용해서 basketItem.id와 제거했을 때 아이디 action.id가 동일했던 위치를 index에 넣어준다.
      그리고 새로운 basket인 newBasket을 만들어준다. splice는 원본을 바꾸기 때문에 새로운 배열을 만들어주는 것 제거되도 상관이 없게하기 위해서
      제거된 새로운 배열안의 index를 제외하고 남은 index를 return basket에 넣어준다.
      하지만 findIndex로 제거하게 되면 동일한 id가 앞에 있으면 선택한 item이 아닌 앞에 있는 동일 id의 item이 제거되는 단점이있다. 
      이를 해결하기 위해서는 redux를 사용하거나 좀 더 세세한 위치정보를 짜야할 필요가 있다.
      */
			const index = state.basket.findIndex(
				basketItem => basketItem.id === action.id
				/*
        액션을 실행했을 때 id와 일치하는 basketItem의 아이디의 위치(index)를 찾아서 전달한다.
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
```

~~추후에 상태관리 툴을 사용하여 리팩토링할 예정이다.~~

### 4. 헤더 장바구니 갯수 변경사항 적용

---

```jsx
//Header.js
import { ShoppingBasket } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Header() {
	const [{ basket, user }, dispatch] = useStateValue();

	return (
				<Link to="/basket">
					<div className="header_option">
						<span className="header_option_basket">
							<ShoppingBasket />
							<span className="header_option_basketCount">
								{basket?.length}
							</span>
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Header;
```

basket의 데이터를 불러와 그 길이만큼 표시되게 하여 현재 장바구니의 갯수가 몇 개인지 반응하게 구현했다. 이때 옵셔널체이닝을 사용했다. 보통 값이 null, undefined일 때 일반적으로 에러를 반환한다. 그러나 옵셔널 체이닝을 사용하게 되면 한 번 더 검증을 해서 프로그래밍 전체가 망가지지 않게 하고, 에러 대신 undefined를 반환할 수 있게 한다. 즉, 애매한 값들을 undefined로 반환시킨다.

### 5. 장바구니에 담은 물건 price의 합 보여주기

---

장바구니에 물건을 담으면 그 물건들의 각각의 가격이 있을 것이다. 이때 그 물건의 가격의 합을 구해 화면상에 표현을 했다. 여기서 라이브러리를 사용했는데 `npm i react-currency-format`를 통해 먼저 설치를 해준다. 그 후 import까지 하면 사용 가능하다.

```jsx
//Subtotal.js
import CurrencyFormat from "react-currency-format";
import "./Subtotal.css";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./Reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
	const [{ basket }, dispatch] = useStateValue();
	const navigate = useNavigate();

	return (
		<div className="subtotal">
			<CurrencyFormat
				renderText={value => (
					<>
						<p>
							총 액({basket.length}개): <strong>{value}원</strong>
						</p>
						<small className="subtotal_gift">
							<input type="checkbox" /> 맞으면 체크해주세요.
						</small>
					</>
				)}
				decimalScale={2} // 소수점 2자리까지
				value={getBasketTotal(basket)} //값
				displayType={"text"} //글자의 형태
				thousandSeparator={true} // 천의 자리마다 단위
				prefix={"₩"}
			/>
			<button onClick={() => navigate("/payment")}>결제</button>
		</div>
	);
}

export default Subtotal;
```

Header에서 사용했던 방법인 장바구니 갯수 변경법을 사용해 현재 장바구니의 갯수를 나타내 주었다. 그리고 가격은 라이브러리를 통해 천단위 마다 표현되고 원화로 구현됐다. 여기서 가격의 합을 구해서 그 데이터를 전송해야한다. 이 또한 reducer에서 만든 뒤 값을 받아왔다.

```jsx
//Reducer.js
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
```

total quantity를 데이터로 관리하고 있다면 좀 더 쉽게 총 액수를 구할 수 있을 것이라고 생각한다. 변경되는 quantity에 맞춰 price를 곱한 값을 받아오면 되기 때문이다.

## 6. 마무리

---

<img width="1421" alt="image" src="https://user-images.githubusercontent.com/81045794/194769895-11badd4d-83cb-4ad4-8d5c-60e7dc5e935a.png">

장바구니에 담기 버튼을 누르면 우측 상단의 장바구니 아이콘 옆 숫자가 변경된다. 그 후 장바구니 페이지에서 총 액수가 변경되고 있고, 장바구니에서 제거하기 버튼을 누르게 되면 우측 상단 숫자와 총 액수에 변경 사항이 적용되는 것을 확인할 수 있다.
</details>

<details>
<summary>4. 로그인&회원가입 페이지</summary>

## 로그인&회원가입 페이지

---

로그인과 회원가입은 firebase를 사용하여 구현했다. `npm i firebase` 를 통해 설치해주고 firebase 홈페이지에서 별도의 project를 생성해주고 auth를 활성화 한 뒤 별도의 firebase 설정을 하게 되면 사용 가능하다. 보통 로그인 페이지와 회원가입 페이지를 구분하여 만들지만 간단하게 만들기 위해 한 페이지에서 버튼만 다르게 만들어 만들 수 있도록 했다.

### 1. 로그인

---

```jsx
//Login.js
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const signIn = e => {
		e.preventDefault(); //새로고침 방지
		auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				navigate("/");
			})
			.catch(err => {
				alert(err.message);
			});
	};
	return (
		<div className="login">
			<Link to="/">
				<img
					className="login_logo"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2880px-Amazon_logo.svg.png"
					alt=""
				/>
			</Link>
			<div className="login_container">
				<h1>로그인</h1>
				<form>
					<h5>e-mail</h5>
					<input
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
						type="text"
					/>
					<h5>password</h5>
					<input
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
						type="password"
					/>
					<button onClick={signIn} className="login_signInButton">
						로그인
					</button>
				</form>
```

firebase에서 로그인하기 위해 auth.signInWithEmailAndPassword(email, password)을 사용하여 firebase에 해당 계정 정보가 있다면 메인페이지로 이동되게 하고 없다면 에러 메세지를 표시하게 구현했다.

### 2. 회원가입

---

```
//Login.js
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const signUp = e => {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(auth => {
				if (auth) {
					navigate("/");
				}
			})
			.catch(err => {
				alert(err.message);
			});
	};
	return (
		<div className="login">
			<Link to="/">
				<img
					className="login_logo"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2880px-Amazon_logo.svg.png"
					alt=""
				/>
			</Link>
			<div className="login_container">
				<h1>로그인</h1>
				<form>
					<h5>e-mail</h5>
					<input
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
						type="text"
					/>
					<h5>password</h5>
					<input
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
						type="password"
					/>

				<p>이용 약관에 동의하시겠습니까?</p>

				<button onClick={signUp} className="login_signUpButton">
					회원가입
				</button>
			</div>
		</div>
	);
```

회원가입은 똑같이 로그인 form을 사용하여 진행했다. 버튼만 따로 만들어서 auth.createUserWithEmailAndPassword(email, password)을 통해 회원 가입에 성공하면 로그인과 마찬가지로 메인페이지로 가게 했고, 실패 시 에러 메시지를 표시하게 구현했다.

### 3. 로그인 정보 동기화

---

app.js에서 로그인 정보 useEffect로 동기화 ⇒ reducer에서 정보에 따라 user정보 변환한다.

```jsx
//Reducer.js
export const initialState = {
	basket: [],
	user: null,
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
```

먼저 로그인 정보가 없을 때 값을 null로 설정해준다. 그 후에 App.js에서 동기화를 할 때 user정보가 있다면 유저 정보를 넣게된다.

```jsx
//App.js
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
	const [{}, dispatch] = useStateValue();
	useEffect(() => {
		auth.onAuthStateChanged(authUser => {
			if (authUser) {
				dispatch({
					type: "SET_USER",
					user: authUser,
					/*SET_USER, user을 전달했다. 이는 action이다. */
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);
	/*
	로그인했는지 로그아웃 했는지 확인 가능할 수 있게 useEffect로 동기화한다.

	deps가 보통 3가지 경우로 있다.
	1. deps 가 없을 때 
	=> 변화가 있을 때마다 계속 실행
	2. deps가 []일 때
	=> 한 번만 실행
	3. deps에 []안에 요소가 있을 때
	=> 요소가 바뀔 때 실행
	*/
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
```

유저의 상태가 변경되면 user정보를 전달해주고, 없다면 null상태로 유지한다.

### 4. 헤더 로그인 표시

---

```jsx
//Header.js
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

	/* 
	&&는 if(!user){"/login"} 
	즉, 참이면 설정된 값 반환 거짓이면 아무것도 안한다.
	*/

	const [{ basket, user }, dispatch] = useStateValue();

	const handleAuth = () => {
		if (user) {
			auth.signOut();
		}
	};

			<div className="header_nav">
				<div className="header_option">
					<span className="header_option_firstLine">안녕하세요</span>

					<Link to={!user && "/login"} className="homeLogin">
						<span onClick={handleAuth} className="header_option_secondLine">
							{user ? "로그아웃" : "로그인"}
						</span>
					</Link>
				</div>
```

동기화된 유저정보를 가져와서 유저정보가 있다면 “로그아웃”이라는 string으로 변환되게 하고 user정보가 없다면 “로그인”으로 표기되게 삼항연산자를 통해 구현했다. 그리고 유저정보가 없을 때만 “/login”으로 이동되게 했다. 만약 user정보가 있는 로그인 상태라면 로그아웃을 할 수 있는 상태가 될 것이다.

### 5. 마무리

---
<img width="1202" alt="image" src="https://user-images.githubusercontent.com/81045794/194849923-86c2431f-c07f-4538-b3ad-c9783ee00423.png">
정보가 없는 계정으로 로그인을 하게 되면 실패 메시지가 뜨게 되고 정보가 있는 계정으로 로그인을 하게 되면 메인페이지로 이동하게 되고 로그인자리는 로그아웃 버튼이 생기고 로그아웃 기능을 사용할 수 있게 된다.

회원가입을 하게 되면 바로 로그인된 상태가 된다. 그리고 메인페이지로 이동하게 된다. 로그인이 된 상태기 때문에 로그아웃 버튼 또한 사용가능하게 된다.
</details>

<details>
  <summary>5. 결제 페이지</summary>

## 결제 페이지

---

firebase와 연동해서 결제 페이지를 구현했다. stripe 라이브러리를 사용했는데, React Stripe.js는 개발자가 애플리케이션에서 보안 결제 기능을 빠르고 쉽게 구현할 수 있도록 하는 미리 빌드된 UI 구성 요소 집합인 Stripe Elements 주변의 가벼운 래퍼입니다. 그러한 요소 중 하나는 직불/신용 카드를 사용하여 온라인으로 지불하는 데 필요한 모든 정보를 수집하는 한 줄 양식인 카드 요소입니다. 기본적으로 유저정보를 가져오고 payment(결제)의 정보를 유저레이어로 보내야한다.

 

### 1. 결제 방식

---

**설치방법**

`npm install @stripe/react-stripe-js @stripe/stripe-js`

```jsx
//App.js
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
	"Secret key"
);
/*
	loadStripe안에 값은 stripe 계정의 "Secret key" 값을 넣으면 된다.
*/

<Route
	path="/payment"
		element={
			<>
				<Header />
					<Elements stripe={promise}>
						<Payment />
					</Elements>
			</>
		}
/>
```

Elements를 가져와야 카드정보가 암호화된다. 이를 app.js에서 결제를 사용할 component를 포함시키면 된다. 

```jsx
//Payment.js
const handleSubmit = async event => {
		event.preventDefault();
		setProcessing(true);

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				// paymentIntent = payment 확인 및 정보

				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				// 딜레이가 생겻을때 버튼이 비활성화 된다. 하지만 너무 빨리 넘어가서 확인이 불가능

				dispatch({
					type: "EMPTY_BASKET",
				});

				navigate("/order");
			});
	};

	const handleChange = event => {
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	};
```

handleSubmit과 handleChange에서 결제 프로세스가 진행되는데 결제라는 것이 돈이 왔다갔다하는 부분이기 때문에 중간에 데이터가 탈취되면 안되기 때문에 보안이 매우 중요하다. 

handleSubmit부분을 async/await을 통해 비동기 처리한다. 동기의 경우에는 어떤 현상이 있을 때 a~z까지 다 들려서 진행하는데 반면 비동기는 event가 발생 했을 때만 활성화되게 해준다. 결제라는 것이 계속 활성화 될 필요가 없고, 결제할 때만 필요한 작업이기 때문에 비동기 처리하는 것이 좋다.

### 2. firebase 서버 구성

---

```jsx
//index.js
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
	"Publishable key"
);

/*
require메서드를 통해 외부 모듈을 가져온다.
require("파일경로")
*/

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("check"));

app.post("/payments/create", async (request, response) => {
	const total = request.query.total;
	console.log(" payment.js에서 가져온 total의 양은 다음과 같다!!  ", total);
	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: "usd", //원화로 하면 오류
	});
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

exports.api = functions.https.onRequest(app);
```

firebase를 통해 서버리스 아키텍처환경을 만들고 앱 결제 시스템을 구축한다. src하위 환경은 frontend환경이고, functions 폴더의 하위 환경은 backend환경이라고 생각하면 된다. 위의 index.js는 functions의 하위 파일이다.

cors를 설치하는데, 이는 도메인 이름이 서로 다른 사이트 간에 api요청을 할 때 허용된 사이트에서만 정보를 주고 받을 수 있게 한다. 허용되지 않는 사이트는 접근을 차단한다.

### 3. 서버와 통신

---

```jsx
//axios.js
import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5001/firebase 주소",
});

export default instance;
```

axios 라이브러리를 통해 비동기 통신을 한다. create메서드를 통해 새로운 리소스를 생성한다. 즉, 서버와의 통신을 유용하게 해준다. fetch도 있지만 조금 더 직관적인 axios를 사용했다.

```jsx
//Payment.js
import axios from "../stores/axios";

useEffect(() => {
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
			//어떤 유저인지 고유한 정보를 가져온다.
		};

		getClientSecret();
	}, [basket]);
```

baseURL을 가져와서 사용한다. querystring을 사용해서 똑같은 url에서 다른 결과를 사용할 수 있도록 한다.

### 4. 결제 버튼 동작 방식

---

```jsx
//Payment.js
1.
const [processing, setProcessing] = useState("");
const [disabled, setDisabled] = useState(true);
const [succeeded, setSucceeded] = useState(false);

<button disabled={processing || disabled || succeeded}>
	<span>{processing ? <p>처리중</p> : "구매하기"}</span>
</button>
/*
	processing이 false이면 disabled가 실행한다. 
	disabled의 기본값이 true이기 때문이다.
	disabled가 true이기 때문에, 밑에 삼항연산자에서 false 값인 "구매하기" 버튼이 생성된다.
	즉, processing이 false이면 뒤에 disabled가 실행되고 이 또한 false이면 succeeded가 실행된다.
*/

2.
<CardElement onChange={handleChange} />
// 카드번호를 입력하면 handleChange가 실행된다.이는 아래와 같다.

const handleChange = event => {
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	};
/*
	기존에 disabled 값이 true여서 사용 못했던 버튼이 event.empty를 통해 글자를 입력하자마자 버튼을 활성화 시킬 수 있게 한다.
*/

3.
<form onSubmit={handleSubmit}>
	<CardElement onChange={handleChange} />
					/*중간 생략*/
	<button disabled={processing || disabled || succeeded}>
		<span>{processing ? <p>처리중</p> : "구매하기"}</span>
	</button>
</form>
/*
	활성화된 "구매하기"버튼을 누르게 되면 form 형태의 handleSubmit이 작동된다.
*/

4.
const handleSubmit = async event => {
		event.preventDefault();
		setProcessing(true);

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				// paymentIntent = payment 확인 및 정보

				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				// 딜레이가 생겻을때 버튼이 비활성화 된다. 하지만 너무 빨리 넘어가서 확인이 불가능

				dispatch({
					type: "EMPTY_BASKET",
				});

				navigate("/orders");
			});
	};
/*
	handleSubmit을 실행하면 setProcessing의 값이 true로 바뀌기 때문에 "처리중"이라는 텍스트가 잠깐 나오게 된다.
	그리고 processing의 값이 true이기 때문에 버튼은 disabled가 된다.
	버튼을 누른뒤 const payload의 과정이 실행되는데 이 과정을 거치게 되면 succeeded,processing 값이 초기화 되기 떄문에 "결제하기"버튼이 비활성화된 상태로 나타나게 된다.
*/
```

disabled ⇒ 처음에 true였다가 카드번호를 입력하면(handleChange) false가 된다.

processing ⇒ 처음에 “”였다가 “구매하기”를 누르면 true였다가 false가 된다.

succeeded ⇒ false였다가 “구매하기” 누르면 false가 된다.

1. processing이 false여서 “구매하기” 텍스트가 나오고, disabled가 true이므로 버튼이 disabled된 상태이다.(비활성화)
2. 카드 CardElement, handleChange에 의해서 disabled이 false가 되므로 버튼은 succeeded 상태로 되는데, false이므로 disabled이 비활성화 되어, 버튼이 활성화된다. 즉, 모든 disabled 상태가 false이므로 활성화된다.
3. 버튼을 누르면 form에 handelSubmit이 활성화 돼서, processing이 true였다가 버튼이 disabled된 채로 처리중이라는 글자로 뜬다.
4. 가격이나 장바구니 내역 등이 firebase db로 넘어가면서 다시 “구매하기” 버튼으로 바뀌면서 useNavigate로 인해 (“/order”)주소로 페이지 이동을 한다.

### 5. 마무리

---
<img width="1430" alt="image" src="https://user-images.githubusercontent.com/81045794/194850346-fbd5acff-1a48-48d6-9e49-78462e8fcb61.png">

기본적인 결제 페이지 상태이다 내가 장바구니에 추가한 제품들이 포함되어 있고, 이 제품들의 총 액수의 합이 최종 결제 가격으로 설정되어 있다. 그리고 default값으로 카드번호를 입력하지 않으면 버튼이 disabled된 상태이다.

<img width="905" alt="image" src="https://user-images.githubusercontent.com/81045794/194850397-abb6388e-26d8-4519-b42d-d098d6bdba51.png">

카드번호를 입력하게 되면 구매하기 버튼이 클릭가능한 상태로 변한다. 구매하기 버튼을 누르면 주문내역 페이지로 이동하게 된다.
</details>

<details>
  <summary>6. 주문내역 페이지</summary>

## 주문내역 페이지

---

결제를 한 뒤 주문내역 페이지로 이동하게 되는데 이때 주문한 내역의 총 액수와 주문한 제품의 내역과 주문 시간 등을 확인할 수 있다.

### 1. 주문 내역 db에 저장

---

```jsx
//Orders.js
import { db } from "../stores/firebase";
import { useStateValue } from "../stores/StateProvider";

	const [{ basket, user }, dispatch] = useStateValue();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user?.uid)
				.collection("orders")
				.orderBy("created", "desc")
				//날짜순 내림차순
				.onSnapshot(snapshot =>
					setOrders(
						snapshot.docs.map(doc => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				);
			//스냅샷을 찍어서 정보를 가져온다.
		} else {
			setOrders([]);
		}
	}, [user]);
```

로그인 후 주문 결제를 했을 때 firebase db에 저장이 된다.

먼저 “users”로 시작해서 user를 구분한 후에 user의 orders(주문내역)을 확인 할 수 있다.

특정 user의 orders를 확인하면 위와 같이 주문 내역들이 존재하고 주문 내역을 누르면 amount(총 액)과 basket(주문 제품의 배열)을 확인할 수 있다.

### 2. 주문내역 목록

---

```jsx
//Orders.js
<div className="orders">
			<h1>주문 내역</h1>

			<div className=" orders_order">
				{orders?.map(order => (
					<Order order={order} />
				))}
			</div>
		</div>
```

주문내역은 매핑을 통해 보여준다. Order.js에 order데이터를 전달하여 페이지를 구현했다.

```jsx
//Order.js
import BasketProduct from "../components/BasketProduct";

import CurrencyFormat from "react-currency-format";
import moment from "moment";

function Order({ order }) {
	return (
		<div className="order">
			<h2> 주문 </h2>
			<p>{moment.unix(order.data.created).format()}</p>

			<p className="order_id">
				<small>{order.id}</small>
			</p>
			{order.data.basket?.map(item => (
				<BasketProduct
					id={item.id}
					title={item.title}
					image={item.image}
					price={item.price}
					rating={item.rating}
					hideButton
				/>
			))}

			<CurrencyFormat
				renderText={value => (
					<h3 className="order_total">주문 총액 : {value}</h3>
				)}
				decimalScale={2}
				value={order.data.amount / 100}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"₩"}
			/>
		</div>
	);
}

export default Order;
```

moment 라이브러리를 이용해 order데이터가 생성된 시간을 표현한다. props로 order데이터를 Orders.js에서 받아왔는데 이를 사용해 BasketProduct 폼을 재사용해서 페이지에 나오게 구현했다. 하나 다른점은 hidebutton props인데 주문내역 페이지에서는 “장바구니에서 제거하기” 버튼이 나오면 안되기 때문에 사용됐다.

```jsx
//BasketProduct.js
function BasketProduct({ id, title, price, rating, image, hideButton }) {
	{!hideButton && (
		<button onClick={removeFromBasket}>장바구니에서 제거하기</button>
	)}
}
```

hiddenButton을 props로 전달해서 매핑한 곳에 사용하면 hiddenButton이 활성화된 상태이기 때문에 버튼이 나타나지 않게 되면서 재사용해도 되는 상태가 된다.

### 3. 마무리

---
<img width="1423" alt="image" src="https://user-images.githubusercontent.com/81045794/194850561-21b28e7a-ceb2-491e-80f6-7b113ee44954.png">

계정별로 주문내역을 확인할 수 있는데 주문하기 버튼을 눌러도 확인이 가능하다. 위에 설명한 것처럼 정보들이 나타나는 것을 확인할 수 있다.
</details>









