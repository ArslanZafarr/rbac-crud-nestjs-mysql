// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
// import { User } from './user.entity';

// @Entity()
// export class Role {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @ManyToMany(() => User, user => user.roles)
//   users: User[];
// }

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity'; // Import User entity

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.roles)
  @JoinTable()
  users: User[];
}
