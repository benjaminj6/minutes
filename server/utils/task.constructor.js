module.exports = function(id, title, date, time, description) {
	let newTask = {
		_id: id,
		title: title,
		date: new Date(date),
		time: time,
		description: description
	};

	return newTask;
};