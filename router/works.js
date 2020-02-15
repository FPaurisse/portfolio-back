const express = require('express');
const slugify = require('slugify');

const router = express.Router();

const works = [
    {   
        "id": 1,
        "slug": slugify("Développement web", { lower: true }),
        "title": "Développement web",
        "context": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        "tools": ["JavaScript", "React.js"],
        "categories": ["web"]
    },
    {
        "id": 2,
        "slug": slugify("Second titre", { lower: true }),
        "title": "Second titre",
        "context": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        "tools": ["JavaScript", "React.js"],
        "categories": ["print"]
    },
    {
        "id": 3,
        "slug": slugify("Troisième titre bis", { lower: true }),
        "title": "Troisième titre bis",
        "context": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
        "tools": ["JavaScript", "Node.js"],
        "categories": ["web"]
    }
];

router.get('/', async (req, res) => {
    res.send(works);
})

module.exports = router;
