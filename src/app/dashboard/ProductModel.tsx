import ProductCommentModel from "./ProductCommentModel";

export default interface ProductModel {
    id: number,
    name: string,
    description: string,
    price: number,
    currency: string,
    date: string,
    image: string,
    comments?: Array<ProductCommentModel>,
}