import { Types } from "mongoose";

// Order type
export type TOrder = {
    email: string;
    product: Types.ObjectId;
    quantity: number;
    totalPrice: number
}