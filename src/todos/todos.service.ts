import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';

Injectable();
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(dto: CreateTodoDto) {
    const todo = this.todoRepository.create(dto);
    return this.todoRepository.save(todo);
  }

  findMany() {
    return this.todoRepository.find();
  }

  async update(id: number, dto: CreateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    // check that record exists
    Object.assign(todo, dto);

    return this.todoRepository.save(todo);
  }

  async delete(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    // check that record exists
    return this.todoRepository.remove(todo);
  }
}
