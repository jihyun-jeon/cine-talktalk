import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, fetchComments } from '@/api/comment';
import { ERROR_MESSAGES } from '@/contants';
import { Comment, DeleteCommentParams } from '@/types/comment';

/**  영화 댓글 조회  */
export const useGetCommentsQuery = (movieId: number) =>
  useQuery({
    queryFn: () => fetchComments(movieId),
    queryKey: CommentQueryKey.getMany(movieId),
  });

/** 영화 댓글 추가 */
export const useAddCommentMutation = (movieId: number, options?: UseMutationOptions<null, Error, Comment>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: CommentQueryKey.getMany(movieId) });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      alert(ERROR_MESSAGES.DEFAULT);
      options?.onError?.(error, variables, context);
    },
  });
};

/**  영화 댓글 삭제  */
export const useDeleteCommentMutation = (
  movieId: number,
  options?: UseMutationOptions<null, Error, DeleteCommentParams>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: CommentQueryKey.getMany(movieId) });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      alert(ERROR_MESSAGES.DEFAULT);
      options?.onError?.(error, variables, context);
    },
  });
};

export const CommentQueryKey = {
  all: ['comment'],
  getMany: (movieId: number) => [...CommentQueryKey.all, 'getMany', movieId],
};
