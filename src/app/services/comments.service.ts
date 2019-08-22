import { Comment } from '@app/models/comment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface AddParams {
    articleId: number;
    text: string;
}

interface EditParams {
    id: number;
    text: string;
}

interface AddResponse { id: number; }

const BASE_COMMENT_URL = '/api/comment';

export class CommentsService {

    constructor(
        private httpClient: HttpClient,
    ) {
    }

    public add(params: AddParams): Observable<AddResponse> {
        return this.httpClient.post<AddResponse>(BASE_COMMENT_URL, { comment: params });
    }

    public delete(commentId: number): Observable<unknown> {
        return this.httpClient.delete(`${BASE_COMMENT_URL}/${commentId}`);
    }

    public getCommentsByArticleId(articleId: number): Observable<Comment[]>  {
        return this.httpClient.get(BASE_COMMENT_URL, {
            params: new HttpParams()
                .set('articleId', articleId.toString())
        }).pipe(
            map((response: any) => response.comments)
        );
    }

    public edit(params: EditParams): Observable<unknown> {
        return this.httpClient.put(`${BASE_COMMENT_URL}/${params.id}`, { comment: { text: params.text } });
    }
}
