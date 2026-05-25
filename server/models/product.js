import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:Array,required:true},
    price:{type:Number,required:true},
    offerPrice:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    inStock:{type:Boolean,default:true},
    stock:{type:Number,required:true,default:0},
    unit:{type:String,required:true,enum:['number','count','grams','kilograms','litres'],default:'count'},
},{timestamps:true})

const Product=mongoose.models.product||mongoose.model('product',productSchema)

export default Product;