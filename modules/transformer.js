const defaultConfig = {
	queue: [],
	debug: false
};

/*
*	So this is a middleware module I threw together for a hobby project a bit ago just because I wanted to build my own
* The Koa / Express middleware generators don't permit arg accumulation, which breaks some of my immutable builds
* It was originally part of a page scraper for building a database
* I made it generic enough to use anywhere because I realized it was useful
*/

class Transformer {
	constructor(config = defaultConfig) {
		this.debug = config.debug;
		this.queue = Array.isArray(config.queue) ? config.queue : [];
		if (this.debug) { console.info(`${this.logTag()} Created new task queue: ${this.queue.length}`); }
	}

	logTag() {
		return `\x1b[45m${this.constructor.name}:\x1b[0m`;
	}

	addTask(task = () => { }) {
		if (this.debug) { console.info(`${this.logTag()} Adding task: ${task.name}`); }
		this.queue.push(task);
	}

	addTasks(tasks = []) {
		tasks = Array.isArray(tasks) ? tasks : [tasks];
		tasks.forEach((task) => { this.addTask.call(this, task); });
	}

	onComplete(...args) {
		if (this.debug) { console.info(`${this.logTag()} Completed all tasks`); }
		return Promise.resolve(args);
	}

	executeTask(index, ...args) {
		const task = this.queue[index] ? this.queue[index] : this.onComplete;
		if (this.debug) { console.info(`${this.logTag()} Executing task ${index}: ${task.name}`); }
		return task.call(this, this.executeTask.bind(this, ++index, ...args), ...args);
	}

	async execute(...args) {
		try {
			if (this.debug) { console.info(`${this.logTag()} Executing transformation tasks...`); }
			return await this.executeTask(0, ...args);
		} catch (err) {
			if (this.debug) { console.error(`${this.logTag()} Failed!`); }
			throw err;
		}
	}
}

module.exports = Transformer;
