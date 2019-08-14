import { Article } from './article';

export class ArticleTreeNode {
    article: Article;
    childNodes: ArticleTreeNode[] = [];
}

export class ArticlesTree {
    rootNodes: ArticleTreeNode[];

    constructor(private articles: Article[]) {
        this.initRootNodes();
    }

    private initRootNodes(): void {
        this.rootNodes = [];
        const rootArticles = this.filterArticleByParrent();
        for (const a of rootArticles) {
            this.rootNodes.push(this.seedChildNodes(a));
        }
    }

    private seedChildNodes(article: Article): ArticleTreeNode {
        const childArticles = this.filterArticleByParrent(article.id);
        const resultNode: ArticleTreeNode = new ArticleTreeNode();
        resultNode.article = article;

        for (const a of childArticles) {
            resultNode.childNodes.push(this.seedChildNodes(a));
        }

        return resultNode;
    }

    private filterArticleByParrent(parentId = 0) {
        return this.articles.filter(a => a.parentId === parentId);
    }
}

