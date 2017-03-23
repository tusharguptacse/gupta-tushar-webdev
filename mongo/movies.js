/**
 * Created by tushargupta on 3/20/17.
 */
module.exports = function() {

    var mongoose = require('mongoose');

    var MovieSchema = mongoose.Schema({
        title: {type: String, required: true},
        rating: {type: String, enum: ['G', 'PG', 'PG-13', 'R']},
        plot: String,
        cast: [String],
        poster: String,
        releaseDate: Date,
        boxoffice: Number,
        created: {type: Date, default: Date.now}
    }, {collection: 'movie.wed'});

    var MovieModel = mongoose.model('MovieModel', MovieSchema);

    MovieModel.create({title: 'Avatar'});

};