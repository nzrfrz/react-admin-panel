import { FileResultsProps } from "./uploadFileProps";

export interface FnbCategoryProps {
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