// for purpose of json data generation
import { v4 as uuid } from 'uuid';
export default function createPostJSONObject(
    title: string,
    author_id: string,
    content: string,
    attachments: { type: string; url: string }[],
    comments: { id: string; author_id: string; content: string }[],
    ) {
    return {
        id : uuid(),
        title,
        author_id,
        content,
        timestamp: new Date().toISOString(),
        attachments,
        comments,
        likesCount: 0,
        sharesCount: 0,
        commentsCount: 0,
    };
}