/**
 * Created by Kevin on 3/24/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema ({
    name: String,
    completed: Boolean
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;