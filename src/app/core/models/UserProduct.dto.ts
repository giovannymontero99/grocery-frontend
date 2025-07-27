import { Product } from "../../interfaces/interfaces";

export interface UserProductDto {
    userProductId: number,
    quantity: number,
    addedAt: string,
    idUser: number,
    idProduct: number,
    isSaved: boolean,
}