"use strict";
const ColorSvc = require("../services/color-service");

module.exports = {
    findOneById: async function (req, res) {
        try {
            const result = await ColorSvc.findOneById(req.params.id);
            if(result.user && result.user!==req.user) {
                return res.status(403);
            }
            res.status(200).json(result);
        }
        catch (err) {
            res.sendStatus(500);
        }
    },
    findAll: async function (req, res) {
        try {
            const results = await ColorSvc.findAll();
            res.status(200).json(results);
        }
        catch (err) {
            res.sendStatus(500);
        }
    },
    findColorsWithNoTier: async function (req, res) {
        try {
            const results = await ColorSvc.findColorsWithNoTier();
            res.status(200).json(results);
        }
        catch (err) {
            res.sendStatus(500);
        }
    },
    findColorsWithTier: async function (req, res) {
        try {
            const results = await ColorSvc.findColorsWithTier();
            res.status(200).json(results);
        }
        catch (err) {
            res.sendStatus(500);
        }
    },
    updateOneById: async function (req, res) { //req.body._id && req.params.id
        try {
            //Immediate rejections:
            //1) If the id in the payload doesn't match the id in the url
            if (req.body._id !== req.params.id) {
                return res.status(400).json({ error: "Mismatch between URI and id in body!" });
            }

            //Next, find the item we are updating:
            let colorToUpdate = await ColorSvc.updateOne(req.body);
            res.status(200).json(colorToUpdate);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(err.statusCode || 500);
        }
    },
    create: async function (req, res) { //req.body
        try {
            const result = await ColorSvc.create(req.body);
            res.status(200).json(result);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(err.statusCode || 500);
        }
    },
    delete: async function (req, res) {
        try {
            await ColorSvc.delete(req.params.id);
            res.sendStatus(204);
        }
        catch (err) {
            console.log(err.message);
            res.sendStatus(err.statusCode || 500);
        }
    }
}