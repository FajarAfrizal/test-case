const express = require('express');
const Route = express.Router();
const Book = require('../controllers/book');

Route.get('/data', Book.FindAll);
Route.get('/data/:id', Book.FindOne);
Route.post('/create', Book.Create);

Route.post('/borrow', Book.BorrowBook);
Route.post('/return', Book.ReturnBook);


/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: auto-generated
 *         code:
 *           type: string
 *           description: The book code
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *         stock:
 *           type: integer
 *           description: The stock count of the book
 */

/**
 * @swagger
 *  tags:
 *      name: Books
 *      description: The books managing API
 */

/**
 * @swagger
 * /api/v1/book/data:
 *   get:
 *     summary: Returns the list of all books with available stock
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /api/v1/book/data/{id}:
 *   get:
 *     summary: Returns a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The book data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /api/v1/book/create:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The book code
 *               title:
 *                 type: string
 *                 description: The book title
 *               author:
 *                 type: string
 *                 description: The book author
 *               stock:
 *                 type: integer
 *                 description: The stock count of the book
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid request body
 */

/**
 * @swagger
 * /api/v1/book/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 description: The member code
 *               bookCode:
 *                 type: string
 *                 description: The book code
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *       400:
 *         description: Invalid request body or member is penalized
 *       404:
 *         description: Member or book not found, or book is not available
 */

/**
 * @swagger
 * /api/v1/book/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *                 description: The member code
 *               bookCode:
 *                 type: string
 *                 description: The book code
 *     responses:
 *       201:
 *         description: Book returned successfully
 *       400:
 *         description: Invalid request body or book was not borrowed by the member
 *       404:
 *         description: Member or book not found
 */

const routeProps = {
    Route,
    auth: false,
}
module.exports = routeProps;