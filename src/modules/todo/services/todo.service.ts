import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import type { CreateTodoDto } from "../dtos/create-todo.dto";
import type { UpdateTodoDto } from "../dtos/update-todo.dto";
import { TodoRepository } from "../repositories/todo.repository";

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  insertTodo( createTodoDto: CreateTodoDto ) {
    const todo = this.todoRepository.createTodo( createTodoDto );
    return this.todoRepository.insertTodo( todo );
  }

  updateTodo( id: number, updateTodoDto: UpdateTodoDto ) {
    if( ! id ) {
      throw new BadRequestException( "id missing from body" );
    }

    updateTodoDto.id = id;
    return this.todoRepository.updateTodo( updateTodoDto );
  }

  softDelete( id: number ) {
    return this.todoRepository.softDeleteTodo( id );
  }

  getAllTodos() {
    return this.todoRepository.getAllTodos();
  }

  getCompletedTodos() {
    return this.todoRepository.getCompletedTodos();
  }

  getMissedTodos() {
    return this.todoRepository.getMissedTodos();
  }

  getPendingTodos() {
    return this.todoRepository.getPendingTodos();
  }

  async getTodoById( id: number ) {
    const todo = await this.todoRepository.getTodoById( id );

    if( ! todo ) {
      throw new NotFoundException( "Todo not found" );
    }

    return todo;
  }
}
