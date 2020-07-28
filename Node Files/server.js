// All the imports 
const express = require('express');
const mongoose=require("mongoose");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

// ******************* Connection with database ********************************
mongoose.connect('mongodb://127.0.0.1:27017/contacts', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// ******************* Create contact schema and model ********************************
const contactSchema={
    contact_name:String,
    contact_number:Number,
    contact_type:String
}
const ContactDB=mongoose.model("contacts",contactSchema);

// ******************* Functions for different requests ********************************

// request for home page/contact list page and display all the entries of database
app.get('/',function(req, res) {
    ContactDB.find(function(err, foundItems) {
        if (err) {
            console.log(err);
        } else {
            res.json(foundItems);
        }
    });
});


app.get('/:id',function(req, res) {
    let id = req.params.id;
    ContactDB.findById(id, function(err, foundItem) {
        res.json(foundItem);
    });
});
app.post('/update/:id',function(req, res) {
    ContactDB.findById(req.params.id, function(err, foundItem) {
        if (!foundItem)
            res.status(404).send("data is not found");
        else
            foundItem.contact_name = req.body.contact_name;
            foundItem.contact_number = req.body.contact_number;
            foundItem.contact_type = req.body.contact_type;
            foundItem.save().then(foundItem => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
app.post('/add',function(req, res) {
    let new_contact = new ContactDB(req.body);
    new_contact.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

app.post('/delete/:id',function(req,res){
    ContactDB.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log("Error in deleting item.");
        }
   });
})
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
