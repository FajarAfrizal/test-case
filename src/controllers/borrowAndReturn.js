const flaverr = require('flaverr');
const httpRes = require('../helpers/httpRes');

const { BorrowedBook, Members, Books } = require('../models');

// const BorrowBook = async (req, res, next) => {
//     try {
//         const { memberCode, bookCode } = req.body;

//         const member = await Members.findOne({ where: { code: memberCode } });
//         if (!member) return res.status(404).send('Member not found');
//         if (member.penaltyEndDate && new Date() < new Date(member.penaltyEndDate)) {
//             return res.status(403).send('Member is currently penalized');
//         }

//         const borrowedBooksCount = await BorrowedBook.count({ where: { memberId: member.id, returnDate: null } });
//         if (borrowedBooksCount >= 2) {
//             return res.status(403).send('Member may not borrow more than 2 books');
//         }

//         const book = await Books.findOne({ where: { code: bookCode } });
//         if (!book) return res.status(404).send('Book not found');
//         if (book.stock <= 0) return res.status(403).send('Book is currently not available');

//         await BorrowedBook.create({ memberId: member.id, bookId: book.id });
//         book.stock -= 1;
//         await book.save();

//         res.send('Book borrowed successfully');
//     } catch (err) {
//         res.status(500).send(error.message);
//     }
// }

// const ReturnBook = async (req, res, next) => {
//     try {
//         const { memberCode, bookCode } = req.body;
//         const member = await Members.findOne({ where: { code: memberCode } });
//         if (!member) return res.status(404).send('Member not found');

//         const book = await Books.findOne({ where: { code: bookCode } });
//         if (!book) return res.status(404).send('Book not found');

//         const borrowedBook = await BorrowedBook.findOne({
//             where: { memberId: member.id, bookId: book.id, returnDate: null }
//         });
//         if (!borrowedBook) return res.status(404).send('This book was not borrowed by the member');

//         const borrowDate = new Date(borrowedBook.borrowDate);
//         const returnDate = new Date();
//         borrowedBook.returnDate = returnDate;
//         await borrowedBook.save();

//         book.stock += 1;
//         await book.save();

//         const diffTime = Math.abs(returnDate - borrowDate);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         if (diffDays > 7) {
//             member.penaltyEndDate = new Date(returnDate.getTime() + 3 * 24 * 60 * 60 * 1000);
//             await member.save();
//         }

//         res.send('Book returned successfully');
//     } catch (err) {
//         return next(err);
//     }
// };

module.exports = {
    BorrowBook,
    ReturnBook
}