import { supabase } from '@/lib/supabaseClient';
import { Comment, DeleteCommentParams } from '@/types/comment';
import { withSupabaseHandler } from '@/api/utils';

/**  영화 댓글 조회  */
export const fetchComments = (movieId: number) =>
  withSupabaseHandler(supabase.from('Comments').select('*').eq('movie_id', movieId));

/** 영화 댓글 추가 */
export const addComment = (commentData: Comment) =>
  withSupabaseHandler(supabase.from('Comments').insert([commentData]));

/**  영화 댓글 삭제  */
export const deleteComment = ({ movieId, userId }: DeleteCommentParams) =>
  withSupabaseHandler(supabase.from('Comments').delete().eq('movie_id', movieId).eq('user_id', userId));
