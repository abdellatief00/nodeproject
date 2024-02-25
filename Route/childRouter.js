const express = require('express');
const controller = require('./../Controller/childController');
const {insertValidations , updateValidations , deleteValidations} = require('../MiddleWares/Validations/ChildValidations');
const validator = require('../MiddleWares/Validations/Validator')
const {isAdminOrTeacher} = require('../MiddleWares/authMW');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Child:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The child id
 *         fullname:
 *           type: string
 *           description: The child full name
 *         age:
 *           type: number
 *           description: The child age
 *         level:
 *           type: string
 *           description: The child level 
 *         address:
 *           type: object
 *           description: The child address
 *           properties:
 *              city:
 *                  type: string
 *                  description: the addrees city
 *              street:
 *                  type: string
 *                  description: the addrees street
 *              building:
 *                  type: string
 *                  description: the addrees building
 *     postchild:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: The child full name
 *         age:
 *           type: number
 *           description: The child age
 *         level:
 *           type: string
 *           description: The child level 
 *         address:
 *           type: object
 *           description: The child address
 *           properties:
 *              city:
 *                  type: string
 *                  description: the addrees city
 *              street:
 *                  type: string
 *                  description: the addrees street
 *              building:
 *                  type: string
 *                  description: the addrees building    
 */

/**
 * @swagger
 * /child:
 *   get:
 *     summary: Returns the list of all the children
 *     tags : [Children]
 *     responses:
 *       200:
 *         description: The list of the children
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Child'
 */

/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get the child by id
 *     tags: [Children]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The child id
 *     responses:
 *       200:
 *         description: The child data by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *       404:
 *         description: The child id was not found
 */

/**
 * @swagger
 * /child:
 *   post:
 *     summary: add a new child
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postchild'
 *     responses:
 *       200:
 *         description: The Child was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /child:
 *   put:
 *     summary: update child data
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       200:
 *         description: The child was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The child id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /child:
 *   delete:
 *     summary: delete a child from the db
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       200:
 *         description: The child was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The child id was not found
 *       500:
 *         description: internal server error
 */



router.route('/child')
        .all(isAdminOrTeacher)
        .get(controller.getAllchildren)
        .post(insertValidations,validator,controller.addNewchild)
        .put(updateValidations,validator,controller.updatechild)
        .delete(deleteValidations,validator,controller.deleteChild);


        
router.get('/child/:id',isAdminOrTeacher,controller.getChildByID)



module.exports = router;