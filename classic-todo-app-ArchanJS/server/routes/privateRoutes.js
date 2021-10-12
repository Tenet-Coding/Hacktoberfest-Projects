const router=require('express').Router();
const {protect}=require('../middlewares/protect');
const {getUser, addTodo, deleteTodo}=require('../controllers/privateCon');

//Get user
router.get('/getuser',protect,getUser);

//Add todo
router.patch('/addtodo',protect,addTodo);

//Delete todo
router.patch('/deletetodo',protect,deleteTodo);

module.exports=router;