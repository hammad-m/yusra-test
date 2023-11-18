import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";

import { ApiResponse, apiResponseErrorHandler } from "../../../shared/api-response";
import { CreateTodoDto } from "../dtos/create-todo.dto";
import { UpdateTodoDto } from "../dtos/update-todo.dto";
import { TodoService } from "../services/todo.service";

@Controller( "api/todo" )
export class TodoController {
  constructor( private readonly todoService: TodoService ) {}

  @Post()
  async insertTodo(
    @Body( new ValidationPipe( { transform: true } ) ) createTodoDto: CreateTodoDto
  ) {
    try {
      await this.todoService.insertTodo( createTodoDto );
      return new ApiResponse( true, "Todo Created" );
    } catch( error ) {
      return apiResponseErrorHandler( error );
    }
  }

  @Patch( ":id" )
  async updateTodo(
    @Param( "id", new ValidationPipe( { transform: true } ) ) id: number,
    @Body( new ValidationPipe( { transform: true } ) ) updateTodoDto: UpdateTodoDto
  ) {
    try {
      await this.todoService.updateTodo( id, updateTodoDto );
      return new ApiResponse( true, "Todo updated" );
    } catch( error ) {
      return apiResponseErrorHandler( error );
    }
  }

  @Delete( ":id" )
  async deleteTodo(
    @Param( "id", new ValidationPipe( { transform: true } ) ) id: number,
  ) {
    try {
      await this.todoService.softDelete( id );
      return new ApiResponse( true, "Todo deleted" );
    } catch( error ) {
      return apiResponseErrorHandler( error );
    }
  }

  @Get()
  async getAllTodos() {
    try {
      const todos = await this.todoService.getAllTodos();
      return new ApiResponse( true, todos );
    } catch( error ) {
      return apiResponseErrorHandler( error );
    }
  }

  @Get( "completed" )
  async getCompletedTodos() {
    try {
      const completedTodos = await this.todoService.getCompletedTodos();
      return new ApiResponse( true, completedTodos );
    } catch( error ) {
      return apiResponseErrorHandler( error );
    }
  }

  @Get( "missed" )
  async getMissedTodos() {
    try {
      const missedTodos = await this.todoService.getMissedTodos();
      return new ApiResponse( true, missedTodos );
    } catch( error ) {
      return apiResponseErrorHandler( error );
    }
  }

  @Get( "pending" )
  async getPendingTodos() {
    try {
      const pendingTodos = await this.todoService.getPendingTodos();
      return new ApiResponse( true, pendingTodos );
    } catch( error ) {
      return apiResponseErrorHandler( error );
    }
  }

  @Get( ":id" )
  async getTodoById( @Param( "id", new ValidationPipe( { transform: true } ) ) id: number ) {
    try {
      const todo = await this.todoService.getTodoById( id );
      return new ApiResponse( true, todo );
    } catch( error ) {
      return apiResponseErrorHandler( error );
    }
  }
}
