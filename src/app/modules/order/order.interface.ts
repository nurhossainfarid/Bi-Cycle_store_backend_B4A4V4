import { Types } from "mongoose";


// Order type
export type TOrder = {
    user: Types.ObjectId;
    product: Types.ObjectId;
    totalPrice: number;
    status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    quantity: number;
    discount?: number;
}