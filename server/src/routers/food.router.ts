import { Food } from './../models/food.model';
import { Router } from 'express';
import { sample_foods, sample_tags } from '../data';
import asyncHandler from 'express-async-handler';
import { FoodModel } from '../models/food.model';
const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const foodsCount = await FoodModel.countDocuments();
        console.log('foodsCount', foodsCount);
        if (foodsCount > 0) {
            res.send("Seed is already done!");
            return;
        }

        await FoodModel.create(sample_foods);
        res.send("Seed Is Done!");
    }
))


router.get("/", asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find();
        res.send(foods);
    }
))
router.post("/create", asyncHandler(
    async (req, res) => {

        const { name, price, tags, favorite, stars, imageUrl, origins, cookTime } = req.body;
        console.log(name, price, tags, favorite, stars, imageUrl, origins, cookTime)
        let food = new FoodModel({
            name: name,
            price: price,
            tags: tags,
            favorite: favorite,
            stars: stars,
            imageUrl: imageUrl,
            origins: origins,
            cookTime: cookTime
        })
        console.log(food)

        food = await food.save();
        if (!food) res.send('The food cannot be created');
        else res.send(food);
    }
))

router.put("/update/:id", asyncHandler(
    async (req, res) => {
        const food = await FoodModel.findById(req.params.id);
        if (!food) res.status(400).send('Invalid Food!');
        const { name, price, tags, favorite, stars, imageUrl, origins, cookTime } = req.body;

        const updatedFood = await FoodModel.findByIdAndUpdate(
            req.params.id,
            {
                name: name,
                price: price,
                tags: tags,
                favorite: favorite,
                stars: stars,
                imageUrl: imageUrl,
                origins: origins,
                cookTime: cookTime
            },
            { new: true }
        );

        if (!updatedFood) res.send('The food cannot be update');
        else res.send(updatedFood);
    }
))


router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const foods = await FoodModel.find({ name: { $regex: searchRegex } })
        res.send(foods);
    }
))

router.get("/tags", asyncHandler(
    async (req, res) => {
        const tags = await FoodModel.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 });

        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
))

router.get("/tag/:tagName", asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find({ tags: req.params.tagName })
        res.send(foods);
    }
))

router.get("/:foodId", asyncHandler(
    async (req, res) => {
        const food = await FoodModel.findById(req.params.foodId);
        res.send(food);
    }
))


export default router;