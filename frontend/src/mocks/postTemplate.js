import { v4 as uuidv4 } from 'uuid';
export function createPost({ title = '', author = '', content = '', attachments = [], comments = [] } = {}) {
    return {
        id: uuidv4(),
        title,
        author,
        content,
        timestamp: new Date().toISOString(),
        attachments,
        comments,
        likesCount: 0,
        sharesCount: 0,
        commentsCount: comments.length,
    }
}