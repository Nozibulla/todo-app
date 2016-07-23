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

	
	var todo = todo || {},
	data = JSON.parse(localStorage.getItem("todoData"));

	data = data || {};

	((todo, data, $) => {

	    var defaults = {
	        todoTask: "todo-task",
	        todoHeader: "task-header",
	        todoDate: "task-date",
	        todoDescription: "task-description",
	        taskId: "task-",
	        formId: "todo-form"
	    };

	    todo.init =  () => {

	        $.each(data, function (index, params) {
	            generateElement(params);
	        });
	    };

	    /*Render Task to the DOM*/
	    var generateElement = (params) => {
	        
	        var parent = $('#todo-list'),
	        wrapper;

	        wrapper = $("<div />", {
	            "class" : defaults.todoTask,
	            "id" : defaults.taskId + params.id,
	            "data" : params.id
	        }).appendTo(parent);

	        $("<div />", {
	            "class" : defaults.todoHeader,
	            "text": params.title
	        }).appendTo(wrapper);

	        $("<div />", {
	            "class" : defaults.todoDate,
	            "text": params.date
	        }).appendTo(wrapper);

	        $("<div />", {
	            "class" : defaults.todoDescription,
	            "text": params.description
	        }).appendTo(wrapper);

	    };

	    /* Add A task*/
	    todo.add = () => {
	        var inputs = $("#" + defaults.formId + " :input"),
	        id, title, description, date, tempData;

	        // console.log(inputs);

	        title = inputs[0].value;
	        description = inputs[1].value;
	        date = inputs[2].value;

	        id = new Date().getTime();

	        tempData = {
	            id : id,
	            title: title,
	            date: date,
	            description: description
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
	    };

	    todo.clear = () => {
	        data = {};
	        localStorage.setItem("todoData", JSON.stringify(data));
	        $("." + defaults.todoTask).remove();
	    };

	})(todo, data, jQuery);

/***/ }
/******/ ]);