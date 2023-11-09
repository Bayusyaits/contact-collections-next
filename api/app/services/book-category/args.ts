import PaginatedResponse from '../../helpers/paginated-response';
import { Field, ArgsType, ObjectType } from 'type-graphql';
@ArgsType()
export default class Args {
  @Field({ defaultValue: 10 })
  limit: number;

  @Field({ defaultValue: 0 })
  offset: number;

  @Field({ nullable: true })
  uuid?: string;

  @Field({ nullable: true })
  orderBy?: string;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  userUuid?: string;
}

export class BookCategory {
    @Field()
    id: number;
  
    @Field()
    bookUuid: string;
  
    @Field()
    uuid: string;
  
    @Field()
    userUuid: string;
  }
  
@ObjectType()
export class BookCategoryResponse extends PaginatedResponse(BookCategory) {
  constructor(bookBookCategoryResponse: BookCategoryResponse) {
    super();
    Object.assign(this, bookBookCategoryResponse);
  }
}
