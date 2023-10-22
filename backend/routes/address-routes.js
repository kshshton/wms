import express from 'express';
import {PrismaClient} from '@prisma/client'
import {authToken} from "../middlewares/auth.middlewares.js";
import {del} from "express/lib/application.js";

const prisma = new PrismaClient()
const router = express.Router();


router.get('/:id', authToken, async (req, res) => {
    try {
        const id = req.params.id;
        const getAddress = await prisma.address.findMany({where: {id: id}});
        res.json(getAddress);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


router.delete('/:id', authToken, async (req, res) => {
    try {
        const id = req.params.id;
        const deleteAddress = await prisma.address.delete({where: {id: id}});
        res.json(deleteAddress);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


router.put('/:id', authToken, async (req, res) => {
    try {
        const id = req.params.id;
        const {city, state, country, streetName, buildingNumber, apartmentNumber} = req.body;
        const updateAddress = await prisma.address.update({
            where: {id: id},
            data: {
                city: city,
                state: state,
                country: country,
                streetName: streetName,
                buildingNumber: buildingNumber,
                apartmentNumber: apartmentNumber
            }
        });
        res.json(updateAddress);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


router.post('/', authToken, async (req, res) => {
    try {
        const {city, state, country, streetName, buildingNumber, apartmentNumber} = req.body;
        const addAddress = await prisma.address.create({
            data: {
                city: city,
                state: state,
                country: country,
                streetName: streetName,
                buildingNumber: buildingNumber,
                apartmentNumber: apartmentNumber
            }
        });
        res.json(addAddress);
    } catch (_err) {
        res.status(500).json({error: _err.message});
    }
})


export default router;
