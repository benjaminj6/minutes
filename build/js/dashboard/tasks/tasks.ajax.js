let generate = require('./tasks.html');

module.exports = (apiURL) => {
  let utils = require('../utils')(apiURL);

  return {
    getTasks() {
      let url = apiURL + 'tasks/';
      $.getJSON(url)
        .done(function(tasks) {
          $('#tasks-container').html('');

          if (!tasks.length) {
            $('#tasks-container').addClass('no-content');
            $('#tasks-container').append('<h3 id="no-tasks">It looks like you haven\'t created any tasks yet. <a href="#timer-container">Create a new one today</a></h3>');
          }

          tasks.forEach(function(task) {
            $('#tasks-container').removeClass('no-content');
            $('#tasks-container').prepend(generate.taskHTML(task));
          });
        }).fail(function() {
          utils.redirectToLogin();
        });
    },

    editTask(id, edits, callback) {
      let title = edits.children('.edit-title').val() || undefined;
      let description = edits.children('.edit-description').val() || undefined;

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
      var url = `${apiURL}tasks/delete/${id}`;

      $.ajax({
        url: url,
        type: 'DELETE',
      }).done(() => {
        $(`#${id}`).remove();
      });
    },
  };
};
