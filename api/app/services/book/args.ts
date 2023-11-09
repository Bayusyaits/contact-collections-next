import PaginatedResponse from '../../helpers/paginated-response';
import { Field, ArgsType, ObjectType } from 'type-graphql';
@ArgsType()
export default class Args {
  @Field({ defaultValue: 10 })
  limit: number;

  @Field({ defaultValue: 0 })
  offset: number;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  sortBy?: string;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  slug?: string;
}

@ObjectType()
export class Book {
  @Field()
  uuid: string;

  @Field()
  fullName: string;

  @Field()
  status: string;

  @Field()
  image: string;

  @Field()
  address: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;

  @Field()
  userUuid: string;

  // @Field(() => [Gallery])
  // gallery: Gallery[];

  @Field()
  type: string;

  @Field()
  slug: string;
}

@ObjectType()
export class Gallery {
  @Field()
  image: string;
}


// we need to create a temporary class for the abstract, generic class "instance"
@ObjectType()
export class BookResponse extends PaginatedResponse(Book) {
  // simple helper for creating new instances easily
  constructor(categoryResponse: BookResponse) {
    super();
    Object.assign(this, categoryResponse);
  }

  // you can add more fields here if you need
}
