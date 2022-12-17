import axios from "axios";
import { Article, ArticleFilters, ClientSDK as cSDK } from "../index.d";

interface Cache {
  posts?: Array<Article>;
  topics?: Array<string>;
  lastUpdated: number;
}

const _header = (key: string = "") => {
  return {
    "Content-Type": "application/json",
    "X-360API-KEY": key,
  };
};

export class ClientSDK implements cSDK {
  private cache: Cache = { lastUpdated: 0 };
  private ENDPOINT = "https://cms.backend.pyvot360.com";

  constructor(private key: string) {}

  async getAll(): Promise<Article[]> {
    if (this.cache.posts && !this.isCacheExpired()) {
      return new Promise((res) => res(this.cache.posts || []));
    }

    const response = await axios.get(`${this.ENDPOINT}/article/get-all`, {
      headers: _header(this.key),
      validateStatus: function (status) {
        return status < 505; // Resolve only if the status code is less than 500
      },
    });

    if (response.status !== 200) return [];

    const posts = Object.values(response.data) as Article[];

    this.cache.posts = posts;
    this.cache.lastUpdated = Date.now();
    return posts;
  }

  async getOne(articleId: string) {
    if (this.cache.posts && !this.isCacheExpired()) {
      return this.cache.posts?.filter((p) => p.id === articleId)[0] || [];
    }
    const response = await axios.post(
      `${this.ENDPOINT}/article/get`,
      {
        id: articleId,
      },
      {
        headers: _header(this.key),
        validateStatus: function (status) {
          return status < 505; // Resolve only if the status code is less than 500
        },
      }
    );

    if (response.status !== 200) return;

    return Object.values(response.data)[0] as Article;
  }

  async getTopics() {
    if (this.cache.topics && !this.isCacheExpired()) {
      return this.cache.topics;
    }

    const response = await axios.get(`${this.ENDPOINT}/article/get-topics`, {
      headers: _header(this.key),
      validateStatus: function (status) {
        return status < 505; // Resolve only if the status code is less than 500
      },
    });

    if (response.status !== 200) return [];

    const topics = Object.values(response.data) as string[];

    this.cache.topics = topics;
    this.cache.lastUpdated = Date.now();
    return topics;
  }

  async search(filters: ArticleFilters) {
    const { title, tag, author } = filters;

    const response = await axios.get(
      `${this.ENDPOINT}/article/search?${title ? `title=${title}&` : ""}${
        tag ? `topic=${tag}&` : ""
      }${author ? `topic=${author}` : ""}`,
      {
        headers: _header(this.key),
        validateStatus: function (status) {
          return status < 505; // Resolve only if the status code is less than 500
        },
      }
    );

    if (response.status !== 200) return [];

    return Object.values(response.data) as Article[];
  }

  async viewed(articleId: string) {
    const response = await axios.post(
      `${this.ENDPOINT}/article/update-view`,
      {
        id: articleId,
      },
      {
        headers: _header(this.key),
        validateStatus: function (status) {
          return status < 505; // Resolve only if the status code is less than 500
        },
      }
    );

    if (response.status !== 200) console.error("Sync error!");
  }

  private isCacheExpired() {
    return (Date.now() - this.cache.lastUpdated) / (1000 * 60 * 60) > 5;
  }
}
