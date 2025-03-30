import React, { useEffect, useState } from 'react';
import { useAddCommentMutation, useDeleteCommentMutation, useGetCommentsQuery } from '@/hooks/query/useComment';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import clsx from 'clsx';

const Comments = ({ movieId }: { movieId: number }) => {
  const initialCommentState = { review: '', vote: 0 };
  const [comment, setComment] = useState(initialCommentState);

  const getUser = useAuth();
  const userId = getUser.session?.user.id;
  const userEmail = getUser.session?.user.email;

  const comments = useGetCommentsQuery(movieId);

  const addCommnet = useAddCommentMutation(movieId);
  const deleteCommnet = useDeleteCommentMutation(movieId);

  const handleSubmitComment = () => {
    if (!userId || !userEmail) {
      console.log('userId or userEmail undefined!');
      return;
    }

    const commentData = {
      user_id: userId,
      user_name: userEmail,
      movie_id: movieId,
      review: comment.review,
      vote: comment.vote,
    };

    addCommnet.mutate(commentData, {
      onSuccess: (data, variables, context) => {
        // 추가적인 성공 처리
      },
      onError: (error, variables, context) => {
        // 추가적인 에러 처리
      },
    });
    setComment(initialCommentState);
  };

  const handleDeleteComment = (commentId: number) => {
    if (!userId) return;

    const isConfirmed = confirm('메시지를 삭제하시겠습니까?');
    if (!isConfirmed) return;

    const deleteData = { userId, commentId };
    deleteCommnet.mutate(deleteData, {
      onSuccess: (data) => {
        // 추가적인 성공 처리
      },
      onError: (error) => {
        // 추가적인 에러 처리
      },
    });
  };

  // 댓글 상태 업데이트
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment((prevState) => ({ ...prevState, review: e.target.value }));
  };

  const handleVoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment((prevState) => ({ ...prevState, vote: Number(e.target.value) }));
  };

  useEffect(() => {
    // 실시간 구독 설정
    const channel = supabase
      .channel(`comments-${movieId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Comments',
          filter: `movie_id=eq.${movieId}`,
        },
        () => {
          comments.refetch(); // 실시간 업데이트 시 React Query 캐시 갱신
        },
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to comments channel');
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [movieId]);

  return (
    <div>
      <ul className="min-h-[400px] border p-3">
        {comments.data?.map((comment) => (
          <li
            key={comment.id}
            className={clsx('mb-4 max-w-[80%] rounded-[20px] px-4 py-3 relative', {
              'ml-auto bg-gray-400 text-white': comment.user_name === userEmail,
              'bg-gray-100 text-gray-900': comment.user_name !== userEmail,
            })}
          >
            <div
              className={clsx('mb-1 text-sm', {
                'text-gray-200': comment.user_name === userEmail,
                'text-gray-600': comment.user_name !== userEmail,
              })}
            >
              {comment.user_name}
            </div>
            <div className="text-base">{comment.review}</div>
            {comment.user_name === userEmail && (
              <button
                type="button"
                onClick={() => handleDeleteComment(comment.id)}
                className=" absolute right-[-5px] top-[-5px] bg-gray-600 rounded-[50%] w-4 h-4 text-xs flex items-center justify-center"
              >
                x
              </button>
            )}
          </li>
        ))}
      </ul>
      {/* 폼 */}
      <div className="flex">
        <textarea id="review" value={comment.review} onChange={handleReviewChange} className=" text-black" />
        <button type="button" onClick={handleSubmitComment} className="border px-2">
          보내기
        </button>
      </div>
    </div>
  );
};

export default Comments;
