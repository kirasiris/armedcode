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
			0
		);
		return itemsCount;
	};

	const getItemQuantity = (object = {}) => {
		const quantity = cartItems.find(
			(product) => product._id === object?._id
		)?.stockQuantity;

		if (quantity === undefined) {
			return 0;
		}

		return quantity;
	};

	const addItemToCart = (object = {}) => {
		const quantity = getItemQuantity(object);

		// Normalize unit price to a number (in cents)
		// Ensure object?.price?.inCentsFormat is a numeric value
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
				},
			]);
			toast.success("Item added to cart", "bottom");
		} else {
			// Item is on cart
			setCartItems(
				cartItems.map((product) =>
					product._id === object?._id
						? {
								...product,
								stockQuantity: product.stockQuantity + 1,
						  }
						: product
				)
			);
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
						: product
				)
			);
		}
	};

	const clearItemFromCart = (object = {}) => {
		setCartItems((cartItems) =>
			cartItems.filter((currentProduct) => {
				return currentProduct._id !== object?._id;
			})
		);
		cartItems.length === 0 && toast.success("Item removed from cart", "bottom");
	};

	const clearCart = () => {
		setCartItems([]);
		toast.success("Cart has been cleared out", "bottom");
	};

	const getTotalItemCost = (object = {}) => {
		let totalItemCost = 0;
		cartItems.map((cartItem) => {
			totalItemCost += cartItem.price * cartItem.stockQuantity;
		});
		return totalItemCost;
	};

	const getItemFee = () => {
		// Use a Set to track unique product IDs
		const uniqueIds = new Set();
		let totalFee = 0;

		for (const item of cartItems) {
			if (!uniqueIds.has(item._id)) {
				uniqueIds.add(item._id);

				const price = Number(item.price) || 0;
				const itemFee = (price * 30) / 100; // 30% fee
				totalFee += itemFee;
			}
		}

		return totalFee;
	};

	const getTotalCartCost = () => {
		const totalCartCost = cartItems.reduce((total, cartItem) => {
			const price = cartItem.price || 0; // fallback in case of missing price
			const quantity = cartItem.stockQuantity || 0;
			return total + price * quantity;
		}, 0);

		return totalCartCost;
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
