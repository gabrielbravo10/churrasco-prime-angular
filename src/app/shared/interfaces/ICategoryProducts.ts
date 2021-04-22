import { IProduct } from '../interfaces/IProduct';
import { ICategory } from '../interfaces/ICategory';

export interface ICategoryProducts extends ICategory {
  products: IProduct[];
}
