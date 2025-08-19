import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Student } from './Student';

@Table({ tableName: 'departments', timestamps: false })
export class Department extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.STRING, unique: true })
  name!: string;

  @HasMany(() => Student)
  students!: Student[];
}
