import { LatLng } from "leaflet";
import { CartItem } from "./CartItem";
import { User } from "./User";

export class Order {
  id!: number;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  address!: string;
  addressLatLng?: LatLng
  paymentId!: string;
  createdAt!: string;
  status!: string;
  dateOrdered?: string;
  user?: User;
}
