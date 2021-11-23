import { mongo } from 'mongoose';
import { ICart, ICartClass } from '../Interfaces/cart.interface';
import { IProduct } from '../Interfaces/productClass.Interface';
const mongoose = require('mongoose');
const cartModel = require('../../Models/cart.model');
export default class Cart implements ICartClass{
    private MDBURI: any = process.env.MONGO_URI;
    constructor(){}

    async getCart(): Promise<ICart[]> {
        try {
            mongoose.connect(this.MDBURI);       
            const cart: ICart[] = await cartModel.find({});
            return cart;
        } catch (error) {
            return [];
        }finally{
            mongoose.disconnect();
        }
    }

    async AddToCart(data: IProduct): Promise<ICart[]> {
        const cart: ICart[] = await this.getCart();
        cart[0].products.push(data);
        cartModel.insertMany(cart);
        const newCart: ICart[] = await this.getCart();
        return newCart;
    }

    async RemoveToCart(id: any): Promise<ICart[]> {
        try {
            await mongoose.connect(this.MDBURI);
            const cart: ICart[] = await this.getCart();
            const newCart: ICart[] = cart.filter((item: ICart) => {
                const data: ICart = {
                    _id: item._id,
                    timestamp: item.timestamp,
                    products: item.products.filter((product: IProduct) => product.id != id),
                }
                return data;
            });
            cartModel.updateMany(newCart);
            const newCart2: ICart[] = await this.getCart();
            return newCart2;
        } catch (error) {
            return [];
        }
        finally{
            await mongoose.disconnect();
        }
    }
}