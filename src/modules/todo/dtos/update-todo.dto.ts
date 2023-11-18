import { PartialType } from "@nestjs/mapped-types";
import { IsOptional } from "class-validator";

import { CreateTodoDto } from "./create-todo.dto";

export class UpdateTodoDto extends PartialType( CreateTodoDto ) {
  @IsOptional()
  id: number;

  @IsOptional()
  isCompleted: boolean;
}
