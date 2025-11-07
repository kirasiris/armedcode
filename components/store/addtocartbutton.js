"use client";
import { useStoreCart } from "@/context/cartcontext";

const AddToCartButton = ({ object = {} }) => {
	const {
		getItemQuantity,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
	} = useStoreCart();
	const itemQuantity = getItemQuantity(object);

	return itemQuantity > 0 ? (
		<>
			<div className="btn-group d-flex mb-4">
				<button
					className="btn btn-light btn-sm"
					onClick={() => removeItemFromCart(object)}
				>
					<i aria-hidden className="fa-solid fa-minus" />
				</button>
				<button className="btn btn-secondary btn-sm">{itemQuantity}</button>
				<button
					className="btn btn-light btn-sm"
					onClick={() => addItemToCart(object)}
				>
					<i aria-hidden className="fa-solid fa-plus" />
				</button>
			</div>
			<button
				className="btn btn-danger btn-sm w-100 mb-4"
				onClick={() => clearItemFromCart(object)}
			>
				<i aria-hidden className="fa-solid fa-trash-can" />
			</button>
		</>
	) : (
		<button
			className="btn btn-light btn-sm w-100 text-uppercase mb-4"
			onClick={() => addItemToCart(object)}
		>
			<i aria-hidden className="fa-solid fa-cart-shopping me-2" />
			Add to Cart
		</button>
	);
};

export default AddToCartButton;
