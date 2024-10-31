export type NewLinkInput = {
  title: string;
  url: string;
  tags: string[];
};

export type EditLinkInput = {
  id: number;
  title: string;
  url: string;
  tags?: string[];
}

export type TagConnection = {
  id: number;
}