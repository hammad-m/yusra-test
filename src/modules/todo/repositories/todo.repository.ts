import { Injectable } from "@nestjs/common";
import { DataSource, LessThan, MoreThan, Repository } from "typeorm";

import type { CreateTodoDto } from "../dtos/create-todo.dto";
import type { UpdateTodoDto } from "../dtos/update-todo.dto";
import { TodoEntity } from "../entities/todo.entity";

@Injectable()
export class TodoRepository extends Repository<TodoEntity> {
  constructor( private dataSource: DataSource ) {
    super( TodoEntity, dataSource.createEntityManager() );
  }

  createTodo( createTodo: CreateTodoDto ) {
    return this.create( createTodo );
  }

  insertTodo( todo: TodoEntity ) {
    return this.insert( todo );
  }

  updateTodo( todo: UpdateTodoDto ) {
    return this.update( todo.id, todo );
  }

  softDeleteTodo( id: number ) {
    return this.softDelete( id );
  }

  getAllTodos() {
    return this.find();
  }

  getCompletedTodos() {
    return this.find( {
      where: {
        isCompleted: true
      }
    } );
  }

  getMissedTodos() {
    return this.find( {
      where: {
        isCompleted: false,
        deadline: LessThan( new Date() )
      }
    } );
  }

  getPendingTodos() {
    return this.find( {
      where: {
        isCompleted: false,
        deadline: MoreThan( new Date() )
      }
    } );
  }

  getTodoById( id: number ) {
    return this.find( {
      where: { id }
    } );
  }
}
