const express = require('express');
const controller = require('./../Controller/classController');
const {insertValidations , updateValidations ,deletevalidations} = require('../MiddleWares/Validations/ClassValidations');
const validator = require('../MiddleWares/Validations/Validator');
const {isAdmin} = require('../MiddleWares/authMW');


/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         _id:
 *            type: string
 *            description: The class id    
 *         fullname:
 *           type: string
 *           description: The class full name
 *         supervisor:
 *           type: string
 *           description: The supervisor id
 *         children:
 *           type: array
 *           description: The class children
 *           items:
 *               type : number
 *               descrition : a child id
 *     insertclass:
 *       type: object
 *       properties: 
 *         fullname:
 *           type: string
 *           description: The class full name
 *         supervisor:
 *           type: string
 *           description: The supervisor id
 *         children:
 *           type: array
 *           description: The class children
 *           items:
 *               type : number
 *               descrition : a child id        
 */

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Returns the list of all the classes
 *     tags : [Classes]
 *     responses:
 *       200:
 *         description: The list of the classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get the class by id
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The class id
 *     responses:
 *       200:
 *         description: The class data by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: The class id was not found
 */

/**
 * @swagger
 * /class:
 *   post:
 *     summary: add a new class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/insertclass'
 *     responses:
 *       201:
 *         description: The class was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /class:
 *   put:
 *     summary: update class data
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: The class was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The class id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /class:
 *   delete:
 *     summary: delete a class from the db
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type : object
 *               properties:
 *                    _id:
 *                      type: string
 *                      description : the class id
 *     responses:
 *       200:
 *         description: The class was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The class id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Get the class children by class id
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The class id
 *     responses:
 *       200:
 *         description: The class children data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Child'
 *       404:
 *         description: The class id was not found
 */

/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Get the class supervisor by class id
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The class id
 *     responses:
 *       200:
 *         description: The class supervisor data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: The class id was not found
 */


const router = express.Router();

router.route('/class')
        .all(isAdmin)
        .get(controller.getAllClasses)
        .post(insertValidations,validator,controller.addNewClass)
        .put(updateValidations,validator,controller.updateNewClass)
        .delete(deletevalidations,validator,controller.deleteClass);


router.get('/class/:id' ,isAdmin, controller.getClassById);
router.get('/class/child/:id',isAdmin,controller.getClassChildrenById);
router.get('/class/teacher/:id',isAdmin,controller.getClassTeacherById);


module.exports = router;