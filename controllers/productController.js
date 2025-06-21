const Product = require('../models/productModel')

createProduct =async(req,res) =>{
    const {name,description,price,category_id,brand_id,Quantity} = req.body
    try {
        const newProd = await Product.create({name,description,price,category_id,brand_id,Quantity})
        res.status(200).send({message:"Product added successfully", success:true})
    } catch (error) {
        res.status(500).send({error:error})
    }
}


getAllProducts = async(req,res) =>{
    try {
        const products = await Product.findAll();
      const modifiedProducts = products.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category_id: product.category_id,   
            brand_id: product.brand_id,
            quantity: product.quantity,
            image: product.image ? `http://localhost:3000/uploads/${product.image}` : null,
        }));
        res.status(200).send({products:modifiedProducts,success:true})
    } catch (error) {
        res.status(500).send({error:error})
    }
}



getProductByID =async(req,res) =>{
   try {
    const id = req.params.ID

    const product = await Product.findByPk(id)
    if(!product){
        return res.status(400).send({message:"Product not found", success:false})
    }
    modifiedProduct = {
        id:product.id,
        name:product.name,
        description:product.description,
        price:product.price,
        category_id:product.category_id,
        brand_id:product.brand_id,
        Quantity:product.Quantity,
        InStock:product.InStock,
        image:`http://localhost:3000/uploads/${product.image}`
    }
    res.status(200).send({product:modifiedProduct,success:true})
   } catch (error) {
    res.status(500).send({error:error}) 
   }
}


updateProduct =async(req,res) =>{
    try {
        const id = req.params.ID

        const product = await Product.findByPk(id)
        if(!product){
            return res.status(400).send({message:"Product not found", success:false})
        }
        await product.update(req.body)
        res.status(200).send({message:"Product updated successfully", success:true, product})
    } catch (error) {
        
    }
}


deleteProduct =async(req,res) =>{
     try {
        const id = req.params.ID
        const product = await Product.findByPk(id)
        if(!product){
            return res.status(400).send({message:"Product not found", success:false})
        }
        await product.destroy()
        res.status(200).send({message:"Product deleted successfully", success:true})
    } catch (error) {
        console.log("Error deleting product:", error);
    }
}


const getProductsByCategory =async(req,res)=>{
    try{
        res.status(200).send({message:"Product By Category", success:true})

    } catch (error) {
        console.log("Error deleting product:", error);
    }
}

const getProductsByQuery = async(req,res)=>{
        try{
        res.status(200).send({message:"Product By Query", success:true})

    } catch (error) {
        console.log("Error deleting product:", error);
    }
}

module.exports = {
    createProduct,
getAllProducts,
getProductByID,
updateProduct,
deleteProduct,
getProductsByCategory,
getProductsByQuery
}