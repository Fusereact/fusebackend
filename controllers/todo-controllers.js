const HttpError = require("../model/http-error");
const Todo = require("../model/Todo");

const getTodos = async (req, res, next) => {
  let todos;

  try {
    todos = await Todo.find();
  } catch (err) {
    const error = new HttpError("Fetching todos got failed", 500);
    return next(error);
  }
  res.json(todos);
};

const addTodo = async (req, res, next) => {
  const {
    title,
    notes,
    completed,
    deleted,
    startDate,
    dueDate,
    important,
    labels,
    starred,
  } = req.body;
  console.log("todo body", req.body);

  const newTodo = new Todo({
    title: title,
    notes: notes,
    completed: completed,
    deleted: deleted,
    startDate: startDate,
    dueDate: dueDate,
    important: important,
    labels: labels,
    starred: starred,
  });

  console.log("new todo to be added", newTodo);
  let addingTodo;
  try {
    console.log("trying adding todo");
    addingTodo = await newTodo.save();
    return res.status(201).json({
      message: "todo Added",
      todo: addingTodo,
    });
  } catch (err) {
    console.log("That did not go well.");
    return res.status(404).json({
      message: "todo not Added",
    });
  }
};

const updateTodo = async (req, res, next) => {
  console.log("in updating function");

  const {
    _id,
    title,
    notes,
    completed,
    deleted,
    startDate,
    dueDate,
    important,
    labels,
    starred,
  } = req.body;
  console.log(req.body);

  // let updatedEvent

  Todo.findById(_id, (err, todo) => {
    try {
      todo.updateOne(
        {
          _id,
          title,
          notes,
          completed,
          deleted,
          startDate,
          dueDate,
          important,
          labels,
          starred,
        },
        (err, updateTodo) => {
          if (err) {
            console.log("error updating", err);
          } else {
            console.log("yoooooo");
            Todo.findById(_id, (err, foundUpdatedTodo) => {
              console.log(foundUpdatedTodo);
              res.status(201).json({
                message: "Updated todo",
                id: foundUpdatedTodo.id,
                title: foundUpdatedTodo.title,
                startdate: foundUpdatedTodo.startDate,
                dueDate: foundUpdatedTodo.dueDate,
                notes: foundUpdatedTodo.notes,
                completed: foundUpdatedTodo.completed,
                deleted: foundUpdatedTodo.deleted,
                important: foundUpdatedTodo.important,
                labels: foundUpdatedTodo.labels,
                starred: foundUpdatedTodo.starred,
              });
              return foundUpdatedTodo;
            });
          }
        }
      );
    } catch (err) {
      const error = new HttpError("failed updating UpdatedTodo", 500);
      return next(error);
    }
  });
};

const deleteTodo = async (req, res, next) => {
  console.log("dleetinggggg");

  const { id } = req.body;
  console.log(id);

  Todo.findById(id, (err, todo) => {
    try {
      todo.remove((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted successfuly");
          res.status(201).json({
            message: "deleted todo successfully",
            id: id,
          });
        }
      });
    } catch (err) {
      const error = new HttpError("failed deleting todo", 500);
      return next(error);
    }
  });
};

module.exports = { getTodos, addTodo, deleteTodo, updateTodo };
