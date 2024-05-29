const httpRes = require('../helpers/httpRes');
const flaverr = require('flaverr');

const { Members, BorrowedBook, Books } = require('../models');
const { where } = require('sequelize');

const FindAll = async (req, res, next) => {
    try {
        const members = await Members.findAll({
            include: [
                {
                    model: BorrowedBook,
                    where: { returnDate: null },
                    required: false,
                    include: [
                        {
                            model: Books,
                            required: true
                        }
                    ]

                }
            ]
        });

        const result = members.map(member => ({
            memberId: member.id,
            memberCode: member.code,
            memberName: member.name,
            borrowedBooks: member.BorrowedBooks.map(borrowedBook => ({
                bookId: borrowedBook.Book.id,
                bookCode: borrowedBook.Book.code,
                bookTitle: borrowedBook.Book.title,
                bookAuthor: borrowedBook.Book.author
            }))
        }));

        return httpRes(res, 200, result);

    } catch (err) {
        return next(err);
    }
}

const FindOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        const members = await Members.findOne({
            where: { id },
            include: [
                {
                    model: BorrowedBook,
                    where: { returnDate: null },
                    required: false,
                    include: [
                        {
                            model: Books,
                            required: true
                        }
                    ]       
                }
            ]
        })

        if (!members){
            throw flaverr('E_NOT_FOUND', Error(`Member with id '${id}' not found`))
        }

        const result = {
            memberId: members.id,
            memberCode: members.code,
            memberName: members.name,
            borrowedBooks: members.BorrowedBooks.map(borrowedBook => ({
                bookId: borrowedBook.Book.id,
                bookCode: borrowedBook.Book.code,
                bookTitle: borrowedBook.Book.title,
                bookAuthor: borrowedBook.Book.author
            }))
        }

        
        return httpRes(res, 200, result)
    } catch (err) {
        return next(err);
    }
}

const Create = async (req, res, next) => {
    try {
        const { code , name } = req.body;
        
        await Members.create({
            name,
            code
        });

        return httpRes(res, 201)
    } catch (err) {
        return next(err)
    }
}

const Update = async (req, res, next) => {
    try {
        const { code, name } = req.body;
        const { id } = req.params;
        const members = await Members.findOne({
            where: { id }
        })

        if (!members) {
            throw flaverr('E_NOT_FOUND', Error('Members not found'))
        }
        members.name = name
        members.code = code

        members.save();

        return httpRes(res, 200)
    } catch (err) {
        return next(err)
    }
}

const Delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const members = await Members.findOne({
            where: { id }
        });

        if (!members) {
            throw flaverr('E_NOT_FOUND', Error('Members not found'))
        }

        members.destroy();

        return httpRes(res, 200)
    } catch (err){
        return next(err)
    }
}

module.exports = {
    FindAll,
    FindOne,
    Create,
    Update,
    Delete
}