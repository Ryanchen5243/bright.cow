import { v4 as uuid } from 'uuid';

type PostAttachment = { 
    type: string; 
    url: string 
};
type PostComment = { 
    id: string; 
    author_id: string; 
    author_display_name: string; 
    content: string 
};

export type FeedPost = ReturnType<typeof createPost>;

export function createPost({
    title = '',
    author_id = '',
    author_display_name = '',
    author_user_name = '',
    content = '',
    attachments = [] as PostAttachment[],
    comments = [] as PostComment[],
} = {}) {
    return {
        id: uuid(),
        title,
        author_id,
        author_display_name,
        author_user_name,
        content,
        timestamp: new Date().toISOString(),
        attachments,
        comments,
        likesCount: 0,
        sharesCount: 0,
        commentsCount: comments.length,
    };
}