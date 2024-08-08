import express from 'express'
import {  test, createUsers,getAll,searchProducts } from '../controllers/product'

const router = express.Router()

router.route('/test').post(test)

router.route('/create').post(createUsers)

router.route('/all').get(getAll)


router.route('/search/:name').get(searchProducts)








export default router