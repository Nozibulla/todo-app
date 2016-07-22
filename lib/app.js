/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);