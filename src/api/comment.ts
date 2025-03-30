import { supabase } from '@/lib/supabaseClient';
import { Comment, DeleteCommentParams } from '@/types/comment';
import { withSupabaseHandler } from '@/api/utils';

/**  영화 댓글 조회  */
export const fetchComments = (movieId: number) =>
  withSupabaseHandler(
    supabase.from('Comments').select('*').eq('movie_id', movieId).order('created_at', {
      ascending: true,
    }),
  );

/** 영화 댓글 추가 */
export const addComment = (commentData: Comment) =>
  withSupabaseHandler(supabase.from('Comments').insert([commentData]));

/**  영화 댓글 삭제  */
export const deleteComment = ({ userId, commentId }: DeleteCommentParams) =>
  withSupabaseHandler(supabase.from('Comments').delete().eq('id', commentId).eq('user_id', userId));
