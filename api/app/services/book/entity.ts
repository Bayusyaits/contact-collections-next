import { 
  Entity, 
  Column, 
  PrimaryColumn,
  Generated,
  BaseEntity,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { BookCollection } from "../book-collection/entity";
import { BookCategory } from "../book-category/entity";
import { PhoneNumber } from "../phone-number/entity";

export enum Status {
  OFFLINE = "offline",
  ONLINE = "online",
}

type Gallery = {
  image: string
}

@Entity()
export class Book extends BaseEntity {
  //https://typeorm.io/relations-faq#how-to-use-relation-id-without-joining-relation
  @PrimaryColumn("char", {length: 100})
  @Generated("uuid")
  uuid: string

  @Column("char", {nullable: true, length: 100})
  fullName: string;

  @OneToMany(() => BookCollection, 
    (bookCollection) => bookCollection.bookUuid,
    {
      cascade: ["insert", "update"],
    })
  @JoinColumn([
      { name: "uuid" }
  ])
  public bookCollections: BookCollection[]

  @OneToMany(() => BookCategory, 
    (bookCategory) => bookCategory.bookUuid,
    {
      cascade: ["insert", "update"],
    })
  @JoinColumn([
      { name: "uuid" }
  ])
  public bookCategories: BookCategory[]

  @OneToMany(() => PhoneNumber, 
    (phoneNumber) => phoneNumber.bookUuid,
    {
      cascade: ["insert", "update"],
    })
  @JoinColumn([
      { name: "uuid" }
  ])
  public phoneNumbers: PhoneNumber[]

  @Column("text", {nullable: true})
  description: string;

  @Column("char", {nullable: true, length: 100})
  email: string;

  @Column("text", {  nullable: true })
  address: string;

  @Column("char", { length: 20, nullable: true })
  type: string;

  @Column("char", {nullable: true, length: 100})
  userUuid: string;

  @Column({ type: "simple-json", nullable: true })
  gallery: Gallery[];
  
  @Column({default: null, nullable: true})
  image: string;

  @Column("char", { length: 60 })
  slug: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.ONLINE
  })
  status: Status

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
  
  @DeleteDateColumn()
  deletedDate: Date;
}
