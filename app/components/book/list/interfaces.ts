export interface Payload {
  collections: string[]
}

export interface Props {
  onFinish: (val: Payload) => void
  sortBy?: string,
  onSwitch: () => void
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