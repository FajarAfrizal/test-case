const flaverr = require('flaverr');
const httpRes = require('../helpers/httpRes');
const {
    Books,
    Members,
    BorrowedBook,
    sequelize,
    Sequelize
} = require('../models');

const FindAll = async (req, res, next) => {
    try {
        const book = await Books.findAll({ 
            where: { 
                stock: { [Sequelize.Op.gt]: 0 } 
            } 
        });

        httpRes(res, 200, book)
    } catch (err) {
        return next(err);
    }
}

const FindOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        const book = await Books.findOne({ where: { id }})

        if (!book) {
            throw flaverr('E_NOT_FOUND', Error(`Book not found with id ${id}`));
        }
        return httpRes(res, 200, book)
    } catch (err) {
        return next(err);
    }
}

const Create = async (req, res, next) => {
    try {
        const { code, title, author, stock } = req.body;
        
        const checkCode = await Books.findOne({
            where: { code }
        })
        if (checkCode){
            throw flaverr('E_BAD_REQUEST', Error('Duplicate code'))
        }
        await Books.create({
            code,
            title,
            author,
            stock
        })

        return httpRes(res, 201);
    } catch (err){ 
        return next(err);
    }
}


const BorrowBook = async (req, res, next) => {
    try {
        const { memberCode, bookCode } = req.body;

        const member = await Members.findOne({ where: { code: memberCode } });
        if (!member) {
            throw flaverr('E_NOT_FOUND', Error('Member not found'));
        }

        // dikenakan penalti. Anggota yang terkena penalti tidak dapat meminjam buku selama 3 hari
        if (member.penaltyEndDate && new Date() < new Date(member.penaltyEndDate)) {
            throw flaverr('E_BAD_REQUEST', Error('Member is currently penalized'));
        }

        // Anggota tidak boleh meminjam lebih dari 2 buku
        const borrowedBooksCount = await BorrowedBook.count({ where: { memberId: member.id, returnDate: null } });
        if (borrowedBooksCount >= 2) {
            throw flaverr('E_BAD_REQUEST', Error('Member may not borrow more than 2 books'));
        }

        const book = await Books.findOne({ where: { code: bookCode } });
        if (!book){
            throw flaverr('E_NOT_FOUND', Error('Book not found'));
        }
        // apabila stock kosong tidak bisa meminjam buku
        if (book.stock <= 0) {
            throw flaverr('E_BAD_REQUEST', Error('Book is currently not available'))
        }

        // Buku yang dipinjam tidak dipinjamkan kepada anggota lain (tidak yakin)

        // const existingBorrowedBook = await BorrowedBook.findOne({
        //     where: {
        //         bookId: book.id,
        //         returnDate: null
        //     }
        // });

        // if (existingBorrowedBook) {
        //     throw flaverr('E_BAD_REQUEST', Error('Book is currently borrowed by another member'));
        // }

        await BorrowedBook.create({ memberId: member.id, bookId: book.id });
        book.stock -= 1;
        await book.save();

        httpRes(res, 201)
    } catch (err) {
        return next(err)
    }
}

const ReturnBook = async (req, res, next) => {
    try {
        const { memberCode, bookCode } = req.body;
        const member = await Members.findOne({ where: { code: memberCode } });

        if (!member){
            throw flaverr('E_NOT_FOUND', Error('Member not found'));
        } 

        const book = await Books.findOne({ where: { code: bookCode } });
        if (!book){
            throw flaverr('E_NOT_FOUND', Error('Book not found'));
        } 

        const borrowedBook = await BorrowedBook.findOne({
            where: { memberId: member.id, bookId: book.id, returnDate: null }
        });

        if (!borrowedBook) {
            throw flaverr('E_NOT_FOUND', Error('This book was not borrowed by the member'))
        }

        const borrowDate = new Date(borrowedBook.borrowDate);
        const returnDate = new Date();
        borrowedBook.returnDate = returnDate;
        await borrowedBook.save();

        book.stock += 1;
        await book.save();

        const diffTime = Math.abs(returnDate - borrowDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 7) {
            member.penaltyEndDate = new Date(returnDate.getTime() + 3 * 24 * 60 * 60 * 1000);
            await member.save();

            return res.send({ message: 'success', alert: 'You will be penalized for returning the book late'})
        }

        return httpRes(res, 201)
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    FindAll,
    FindOne,
    Create,
    BorrowBook,
    ReturnBook
}