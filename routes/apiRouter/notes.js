const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const{ 
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../../helper/fsUtils');
//http://localhost:3001/api/notes/
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.delete('/:notes_id', (req, res) => {
    const notesId = req.params.notes_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((notes) => notes.notes_id !== notesId);
        
        writeToFile('./db/db.json', result);

        res.json(`Item ${notesId} has been deleted`);

    });

});
//http://localhost:3001/api/notes
notes.post('/', (req, res) => {
    console.log(req.body);

    const {title, text}  = req.body;

    if (req.body) {
        const newNotes = {
            title,
            text,
            id: uuidv4(),
        };

      const parsedData = readAndAppend(newNotes, './db/db.json');
        res.json(parsedData);
    } else {
        res.errored('Error in adding notes');
    }
});

module.exports = notes;