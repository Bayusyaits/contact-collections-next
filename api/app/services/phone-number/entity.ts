import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Book } from "../book/entity";
@Entity()
export class PhoneNumber extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("char", {
    nullable: true, 
    length: 100,
    unique: true
  })
  uuid: string;

  @Column("char", {nullable: true, length: 100})
  userUuid: string;

  @ManyToOne(() => Book, (book) => book.uuid, {
    cascade: ["insert", "update", "remove", "soft-remove"],
    lazy: true
  })
  @JoinColumn([
    { name: "bookUuid", referencedColumnName: 'uuid' }
  ])
  public bookUuid: Book;
  
  @Column("char", {nullable: true, length: 100})
  phoneNumber: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
  
  @DeleteDateColumn()
  deletedDate: Date;
}
