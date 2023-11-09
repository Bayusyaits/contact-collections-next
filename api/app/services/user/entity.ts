import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("char", {default: null, length: 100})
  @Generated("uuid")
  uuid: string
  
  @Column("char", { length: 120 })
  password: string;

  @Column("char", { length: 30 })
  firstName: string;

  @Column("char", { length: 30, default: null })
  lastName: string;

  @Column("char", { length: 70 })
  userName: string;

  @Column("char", { length: 20, default: null })
  birthdayDate: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
