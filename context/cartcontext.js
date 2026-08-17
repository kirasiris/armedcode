"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const StoreContext = createContext({
	items: [],
	loading: true,
	getItemsCount: () => {},
	getItemQuantity: () => {},
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	clearCart: () => {},
	getTotalItemCost: () => {},
	getCartSubtotal: () => {},
	getItemFee: () => {},
	getTotalCartCost: () => {},
});

export function CartProvider({ children }) {
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);
	// Local Storage
	useEffect(() => {
		try {
			const savedCart = localStorage.getItem("cartItems");
			if (savedCart) {
				setCartItems(JSON.parse(savedCart));
				setLoading(false);
			}
		} catch (err) {
			console.error("Error loading cart:", err);
		}
	}, []);

	// Save to localStorage when cartItems changes
	useEffect(() => {
		try {
			localStorage.setItem("cartItems", JSON.stringify(cartItems));
		} catch (err) {
			console.error("Error saving cart:", err);
		}
	}, [cartItems]);

	const getItemsCount = () => {
		const itemsCount = cartItems.reduce(
			(sum, product) => sum + product.stockQuantity,
			0,
		);
		return itemsCount;
	};

	const getItemQuantity = (object = {}) => {
		const quantity = cartItems.find(
			(product) => product._id === object?._id,
		)?.stockQuantity;

		if (quantity === undefined) {
			return 0;
		}

		return quantity;
	};

	const addItemToCart = async (object = {}) => {
		const quantity = getItemQuantity(object);

		const unitPrice = Number(object?.price?.inCentsFormat) || 0;

		if (quantity === 0) {
			// Item is not on cart
			setCartItems([
				...cartItems,
				{
					_id: object?._id,
					stockQuantity: 1,
					title: object?.title,
					slug: object?.slug,
					avatar: object?.files?.avatar?.location?.secure_location,
					price: unitPrice,
					priceId: object?.price?.default_price,
				},
			]);
			toast.success("Item added to cart");
		} else {
			// Item is on cart
			setCartItems(
				cartItems.map((product) =>
					product._id === object?._id
						? {
								...product,
								stockQuantity: product.stockQuantity + 1,
							}
						: product,
				),
			);
			toast.success(`You have now ${quantity + 1} items`);
		}
	};

	const removeItemFromCart = (object = {}) => {
		const quantity = getItemQuantity(object);

		if (quantity === 1) {
			clearItemFromCart(object?._id);
		} else {
			setCartItems(
				cartItems.map((product) =>
					product._id === object?._id
						? {
								...product,
								stockQuantity: product.stockQuantity - 1,
							}
						: product,
				),
			);
		}
	};

	const clearItemFromCart = (object = {}) => {
		setCartItems((cartItems) =>
			cartItems.filter((currentProduct) => {
				return currentProduct._id !== object?._id;
			}),
		);
		cartItems.length === 0 && toast.success("Item removed from cart");
	};

	const clearCart = () => {
		setCartItems([]);
		toast.success("Cart has been cleared out");
	};

	const getTotalItemCost = (object = {}) => {
		const foundItem = cartItems.find((item) => item._id === object?._id);

		if (!foundItem) return 0;

		return foundItem.price * foundItem.stockQuantity;
	};

	const getCartSubtotal = () => {
		const subtotal = cartItems.reduce((total, cartItem) => {
			const price = Number(cartItem.price) || 0;
			const quantity = Number(cartItem.stockQuantity) || 0;
			return total + price * quantity;
		}, 0);
		return subtotal;
	};

	const getItemFee = () => {
		const subtotal = getCartSubtotal();
		return Math.round(subtotal * 0.03);
	};

	const getTotalCartCost = () => {
		return getCartSubtotal() + getItemFee();
	};

	const value = {
		items: cartItems,
		loading: loading,
		getItemsCount,
		getItemQuantity,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		clearCart,
		getTotalItemCost,
		getCartSubtotal,
		getItemFee,
		getTotalCartCost,
	};

	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}

export function useStoreCart() {
	const context = useContext(StoreContext);
	if (!context) {
		throw new Error("useStoreCart must be used within an CartProvider");
	}
	return context;
}
