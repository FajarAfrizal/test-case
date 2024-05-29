const express = require('express');
const Route = express.Router();
const Member = require('../controllers/member');

Route.get('/data', Member.FindAll);
Route.get('/data/:id', Member.FindOne);

Route.post('/create', Member.Create);
Route.put('/update/:id', Member.Update);
Route.delete('/delete/:id', Member.Delete);

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: auto-generated
 *         code:
 *           type: string
 *           description: The member code
 *         name:
 *           type: string
 *           description: The member name
 *         penaltyEndDate:
 *           type: string
 *           format: date-time
 *           description: The member penalty end date
 */

/**
 * @swagger
 *  tags:
 *      name: Members
 *      description: The members managing API
 */

/**
 * @swagger
 * /api/v1/member/data:
 *   get:
 *     summary: Returns the list of all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */

/**
 * @swagger
 * /api/v1/member/data/{id}:
 *   get:
 *     summary: Returns a member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the member to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The member data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 */

/**
 * @swagger
 * /api/v1/member/create:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The member code
 *               name:
 *                 type: string
 *                 description: The member name
 *               penaltyEndDate:
 *                 type: string
 *                 format: date-time
 *                 description: The member penalty end date
 *     responses:
 *       201:
 *         description: Member created successfully
 */

/**
 * @swagger
 * /api/v1/member/update/{id}:
 *   put:
 *     summary: Update an existing member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the member to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The member code
 *               name:
 *                 type: string
 *                 description: The member name
 *               penaltyEndDate:
 *                 type: string
 *                 format: date-time
 *                 description: The member penalty end date
 *     responses:
 *       200:
 *         description: Member updated successfully
 *       404:
 *         description: Member not found
 */

/**
 * @swagger
 * /api/v1/member/delete/{id}:
 *   delete:
 *     summary: Delete a member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the member to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member deleted successfully
 *       404:
 *         description: Member not found
 */


const routeProps = {
    Route,
    // Autentikasi Tanpa Token
    auth: false
}

module.exports = routeProps;
