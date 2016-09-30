module.exports = {
  taskHTML(task) {
    return `
      <div class="task" id="${task._id}">
        ${this.innerTaskHTML(task)}
      </div>
    `;  
  },

  innerTaskHTML(task) {
    return `
      <h3 class="title">${task.title}</h3>
      <h4 class="date">${task.date}</h4>
      <h4 class="time">${task.time}</h4>
      <p class="description">${task.description}</p>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    `;
  },

  editTaskHTML(task) {
    let currentTitle = task.children('.title').html();
    let currentDescription = task.children('.description').html();
    let time = task.children('.time').html();
    let date = task.children('.date').html();

    return `
      <input type="text" class="title" value="${currentTitle}">
      <h4 class="date">${date}</h4>
      <h4 class="time">${time}</h4>
      <input type="text" class="description" value="${currentDescription}">
      <button class="cancel-changes">Cancel Changes</button>
      <button class="save-changes">Save Changes</button>
    `
  },

  timerHTML() {
    return `
      <div class="timer">
        <h2>
          <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>
        </h2>
        <button>Start</button>
        <button>Stop</button>
      </div>
    `;
  },

  timerClosePromptHTML() {
    return `
      <div class="timer-close-prompt">
        <h2>Are you sure you want to end the timer? You will lose any time currently on the clock</h2>
        <button class="yes">Yes, I would like to cancel this timer</button>
        <button class="no">No, I want to keep running the timer</button>
      </div>
    `;
  },

  timerSaveHTML() {
    return `
      <div class="timer-save">
        <form action="">
          <input type="text" value="Title">
          <h4 class="time">
            <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>
          </h4>
          <input type="text" value="Description">
        </form>
      </div>
    `;
  }
};