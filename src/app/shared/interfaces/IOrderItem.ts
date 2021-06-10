import { CartItem } from "./CartItem";

export class IOrderItem {
    imageUrl: string;
    price: number;
    quantity: number;
    productId: string;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.price = cartItem.unitPrice;
        this.productId = cartItem.id;
    }
}