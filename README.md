# CMS360 SDK Documentation (JS)

**[Report a bug/issue 🪲](https://github.com/codemania-dev/cms-sdk/issues)**

**Prerequisite: Your API Key (16 digits alphanumeric). Head over to [our website](https://cms.pyvot360.com) to create yours for free!**

### Installation
- **Unpkg**
    ```
  <script src="https://unpkg.com/@pyvot360/cms" type="module" ></script>
  ```
  
- **NPM**
    ```
  npm i @pyvot360/cms
    ```

- **YARN**
    ```
  yarn add @pyvot360/cms
    ```
  
### Import
    ```
    const {ClientSDK} = require("@pyvot360/cms");
    // import {ClientSDK} from "@pyvot360/cms";

    const sdk = new ClientSDK('YOUR-API-KEY');
    ```

### Methods
- `sdk.getAll()` **(async)** Fetches all articles
- `sdk.getById(articleId: string)` **(async)** Fetches one article by id
- `sdk.getByUrl(articleUrl: string)` **(async)** Fetches one article by url string
- `sdk.getTopics()` **(async)** Fetches all topics
- `sdk.search(filters: ArticleFilters)` [*](#types-&-interfaces) **(async)** Fetches articles related to search filters
- `sdk.viewed(articleId: string)` **(async)** Updates the view count of an article
##### Note: All methods are async (return a promise). You may choose to handle that using `await` or `.then()`

### Types & Interfaces
```
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
    getAll():  Promise<Article[]>;
    getById(articleId: string): Promise<Article | undefined>;
    getByUrl(articleUrl: string): Promise<Article | undefined>;
    getTopics(): Promise<string[]>;
    search(filters: ArticleFilters): Promise<Article[]>;
    viewed(articleId: string);
}
```