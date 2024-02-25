const express = require('express');
const controller = require('./../Controller/teacherController')
const {insertValidations , updateValidations , changepasswordValidations} = require('../MiddleWares/Validations/TeacherValidations')
const validator = require('../MiddleWares/Validations/Validator');
const {isAdmin} = require('../MiddleWares/authMW');
const upload = require('../MiddleWares/uploadImage')


/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: The teacher full name
 *         email:
 *           type: string
 *           description: The teacher email
 *         password:
 *           type: string
 *           description: The teacher password
 *         image:
 *           type: string
 *           format: binary
 *           description: The teacher image
 *     Message:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: the message description
 *             
 */

/**
 * @swagger
 * /teacher:
 *   get:
 *     summary: Returns the list of all the teachers
 *     tags : [Teachers]
 *     responses:
 *       200:
 *         description: The list of the teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 */

/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     summary: Get the teacher by id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The teacher id
 *     responses:
 *       200:
 *         description: The teacher data by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: The teacher id was not found
 */

/**
 * @swagger
 * /teacher:
 *   post:
 *     summary: add a new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: The teacher was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /teacher:
 *   put:
 *     summary: update teacher data
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              _id:
 *               type: string
 *               description: the teacher id
 *              fullname:
 *               type: string
 *               description: The teacher full name
 *              email:
 *               type: string
 *               description: The teacher email
 *              password:
 *               type: string
 *               description: The teacher password
 *              image:
 *               type: string
 *               format: binary
 *               description: The teacher image
 *     responses:
 *       201:
 *         description: The teacher was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The teacher id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /teacher:
 *   delete:
 *     summary: delete a teacher from the db
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type : object
 *               properties:
 *                    _id:
 *                      type: string
 *                      description : the teacher id
 *     responses:
 *       200:
 *         description: The teacher was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *               
 *       404:
 *         description: The teacher id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /teacher/changepassword:
 *   post:
 *     summary: change the password
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: the user id
 *                  password:
 *                      type: string
 *                      description: the new password
 *     responses:
 *       200:
 *         description: The password was successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: user not found         
 *       500:
 *         description: internal server error
 */

const router = express.Router();

router.route('/teacher')
        .all(isAdmin)
        .get(controller.getAllteachers)
        .post(upload.single('image'),insertValidations,validator,controller.addNewTeacher)
        .put(upload.single('image'),updateValidations,validator,controller.updateTeacher)
        .delete(controller.deleteTeacher);


//get teacher by id 
router.get('/teachers/:id([0-9a-fA-F]+)',isAdmin,controller.getTeacherByID);


//change password
router.post('/teachers/changepassword',isAdmin,changepasswordValidations,validator,controller.changePassword);




module.exports = router;