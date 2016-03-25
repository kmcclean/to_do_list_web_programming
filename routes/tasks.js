var express = require('express');
var router = express.Router();
var Task = require('./../models/task.js');  //Specify model used

//Displays a list of incomplete tasks.
router.get('/', function(req, res, next){

    Task.find({completed:false}, function(error, allTasks) {
        if (error) {
            return next(error);
        }
        res.render('tasks', {title : 'TODO', tasks : allTasks});
    });
});

// creates a new task for the task list.
router.post('/addtask', function(req, res, next) {

    if (!req.body || !req.body.task_name) {
        return next(new Error('no data provided'));
    }

    var newTask = Task({ name : req.body.task_name, completed: false });

    //Saves the new task to the database.
    newTask.save(function(err){
        if (err) {
            return next(err);
        } else {
            res.redirect('/tasks');
        }
    });
});

//Shows all of the completed tasks.
router.get('/completed', function(req, res, next){

    Task.find({completed:true}, function(error, tasklist){
        if (error) {
            return next(error);
        }
        res.render('tasks_completed', { title:'Completed', tasks: tasklist || [] })
    });
});

//Marks all tasks as complete.
router.post('/alldone', function(req, res, next){

    //req.db.tasks.updateMany({completed: false }, {$set: { completed:true }}, function(error, count) {
    Task.update( {completed : false }, {completed : true} , {multi : true}, function(error, response){
        if (error) {
            console.log('error ' + error);
            return next(error);
        }
        res.redirect('/tasks');
    });
});

//Creates the urls ofr the specific tasks.
router.param('task_id', function(req, res, next, taskId) {

    console.log("params being extracted from URL for " + taskId);

    Task.findById(taskId, function (err, task) {
        if (err) {
            return next(err);
        }
        req.task = task;
        return next();

    });
});

//marks specific tasks as complete.
router.post('/:task_id', function(req, res, next) {

    if (!req.body.completed) {
        return next(new Error('body missing parameter?'))
    }

    Task.findByIdAndUpdate(req.task._id, {completed:true}, function(error, result){
        if (error) {
            return next(error);
        }
        res.redirect('/tasks')
    });
});

//deletes a task from the task list.
router.delete('/:task_id', function(req, res, next) {

    Task.findByIdAndRemove(req.task._id, function(error, result) {
        if (error) {
            return next(error);
        }
        res.sendStatus(200); //send success to AJAX call.
    });
});

module.exports = router;