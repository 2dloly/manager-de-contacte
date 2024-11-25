// routes/contacts.js
const express = require('express');
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');

const router = express.Router();

// Ruta pentru adăugarea unui nou contact
router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('phone').notEmpty().withMessage('Phone is required'),
        body('email').optional().isEmail().withMessage('Invalid email'),
    ],
    contactController.createContact
);

// Ruta pentru afișarea tuturor contactelor
router.get('/', contactController.getAllContacts);

// Ruta pentru actualizarea unui contact
router.put(
    '/:id',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('phone').notEmpty().withMessage('Phone is required'),
        body('email').optional().isEmail().withMessage('Invalid email'),
    ],
    contactController.updateContact
);

// Ruta pentru ștergerea unui contact
router.delete('/:id', contactController.deleteContact);


module.exports = router;
