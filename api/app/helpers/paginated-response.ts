import { ClassType, ObjectType, Field, Int } from 'type-graphql';

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    @Field(type => [TItemClass])
    items: Promise<TItem[]>;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    @Field(type => Int)
    total: number;

    @Field()
    offset: number;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    @Field()
    page: number;

    @Field()
    limit: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass;
}
