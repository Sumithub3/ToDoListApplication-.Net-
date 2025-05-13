$(document).ready(function () {
    $(document).on('change', "[id^='status_']", function () {
        var statusid = $(this).attr('id');
        var s_id = statusid.split("_")[1];
        UpdateTask(s_id);
    });

    ShowSubjects();
   
});
function ShowSubjects() {
    debugger
    $.ajax({
        url: '/TodoList/AllTodoList/',
        type: 'Get',
        data: '',
        contentType: 'application/json;charset=utf-8',
        datatype: 'json',
        success: function (result,status,xhr) {
            var obj = '';
            $.each(result, function (index, item) {
                obj += '<li class="list-group-item" onclick=ShowMappedTasks("' + item.sub.toString() + '",' + item.sid + ') >';
                obj += item.sub;
                obj += '<span class="list-item-icons" > ';
                obj += '<i class="fas fa-trash-alt text-danger" onclick="DeletetodoSub('+item.sid+')" ></i ></span> </li > ';
            });
            function createTask() {

            }
            $('#tsubject').html(obj);
        },
        error: function () {
            alert("Something is wrong");
        }
    })
}



function AddSubject() {
    var dataToSend = {
        tdName: $('#taskSub').val()
    };

    $.ajax({
        url: '/TodoList/AddTodoList/',
        type: 'POST',
        data: JSON.stringify(dataToSend), // Convert data to JSON
        contentType: 'application/json;charset=utf-8',
        dataType: 'json', // Expected data type in response
        success: function (result, status, xhr) {
            ShowSubjects();
            alert("Subject created successfully!!");
        },
        error: function (xhr, status, error) {
            alert("Something went wrong: " + error);
        }
    });

}
function DeletetodoSub(id) {
    if (confirm("Do you really want to delete?")) {
        $.ajax({
            url: '/TodoList/DeleteTodoList?sid=' + id,
            //type: 'DELETE', // Specify the HTTP method as DELETE
            success: function (result, status, xhr) {
                if (result === "Success") {
                    ShowSubjects();
                    alert("Subject deleted successfully!!");
                } else {
                    alert("Deletion failed: " + result);
                }
            },
            error: function (xhr, status, error) {
                alert("Something went wrong: " + error);
            }
        });
    }
}

function ShowMappedTasks(lstname, tsklstid) {
    debugger
    $.ajax({
        url: '/Task/SubjectMappedTaskList?mappedlistid=' + tsklstid,
        type: 'Get',
        data: '',
        contentType: 'application/json;charset=utf-8',
        datatype: 'json',
        success: function (result, status, xhr) {
            var obj = '';
            var tobj = '';


            $.each(result, function (index, item) {
                obj += '<li class="list-group-item">';
                obj += '<input type="checkbox" id="status_' + item.TaskID + '" >';
                if (item.Tstatus == 1) {
                    obj += '<span><s>' + item.Tname + '</s></span>';
                } else {
                    obj += '<span>' + item.Tname + '</span>';
                }
                
                obj += '<span class="list-item-icons" > ';
                obj += '<i class="fas fa-edit text-primary" id="task-update" onclick="EditTask(' + item.TaskID + ')" data-toggle="modal" data-target="#myModal"></i>||';
                obj += '<i class="fas fa-trash-alt text-danger" onclick="DeleteTask(' + item.TaskID + ')" ></i ></span> </li > ';
                

            });
            $('#taskname').text(lstname);
            $('#task-list').html(obj);
            $('#task-create').html('<button class="btn btn-primary" onclick="AddTask(' + tsklstid +')"  type="button"> Create</button>')
            $('#input-task').show();

        },
        error: function () {
            alert("Something is wrong");
        }
    })
}

function AddTask(mappedlistid) {
    var lstname = $('#taskname').text();
    var dataToSend = {
        tdName: $("#task-name").val(),
        mappedlistid: mappedlistid
        };
    $.ajax({
        url: '/Task/AddTask/',
        type: 'POST',
        data: JSON.stringify(dataToSend), // Convert data to JSON
        contentType: 'application/json;charset=utf-8',
        dataType: 'json', // Expected data type in response
        success: function (result, status, xhr) {
            //ShowSubjects();
            ShowMappedTasks(lstname, mappedlistid);
            $("#task-name").val('');
            alert("Task Created successfully!!");
        },
        error: function (xhr, status, error) {
            alert("Something went wrong: " + error);
        }
    });

}

function EditTask(task_id) {
        var dataToSend = {
            id: task_id
        };
        $.ajax({
            url: '/Task/EditTask/',
            type: 'POST',
            data: JSON.stringify(dataToSend), // Convert data to JSON
            contentType: 'application/json;charset=utf-8',
            dataType: 'json', // Expected data type in response
            success: function (result, status, xhr) {
                //ShowSubjects();
                //alert("Subject created successfully!!");
                $('#updateTask').val(result[0].TaskName);
                //UpdateTask(task_id);
                $('#updateButton').html('<button type="button" class="btn btn-sm btn-primary" onclick="UpdateTask('+ task_id + ')" >Update</button>');


            },
            error: function (xhr, status, error) {
                alert("Something went wrong: " + error);
            }
        });

}

function UpdateTask(tkid) {
    var lstname = $('#taskname').text();
    var dataToSend = {
        taskName: $("#updateTask").val() == '' ? $("#status_" + tkid).next('span').text() : $("#updateTask").val(),
        status: $("#status_" + tkid).prop("checked") ? 1 : 0,
        taskid: tkid
    };
    $.ajax({
        url: '/Task/UpdateTask/',
        type: 'POST',
        data: JSON.stringify(dataToSend), // Convert data to JSON
        contentType: 'application/json;charset=utf-8',
        dataType: 'json', // Expected data type in response
        success: function (result, status, xhr) {
            //ShowSubjects();
            if (result == 1) {
                $('#status_' + tkid).next('span').wrap("<s>");
            } else {
                $('#status_' + tkid).parent('s').unwrap();
            }


            alert("Your Task Updated successfully!!");
            $('#myModal').modal('hide');

        },
        error: function (xhr, status, error) {
            alert("Something went wrong: " + error);
        }
    });
}


function DeleteTask(id) {
    if (confirm("Do you really want to delete?")) {
        $.ajax({
            url: '/Task/DeleteTask?tskid=' + id,
            //type: 'DELETE', // Specify the HTTP method as DELETE
            success: function (result, status, xhr) {
                if (result === "Success") {
                    ShowSubjects();
                    alert("Task Deleted successfully!!");
                } else {
                    alert("Deletion failed: " + result);
                }
            },
            error: function (xhr, status, error) {
                alert("Something went wrong: " + error);
            }
        });
    }
}



