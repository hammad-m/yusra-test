import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { TodoRepository } from "../repositories/todo.repository";
import { TodoService } from "./todo.service";

describe( "TodoService", () => {
  let service: TodoService;

  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [
        TodoService,
        {
          provide: TodoRepository,
          useFactory: () => ( {} )
        }
      ],
    } ).compile();

    service = module.get<TodoService>( TodoService );
  } );

  it( "should be defined", () => {
    expect( service ).toBeDefined();
  } );
} );
