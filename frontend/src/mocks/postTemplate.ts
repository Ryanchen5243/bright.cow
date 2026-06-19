import { v4 as uuid } from 'uuid';

type PostAttachment = { type: string; url: string };
type PostComment = { id: string; author: string; content: string };

export type FeedPost = ReturnType<typeof createPost>;

export function createPost({
    title = '',
    author = '',
    content = '',
    attachments = [] as PostAttachment[],
    comments = [] as PostComment[],
} = {}) {
    return {
        id: uuid(),
        title,
        author,
        content,
        timestamp: new Date().toISOString(),
        attachments,
        comments,
        likesCount: 0,
        sharesCount: 0,
        commentsCount: comments.length,
    };
}