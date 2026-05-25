import{v2 as cloudinary} from "cloudinary"
import Product from "../models/Product.js"

//Add Product : /api/product/add
export const addProduct=async(req,res)=>{
    try {
        let productData=JSON.parse(req.body.productData)

        const images=req.files

        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url

            })
        )
        await Product.create({...productData,image:imagesUrl})
        res.json({success:true,message:"Product Added"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

//Get Product: /api/product/list
export const productList=async(req,res)=>{
    try {
        const products=await Product.find({})
        res.json({success:true,products})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

//Get single Product: /api/product/id
export const productById=async(req,res)=>{
    try {
        const {id}=req.body
        const product=await Product.findById({id})
        res.json({success:true,product})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

//Change Product instock: /api/product/stock
export const changeStock=async(req,res)=>{
    try {
        const{id,inStock}=req.body
        const product = await Product.findById(id);
        if (inStock && product && product.stock === 0) {
            return res.json({success:false,message:"Cannot make a sold-out product In Stock. Please update its stock count first."})
        }
        await Product.findByIdAndUpdate(id,{inStock})
        res.json({success:true,message:"Stock Updated."})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

//Edit Product: /api/product/edit
export const editProduct=async(req,res)=>{
    try {
        const{id,name,offerPrice,price,category,stock,unit,inStock}=req.body
        
        if (inStock && Number(stock) === 0) {
            return res.json({success:false,message:"Cannot make a sold-out product In Stock. Please update its stock count first."})
        }

        const updatedProduct = await Product.findByIdAndUpdate(id,{
            name,
            offerPrice: Number(offerPrice),
            price: Number(price),
            category,
            stock: Number(stock),
            unit,
            inStock
        }, {new: true})

        if(!updatedProduct){
            return res.json({success:false,message:"Product not found."})
        }

        res.json({success:true,message:"Product Updated Successfully",product:updatedProduct})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}