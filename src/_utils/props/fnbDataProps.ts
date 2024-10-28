import { FileResultsProps } from "./uploadFileProps";

export interface FnbCategoryProps {
  map: any;
  id: string,
  title: string,
  slug: string,
};

export interface FnBProps {
  id: string,
  name: string,
  description: string,
  image: FileResultsProps,
  price: number,
  status: string,
  category: FnbCategoryProps,
};

export interface FnBFormValuesProps {
  category: string,
  description: string,
  price: number,
  name: string,
};