import Address from "../models/Address.js";

//Add address : /api/address/add
export const addAddress=async(req,res)=>{
    try {
       
        
        // The address data is now directly in req.body, not nested in an address property
        const addressData = req.body;
        const userId = req.userId; // Get userId from auth middleware
        
        if (!userId) {
            return res.json({success:false, message: "Authentication failed. User ID not found."});
        }
        
        
        
        // Create address with the address fields from req.body plus userId
        await Address.create({...addressData, userId});
        res.json({success:true, message:"Address added successfully"})
    } catch (error) {
        
        res.json({success:false, message: error.message});
    }  
}

//Get Address :/api/address/get
export const getAddress=async(req,res)=>{
    try {
        const userId =req.userId
        const addresses=await Address.find({userId})
         res.json({success:true,addresses})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message: error.message});
    }
}