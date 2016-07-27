
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
        console.log(data);
    };

    /*Render Task to the DOM*/
    var generateElement = (params) =>{

        let all_todos ='', container = $('#todo-list'), todo_list = null;

        todo_list = _.template('<% _.each(params, function(todo, index, params) { %>' +
            '<div id="<%= todo.id %>" class="todo-task"><button id="<%= todo.id %>" class=" pull-right" onclick="todo.edit(this.id);"><span class="glyphicon glyphicon-edit"></button><button id="<%= todo.id %>" class=" pull-right" onclick="todo.remove(this.id);"><span class="glyphicon glyphicon-remove"></button></span><div class="task-header"><%= todo.title %></div><div class="task-date"><%=todo.start%></div><div class="task-description"><%= todo.description %></div><div class="task-date"><%= todo.tags %></div></div>' +
            '<% }); %>'),
        

        all_todos = todo_list({
            params: params
        });  

        // console.log(all_todos);      

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
            start: date,
            description: description,
            tags: tags
        };

        const newTodo = {id: tempData};

        console.log(tempData);

        // Saving element in local storage
        data[id] = tempData;
        localStorage.setItem("todoData", JSON.stringify(data));

        // Generate Todo Element
        generateElement(newTodo);

        // todo.calendar();

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
        inputs[2].value = todo_item.start;
        inputs[3].value = todo_item.tags;
        inputs[4].value = todo_item.id;
    };

    todo.saveEdit = () => {
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
            start: date,
            description: description,
            tags: tags
        }

        const selectedDOM = $('#' +editedData.id);

        let todo_template = _.template('<button id="<%= todo.id %>" class=" pull-right" onclick="todo.edit(this.id);"><span class="glyphicon glyphicon-edit"></button><button id="<%= todo.id %>" class=" pull-right" onclick="todo.remove(this.id);"><span class="glyphicon glyphicon-remove"></button></span><div class="task-header"><%= todo.title %></div><div class="task-date"><%=todo.start%></div><div class="task-description"><%= todo.description %></div><div class="task-date"><%= todo.tags %></div>'),
        

        edited_todos = todo_template({
            todo: editedData
        }); 

        selectedDOM.html(edited_todos);

        // console.log(selectedDOM);

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

    };

    todo.calendar = () =>{

        const todos = JSON.parse(localStorage.getItem("todoData"));
        let allevents = '[';

        let todo_list = _.template('<% _.each(params, function(todo, index, params) { %>' +
            '{ "id":"<%=todo.id%>", "title":"<%= todo.title %>", "start":"<%= todo.start %>"  },' +
            '<% }); %>'),

        all_todos = todo_list({
            params: todos
        }); 

        all_todos = all_todos.slice(0, -1);

        allevents += all_todos;

        allevents += ']';

        /*Initialize the calendar*/
        $('#calendar').fullCalendar({
            editable: true,
            eventDrop: function(event, delta, revertFunc) {
                const todoAfterDrag = {
                    id : event.id,
                    title: event.title,
                    start: event.start.format()
                }

                data[event.id].start = event.start.format();
                localStorage.setItem("todoData", JSON.stringify(data));

                /*rerender todolist dom*/

                const selectedDOM = $('#' +event.id);

                let todo_template = _.template('<button id="<%= todo.id %>" class=" pull-right" onclick="todo.edit(this.id);"><span class="glyphicon glyphicon-edit"></button><button id="<%= todo.id %>" class=" pull-right" onclick="todo.remove(this.id);"><span class="glyphicon glyphicon-remove"></button></span><div class="task-header"><%= todo.title %></div><div class="task-date"><%=todo.start%></div><div class="task-description"><%= todo.description %></div><div class="task-date"><%= todo.tags %></div>'),


                edited_todos = todo_template({
                    todo: todoAfterDrag
                }); 

                selectedDOM.html(edited_todos);

            },
            events:  JSON.parse(allevents)
        });
    };

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