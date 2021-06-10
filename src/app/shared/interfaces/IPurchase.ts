
import { ICustomer } from "./ICustomer";
import { IAddress } from "./IAddress";
import { IOrder } from "./IOrder";
import { IOrderItem } from "./IOrderItem";


export class IPurchase {
    customer: ICustomer;
    address: IAddress;
    order: IOrder;
    orderItems: IOrderItem[];
}