export type BlockId = string;

export type BlockType = 'PlainText' | 'Image' | 'Layout' | 'Column';

export type Block = {
  id: BlockId;
  type: BlockType;
  options?: Record<string, string>;
  data?: ImageData;
  children?: Block[];
};

export type ImageData = {
  width?: string | number;
  height?: string | number;
  description?: string;
  createdAt?: string;
  text?: string;
};




