import "../styles/Orders.css";

import Order from "../components/Order";
import { db } from "../stores/firebase";
import { useStateValue } from "../stores/StateProvider";

import { useState, useEffect } from "react";

function Orders() {
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

	return (
		<div className="orders">
			<h1>주문 내역</h1>

			<div className=" orders_order">
				{orders?.map(order => (
					<Order order={order} />
				))}
			</div>
		</div>
	);
}

export default Orders;
