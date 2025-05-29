// types/product.d.ts
import { type PageProps } from "next/app";

declare module "next" {
  interface PageParams {
    id: string;
  }
  
  interface ProductPageProps extends PageProps {
    params: {
      id: string;
    };
  }
}