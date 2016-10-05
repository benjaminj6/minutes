let generateHTML = require('./html.generator');

module.exports = function(apiURL) {
  let utils = require('./utils')(apiURL);

  return {
    getTasks() {
      let url = apiURL + 'tasks/';
      $.getJSON(url)
        .done(function(tasks) {
          if (!tasks.length) {
            // Put some sort of prompt to create something if the user doesn't have anything
            // Put in its own html section
            $('#tasks-container').append('<p>It looks like you haven\'t created any tasks yet. Start tracking time today</p>');
          }
          tasks.forEach(function(task) {
            console.log(task);
            // Change html to be a ul
            $('#tasks-container').append(generateHTML.taskHTML(task));
          });
        })
        .fail(function(err) {
          // Eventually need to do something to handle this on the frontend?
          console.log('Oh no!', err);
          utils.redirectToLogin();
        });
    },

    getOneTask(id, callback) {
      let url = `${apiURL}tasks/id${id}`;

      $.getJSON(url)
        .done(function(task) {
          console.log('done!');
          callback(task);
        }).fail(function(err) {
          console.log(err);
        });
    },

    createNewTask(time, callback) {
      let url = apiURL + 'tasks/create';
      let title = utils.getValue('.timer-save .title') || undefined;
      let description = utils.getValue('.timer-save .description');
      let data = { title: title, date: new Date(Date.now()), time: time, description: description };

      $.post(url, data)
        .done(function(task) {
          // Create some sort of clalback system a la Node?
          callback(null, task);
          // $('#tasks-container').append(generateHTML.taskHTML(task));
        })
        .fail(function(err) {
          callback(err);
        });
    },

    editTask(task, callback) {
      let id = task.attr('id');
      let title = task.children('.title').val() || undefined;
      let description = task.children('.description').val() || undefined;
      
      $.ajax({
        url: `${apiURL}tasks/edit/${id}`,
        type: 'PUT',
        data: { title: title, description: description }
      }).done(function(editedTask) {
        callback(null, editedTask);
      }).fail(function(err) {
        callback(err);
      });
    },

    deleteTask(id) {
      var url = apiURL + 'tasks/delete/' + id;

      $.ajax({
        url: url,
        type: 'DELETE',
      }).done(function() {
        $('#' + id).remove();
      });
    },

    
  };
};
