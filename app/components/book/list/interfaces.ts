export interface Payload {
  collections: string[]
}

export interface PayloadCollection {
  bookCollections: {
    collectionUuid?: {
      uuid: string
    }
  }[]
}

export interface Props {
  onFinish: (val: Payload) => void
  orderBy?: string,
  onSwitch: () => void
  field?: PayloadCollection
};


export interface BookProps {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  type: string;
  fetchLimit?: number;
  loadMore?: boolean;
};