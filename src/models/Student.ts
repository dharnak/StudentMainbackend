import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Department } from './Department';

@Table({
  tableName: 'demotable', 
  timestamps: false,
})
export class Student extends Model {
  @Column({ type: DataType.STRING })
  firstname!: string;

  @Column({ type: DataType.STRING })
  lastname!: string;

  @Column({ type: DataType.INTEGER, primaryKey: true })
  id!: number;

  @Column({ type: DataType.STRING })
  address!: string;

  @Column({ type: DataType.STRING })
  class!: string;

  @Column({ type: DataType.STRING })
  busnumber!: string;

  @Column({ type: DataType.STRING })
  fees!: string;

  @Column({ type: DataType.STRING })
  gender!: string;

  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER })
  departmentId!: number;

  @BelongsTo(() => Department)
  department!: Department;
}
