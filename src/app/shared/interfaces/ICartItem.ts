import { IProduct } from '../interfaces/IProduct';

export class ICartItem {
    id: string; //Converter pra Long
    name: string;
    imageUrl: string;
    unitPrice: number;

    quantity: number;

    constructor(product: IProduct) {
        this.id = product.idProduct;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;

        this.quantity = 1;
    }
}