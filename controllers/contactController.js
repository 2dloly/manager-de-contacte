// controllers/contactController.js
const { validationResult } = require('express-validator');
const Contact = require('../models/contact');

// Adăugarea unui nou contact
exports.createContact = async (req, res) => {
    // Validarea datelor de intrare
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Afișarea tuturor contactelor
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizarea unui contact
exports.updateContact = async (req, res) => {
    // Validarea datelor de intrare
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        await contact.update(req.body);
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ștergerea unui contact
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        await contact.destroy();
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
