/** 영화 리뷰 정보 */
export interface Comment {
  /** 영화 고유 ID */
  movie_id: number;
  /** 사용자 ID (작성자) */
  user_id: string;
  /** 사용자 이름 */
  user_name: string;
  /** 리뷰 내용 */
  review: string;
  /** 평점 (1~10점) */
  vote: number;
}

/** 영화 리뷰 삭제 시 필요한 파라미터 */
export type DeleteCommentParams = {
  /** 댓글 고유 ID */
  commentId: number;
  /** 사용자 ID */
  userId: string;
};
