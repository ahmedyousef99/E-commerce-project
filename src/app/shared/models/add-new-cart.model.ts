import { SendProducts } from './send-products.model';
export interface AddNewCart {
  userId: number;
  date: Date;
  products: SendProducts[];
}
