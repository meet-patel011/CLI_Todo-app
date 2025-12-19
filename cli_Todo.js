const fs = require("fs");

const command = process.argv[2];
const argument1 = process.argv[3];
const argument2 = process.argv[4];

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
  console.log("Task added");
}

function listTasks() {
  const tasks = loadTasks();

  if (tasks.length === 0) {
    console.log("No tasks found");
    return;
  }

  console.log("Your Tasks:");
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
}

function deleteTask(index) {
  const tasks = loadTasks();

  if (index < 1 || index > tasks.length) {
    console.log("Invalid task number");
    return;
  }

  tasks.splice(index - 1, 1);
  saveTasks(tasks);
  console.log("Task deleted");
}

function updateTask(index, newTask) {
  const tasks = loadTasks();

  if (index < 1 || index > tasks.length) {
    console.log("Invalid task number");
    return;
  }

  tasks[index - 1] = newTask;
  saveTasks(tasks);
  console.log("Task updated");
}

if (command === "add") {
  addTask(argument1);

} else if (command === "list") {
  listTasks();

} else if (command === "delete") {
  deleteTask(parseInt(argument1));

} else if (command === "update") {
  updateTask(parseInt(argument1), argument2);

} else {
  console.log(`
Unknown command

Available commands:
node todo.js add "Task name"
node todo.js list
node todo.js delete <taskNumber>
node todo.js update <taskNumber> "New task name"
`);
}
