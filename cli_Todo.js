const fs = require("fs");

const command = process.argv[2];
const argument = process.argv[3];

function loadTasks() {
  const data = fs.readFileSync("tasks.json", "utf-8");
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
}

function addTask(task) {
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
  console.log("Task added!");
}

function listTasks() {
  const tasks = loadTasks();
  console.log("Your Tasks:");
  for (let i = 0; i < tasks.length; i++) {
    console.log((i + 1) + ". " + tasks[i]);
  }
}

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else {
  console.log("Command not found");
}
