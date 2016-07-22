'use strict';

(function ($) {

			var appManager = {

						init: function init() {

									$('.container').on('submit', this.addTodo);

									$('.container').on('click', '#delete', this.deleteTodo);
						},

						addTodo: function addTodo(e) {

									e.preventDefault();

									var newTodo = { name: $('#todo').val() };

									var todoList = $('.todo-list');

									var newTodoItem = '<li class="list-group-item clearfix" style=" margin-bottom: 8px;"> ' + newTodo.name + ' <span class="pull-right button-group"><a href="#" style="margin-right: 8px;" class="btn btn-primary"><span class="glyphicon glyphicon-edit"></span></a><button type="button" id = "delete" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span></button></span></li>';

									todoList.append(newTodoItem);

									$('#todo').val('');
						},

						deleteTodo: function deleteTodo(e) {

									e.preventDefault();

									$(this).parent().parent().remove();
						}
			};

			$(function () {

						appManager.init();
			});
})(jQuery);