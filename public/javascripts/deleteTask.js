/**
 * Created by Kevin on 3/24/2016.
 */

$(document).ready(function(){

    $('button.delete_task').click(function(){

        var taskID = $(this).attr("task_id");
        var deleteUrl = "/tasks/" + taskID ;

        //jquery deletes task
        $.ajax(
            { method:'delete',
                url : deleteUrl
            }
        ).done(function(){
            var selector = "#" + taskID;

            //This makes it so that the item fades from view on the to-do list, and then is once that is finished it is deleted.
            $(selector).fadeOut(function(){
                this.remove()
            });

        }).fail(function(){
            console.log("there was an error deleting " + taskID);
        });

    });

});