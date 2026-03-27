import express from 'express'
import upload from '../config/multer.js';
import { createItem, getItems, deleteItem} from '../controllers/itemController.js'


const itemRouter = express.Router()

//TYPE HERE MULTER FUNCTION TO STORE IMAGE


itemRouter.post('/', upload.single('image'), createItem);
itemRouter.get('/',getItems);
itemRouter.delete('/:id', deleteItem);

export default itemRouter
