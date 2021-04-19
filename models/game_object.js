var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imageSchema = new Schema(
    {
        first_name: {type: String, required: true, maxlength: 100},
        last_name: {type: String, required: true, maxlength: 100},
        age: {type: Number},
        image: {type: String},
    }
);

// Virtual for celeb's full name
imageSchema
    .virtual('name')
    .get(function () {
        return  this.first_name + this.last_name;
    });

// Virtual for celeb's age
imageSchema
    .virtual('age')
    .get(function () {
        return this.age;
    });

// Virtual for author's URL
imageSchema
    .virtual('url')
    .get(function () {
        return this.image;
    });

//Export model
module.exports = mongoose.model('celeb_image', imageSchema);
