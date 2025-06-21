const Category = require('../models/categoryModel')

const createCategory = async (req, res) => {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;
    const {createdBy} = req.user._id

    // console.log("Request Body:", req.body); 
    // console.log("Uploaded File:", req.file); 

    try {
        const existingCategory = await Category.findOne({name});
        if (existingCategory) {
            return res.status(400).send({ message: "Category already exists", success: false });
        }

        const newCategory = await new Category({name,image,createdBy})
        await newCategory.save();

        res.status(200).send({ message: "Category created successfully", success: true });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).send({ error: error });
    }
};
const getAllCategories =async (req,res)=>{
    try {
       const categories = await Category.find()
   const modifiedCategories = categories.map((category)=>({
            id:category._id,
            name:category.name,
            image:`http://localhost:8000/uploads/${category.image}`
        }))
        res.status(200).send({categories:modifiedCategories, success:true})
        
    } catch (error) {
    res.status(500).send({error:error})
        
    }
}

const getCategoryByID = async(req,res)=>{
    try {
        const _id = req.params.ID 

        const category = await Category.findById(_id)

        if(!category){
            res.status(400).send({message:"Category not found", success:false})
        }
        modifiedCategory = {
            id:category._id,
            name:category.name,
            image:`http://localhost:8000/uploads/${category.image}`
        }

        res.status(200).send({category:category,success:true})
    } catch (error) {
        res.status(500).send({error:error})
    }
}
const updateCategory =async(req,res)=>{
    const id = req.params.id;
    const {name, image} = req.body;
    const updatedBy = req.user._id
    try {
    // const category = await Category.findById(_id)
    // if(!category){
    //     res.status(400).send({message:"Category not found", success:false})
    // }
    // category.name = name || category.name;
    // category.image = image || category.image;
    // category.updatedBy = req.user._id;
    // category.updatedAt = new Date();

    // await category.save();

    // res.status(200).send({message:"Category updated successfully", success:true,category})


 const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        image,
        updatedAt: new Date(),
        updatedBy,
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).send({ message: "Category not found", success: false });
    }

    res.status(200).send({
      message: "Category updated successfully",
      success: true,
      category,
    });




   } catch (error) {
    res.status(500).send({error:error})
   }
}
const deleteCategory = async(req,res)=>{
        const id = req.params.id

    try {
 
        const category = await Category.findByIdAndDelete(id)
        if(!category){
            res.status(400).send({message:"Category not found", success:false})
        }
        res.status(200).send({message:"Category deleted successfully", success:true,category})
    } catch (error) {
        res.status(500).send({error:error})
    }
}

module.exports = {
createCategory,
getAllCategories,
getCategoryByID,
updateCategory,
deleteCategory
}