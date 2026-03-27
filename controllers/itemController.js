import itemModal from "../modals/itemModal.js";


export const createItem = async (req,res,next) => {
    try{
        const {name, description, category}= req.body;

        const price = Number(req.body.price);
        const rating = Number(req.body.rating);
        const hearts = Number(req.body.hearts);
        const imageUrl = req.file ? req.file.path : ''; 

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);


        if (!name || !description || !category || !price || !req.file) {
  return res.status(400).json({ message: "All fields required" });
}
if (isNaN(price) || price <= 0) {
  return res.status(400).json({ message: "Invalid price" });
}
        const total = Number(price) *1;
        const newItem = new itemModal({
            name,
            description,
            category,
            price,
            rating,
            hearts,
            imageUrl,
            total
        })

        const saved = await newItem.save();
        res.status(201).json(saved)
    }

    catch (error) {
    console.error("🔥 ERROR:", error);

    if (error.code === 11000) {
        return res.status(400).json({ message: 'Item name already exists' });
    }

    return res.status(500).json({ message: error.message });
}
}


// GET FUNCTION TO GET ALL ITEMS

export const getItems = async (_req,res, next) =>{
    try{
        const items = await itemModal.find().sort({ createdAt: -1});
        //const host = `${_req.protocol}://${_req.get('host')}`;

        const withFullUrl = items.map(i => ({
    ...i.toObject(),
    imageUrl: i.imageUrl 
       
}));
        res.json(withFullUrl)
    }

    catch(err){
        next(err);

    }
}


//DELETE FUNSTION TO DLETE ITEMS

export const deleteItem = async(req,res,next) => {
    try{
        const removed = await itemModal.findByIdAndDelete(req.params.id);
        if(!removed) return res.status(404).json({ message: "Item not found"})
            res.status(204).end()
    }
    catch(err){
        next(err);
    }
}