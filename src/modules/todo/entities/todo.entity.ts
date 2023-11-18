import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity( "todo" )
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn( { name: "created_at", type: "timestamptz" } )
  createdAt: Date;

  @UpdateDateColumn( { name: "updated_at", type: "timestamptz" } )
  updateAt: Date;

  @DeleteDateColumn( { name: "deleted_at", type: "timestamptz" } )
  deletedAt: Date;

  @Column( { name: "is_completed", type: "boolean", default: false } )
  isCompleted: boolean;

  @Column( { type: "citext" } )
  name: string;

  @Column( { type: "citext" } )
  description: string;

  @Column( { type: "timestamptz" } )
  deadline: Date;
}

