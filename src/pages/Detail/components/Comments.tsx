import React, { useState } from 'react';
import { useAddComment, useDeleteComment, useGetCommentsQuery } from '@/hooks/query/useComment';
import { useAuth } from '@/context/AuthContext';

const Comments = ({ movieId }: { movieId: number }) => {
  const initialCommentState = { review: '', vote: 0 };
  const [comment, setComment] = useState(initialCommentState);

  const getUser = useAuth();
  const userId = getUser.session?.user.id;
  const userEmail = getUser.session?.user.email;

  const comments = useGetCommentsQuery(movieId);

  const addCommnet = useAddComment(movieId);
  const deleteCommnet = useDeleteComment(movieId);

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

  const handleDeleteComment = () => {
    if (!userId) {
      console.log('userId undefined!');
      return;
    }

    const deleteData = { userId, movieId };
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
  return (
    <div>
      Comments
      {/* [TODO] UI 개선 */}
      <div className="flex">
        <label htmlFor="vote">평점 </label>
        <input
          type="number"
          id="vote"
          min={0}
          max={10}
          value={comment.vote}
          onChange={handleVoteChange}
          className=" text-black"
        />
        <label htmlFor="review">의견 </label>
        <textarea id="review" value={comment.review} onChange={handleReviewChange} className=" text-black" />
        <button type="button" onClick={handleSubmitComment} className="border px-2">
          등록
        </button>

        <button type="button" onClick={handleDeleteComment} className="border px-2">
          삭제
        </button>
      </div>
      <ul>
        {comments.data?.map((comment) => (
          <li key={comment.id} className="border">
            <div>{comment.user_name}</div>
            <div>
              평점 : {comment.vote} / 리뷰 : {comment.review}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
