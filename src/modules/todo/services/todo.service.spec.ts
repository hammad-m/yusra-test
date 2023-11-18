import { BadRequestException } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import type { CreateTodoDto } from "../dtos/create-todo.dto";
import type { UpdateTodoDto } from "../dtos/update-todo.dto";
import type { TodoEntity } from "../entities/todo.entity";
import { TodoRepository } from "../repositories/todo.repository";
import { TodoService } from "./todo.service";

describe( "TodoService", () => {
  let todoService: TodoService;
  let todoRepository: TodoRepository;

  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [
        TodoService,
        {
          provide: TodoRepository,
          useValue: {
            createTodo: jest.fn(),
            insertTodo: jest.fn(),
            updateTodo: jest.fn(),
            softDeleteTodo: jest.fn(),
            getAllTodos: jest.fn(),
            getCompletedTodos: jest.fn(),
            getMissedTodos: jest.fn(),
            getPendingTodos: jest.fn(),
            getTodoById: jest.fn(),
          },
        },
      ],
    } ).compile();

    todoService = module.get<TodoService>( TodoService );
    todoRepository = module.get<TodoRepository>( TodoRepository );
  } );

  // ... (insertTodo and updateTodo test cases)

  describe( "insertTodo", () => {
    it( "should call createTodo and insertTodo from TodoRepository", () => {
      const createTodoDto: CreateTodoDto = {
        name: "Test Todo",
        description: "Test description",
        deadline: new Date(),
      };

      const todoEntity: TodoEntity = {
        id: 1,
        createdAt: new Date(),
        updateAt: new Date(),
        deletedAt: null,
        isCompleted: false,
        name: createTodoDto.name,
        description: createTodoDto.description,
        deadline: createTodoDto.deadline,
      };

      jest.spyOn( todoRepository, "createTodo" ).mockReturnValue( todoEntity );

      todoService.insertTodo( createTodoDto );

      expect( todoRepository.createTodo ).toHaveBeenCalledWith( createTodoDto );
      expect( todoRepository.insertTodo ).toHaveBeenCalledWith( todoEntity );
    } );
  } );


  describe( "softDelete", () => {
    it( "should call softDeleteTodo from TodoRepository with correct parameter", () => {
      const id = 1;

      todoService.softDelete( id );
      expect( todoRepository.softDeleteTodo ).toHaveBeenCalledWith( id );
    } );
  } );

  describe( "updateTodo", () => {
    it( "should call updateTodo from TodoRepository with correct parameters", () => {
      const id = 1;
      const updateTodoDto: UpdateTodoDto = {
        name: "Updated Todo",
        description: "Updated description",
        deadline: new Date(),
      } as UpdateTodoDto;

      jest.spyOn( todoRepository, "updateTodo" );
      todoService.updateTodo( id, updateTodoDto );

      expect( todoRepository.updateTodo ).toHaveBeenCalledWith( {
        ...updateTodoDto,
        id,
      } );
    } );

    it( "should throw BadRequestException when id is missing", () => {
      const updateTodoDto: UpdateTodoDto = {
        name: "Updated Todo",
        description: "Updated description",
        deadline: new Date(),
      } as UpdateTodoDto;

      expect( () => todoService.updateTodo( undefined, updateTodoDto ) ).toThrow( BadRequestException );
    } );
  } );

  describe( "getAllTodos", () => {
    it( "should call getAllTodos from TodoRepository", () => {
      jest.spyOn( todoRepository, "getAllTodos" );
      todoService.getAllTodos();

      expect( todoRepository.getAllTodos ).toHaveBeenCalled();
    } );
  } );

  describe( "getCompletedTodos", () => {
    it( "should call getCompletedTodos from TodoRepository", () => {
      jest.spyOn( todoRepository, "getCompletedTodos" );
      todoService.getCompletedTodos();

      expect( todoRepository.getCompletedTodos ).toHaveBeenCalled();
    } );
  } );

  describe( "getMissedTodos", () => {
    it( "should call getMissedTodos from TodoRepository", () => {
      jest.spyOn( todoRepository, "getMissedTodos" );

      todoService.getMissedTodos();
      expect( todoRepository.getMissedTodos ).toHaveBeenCalled();
    } );
  } );

  describe( "getPendingTodos", () => {
    it( "should call getPendingTodos from TodoRepository", () => {
      jest.spyOn( todoRepository, "getPendingTodos" );
      todoService.getPendingTodos();

      expect( todoRepository.getPendingTodos ).toHaveBeenCalled();
    } );
  } );

  describe( "getTodoById", () => {
    it( "should call getTodoById from TodoRepository with correct parameter", () => {
      const id = 1;

      const todoEntity: TodoEntity = {
        id,
        createdAt: new Date(),
        updateAt: new Date(),
        deletedAt: null,
        isCompleted: false,
        name: "name",
        description: "description",
        deadline: new Date()
      };

      jest.spyOn( todoRepository, "getTodoById" ).mockResolvedValue( [ todoEntity ] );
      todoService.getTodoById( id );

      expect( todoRepository.getTodoById ).toHaveBeenCalledWith( id );
    } );
  } );
} );
