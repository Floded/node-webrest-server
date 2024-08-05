import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todo = await prisma.todo.findMany({});
    res.status(200).json(todo);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todos = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    todos
      ? res.status(200).json(todos)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error: error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id,
    });
    if (error) res.status(400).json({ error: error });

    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (!todo) return res.status(404).json({ error: "Todo not exist" });

    const update = await prisma.todo.update({
      where: {
        id: id,
      },
      data: updateTodoDto!.values,
    });

    res.json(updateTodoDto);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (!todo) return res.status(404).json({ error: "TODO not exist" });

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json(deletedTodo);
  };
}
