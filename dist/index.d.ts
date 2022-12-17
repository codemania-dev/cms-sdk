export declare interface Article {
  id?: string;
  title: string;
  author: Partial<Author>;
  banner: string;
  content: string;
  tags: string[];
  stats?: ArticleStats;
  dateWritten?: number;
  dateEditted?: number;
  isPublished: boolean;
  _secondaryKey?: string;
  url?: string;
}

export declare interface ArticleStats {
  views: number;
}

export declare interface Author {
  name?: string;
  bio?: string;
  email?: string;
  avatar?: string;
}

export declare interface ArticleFilters {
  title?: string;
  tag?: string;
  author?: string;
}

export declare class ClientSDK {
  constructor(key: string);
  getAll(): Promise<Article[]>;
  getOne(articleId: string): Promise<Article | undefined>;
  getTopics(): Promise<string[]>;
  search(filters: ArticleFilters): Promise<Article[]>;
  viewed(articleId: string);
}
