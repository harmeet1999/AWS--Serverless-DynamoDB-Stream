



export interface IProduct {
    id: string
    name: string
    colour: string
    addedDate: Date
    expiry: Date
    price: number
}



export interface IProductDocument extends IProduct, Document {}