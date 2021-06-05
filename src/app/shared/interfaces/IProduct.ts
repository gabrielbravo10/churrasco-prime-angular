import { ICategory } from 'src/app/shared/interfaces/ICategory';
export interface IProduct {
  idProduct: string;
  name: string;
  sku: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  categories: ICategory[];
}
