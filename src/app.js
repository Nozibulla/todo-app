(($) => {

	let appManager = {

		
		init : function(){

			$('.container').on('submit', this.addTodo);

			$('.container').on('click', '#delete',this.deleteTodo);

		},

		addTodo: e => {

			e.preventDefault();

			let newTodo = {name: $('#todo').val()};

			let todoList = $('.todo-list');

			let newTodoItem = `<li class="list-group-item clearfix" contenteditable="true" style=" margin-bottom: 8px;"> <strong>${newTodo.name}</strong> <span class="pull-right button-group"><button type="button" id = "delete" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button></span></li>`;

			todoList.append(newTodoItem);

			$('#todo').val('');
		},

		deleteTodo: function(e) {

			e.preventDefault();

			$(this).parent().parent().remove();
		},

	};

	$(() => {

		appManager.init();

	});

})(jQuery);