import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { TodoService } from "../services/todo.service";
import { TodoController } from "./todo.controller";

describe( "TodoController", () => {
  let controller: TodoController;

  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      controllers: [ TodoController ],
      providers: [
        {
          provide: TodoService,
          useFactory: () => ( {} )
        }
      ],
    } ).compile();

    controller = module.get<TodoController>( TodoController );
  } );

  it( "should be defined", () => {
    expect( controller ).toBeDefined();
  } );
} );
