
const todo = {};

(($) => {



    const defaults = {
        todoTask: "todo-task",
        todoHeader: "task-header",
        todoDate: "task-date",
        todoDescription: "task-description",
        formId: "todo-form"
    },
    data = JSON.parse(localStorage.getItem("todoData"));

    todo.init =  () => {
        generateElement(data);
    };

    /*Render Task to the DOM*/
    var generateElement = (data) =>{

        const todo_list = _.template('<% _.each(data, function(todo, index, data) { %>' +
            '<div id="<%= todo.id %>" class="todo-task"><button id="<%= todo.id %>" class=" pull-right" onclick="todo.edit(this.id);"><span class="glyphicon glyphicon-edit"></button><button id="<%= todo.id %>" class=" pull-right" onclick="todo.remove(this.id);"><span class="glyphicon glyphicon-remove"></button></span><div class="task-header"><%= todo.title %></div><div class="task-date"><%=todo.date%></div><div class="task-description"><%= todo.description %></div><div class="task-date"><%= todo.tags %></div></div>' +
            '<% }); %>'),
        all_todos = todo_list({
            data: data
        }),
        container = $('#todo-list');

        container.append(all_todos);

    };

    /* Add A task*/
    todo.add = () => {
        const inputs = $("#" + defaults.formId + " :input");
        let id, title, description, date, tags, tempData;

        // console.log(inputs);

        title = inputs[0].value;
        description = inputs[1].value;
        date = inputs[2].value;
        tags = inputs[3].value;

        id = new Date().getTime();

        tempData = {
            id : id,
            title: title,
            date: date,
            description: description,
            tags: tags
        };

        // Saving element in local storage
        data[id] = tempData;
        localStorage.setItem("todoData", JSON.stringify(data));

        // Generate Todo Element
        generateElement(tempData);

        // Reset Form
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
        inputs[3].value = "";
    };

    todo.remove = (id) => {

        todo_item = data[id];

        // Removing old element
        removeElement(todo_item);

        // Updating local storage
        delete data[id];
        localStorage.setItem("todoData", JSON.stringify(data));
    };

    todo.edit = (id) => {

        $('#add_button').hide();
        $('#edit_button').show();

        const inputs = $("#" + defaults.formId + " :input");

        todo_item = data[id];

        inputs[0].value = todo_item.title;
        inputs[1].value = todo_item.description;
        inputs[2].value = todo_item.date;
        inputs[3].value = todo_item.tags;
        inputs[4].value = todo_item.id;
    };

    todo.saveEdit = () => {
        console.log('This portion is coming soon');
        const inputs = $("#" + defaults.formId + " :input");
        let id, title, description, date, tags, editedData;

        title = inputs[0].value;
        description = inputs[1].value;
        date = inputs[2].value;
        tags = inputs[3].value;
        id =  inputs[4].value;

        todo_item = data[id];
        todo_item.title = title;
        todo_item.description = description;
        todo_item.date = date;
        todo_item.tags = tags;

        editedData = {
            id : id,
            title: title,
            date: date,
            description: description,
            tags: tags
        }

        // Saving element in local storage
        data[id] = editedData;
        localStorage.setItem("todoData", JSON.stringify(data));
        // Reset Form
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
        inputs[3].value = "";

        $('#add_button').show();
        $('#edit_button').hide();

    }

     // Remove task
     const removeElement = function (params) {
        $("#" + params.id).remove();
    };

    todo.clear =  () => {
        data = {};
        localStorage.setItem("todoData", JSON.stringify(data));
        $("." + defaults.todoTask).remove();
    };

})(jQuery);