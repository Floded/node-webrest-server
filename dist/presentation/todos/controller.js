"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const todos = [
    { id: 1, text: "buy milk", completedAt: new Date() },
    { id: 2, text: "buy bread", completedAt: null },
    { id: 3, text: "buy eggs", completedAt: new Date() },
];
class TodosController {
    //* DI
    constructor() {
        this.getTodos = (req, res) => {
            res.json(todos);
        };
        this.getTodoById = (req, res) => {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: "ID argument is not a number" });
            const todo = todos.find((todo) => todo.id === id);
            todo
                ? res.status(200).json(todo)
                : res.status(404).json({ error: `TODO with id ${id} not found` });
        };
        this.createTodo = (req, res) => {
            const { text } = req.body;
            if (!text)
                return res.status(400).json({ error: "Text property is required" });
            const newTodo = {
                id: todos.length + 1,
                text: text,
                completedAt: null,
            };
            todos.push(newTodo);
            res.json(newTodo);
        };
        this.updateTodo = (req, res) => {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: "ID argument is not a number" });
            const todo = todos.find((todo) => todo.id === id);
            if (!todo)
                return res.status(404).json({ error: "Todo not exist" });
            const { text, completedAt } = req.body;
            // if (!text)
            //   return res.status(400).json({ error: "Text property is required" });
            todo.text = text || todo.text;
            completedAt === "null"
                ? (todo.completedAt = null)
                : (todo.completedAt = new Date(completedAt || todo.completedAt));
            res.json(todo);
        };
        this.deleteTodo = (req, res) => {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: "ID argument is not a number" });
            const todo = todos.find((todo) => todo.id === id);
            if (!todo)
                return res.status(404).json({ error: "TODO not exist" });
            todos.splice(todos.indexOf(todo), 1);
            res.status(200).json(todo);
        };
    }
}
exports.TodosController = TodosController;
