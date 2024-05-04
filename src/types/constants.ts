export type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
};

export interface ColumnDetails {
  label: string;
  sortkey: string;
  width: string;
}

export interface Columns {
  [key: string]: ColumnDetails;
}
