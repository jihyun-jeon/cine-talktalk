/** 즐겨찾기 추가 데이터 타입 */
export type FavoriteData = {
  /** 영화 포스터 이미지 URL */
  img_url: string;
  /** TMDB 영화 ID */
  movie_id: number;
  /** 영화 제목 */
  title: string;
  /** 사용자 ID */
  user_id: string;
};

/** 즐겨찾기 검색,삭제 매개변수 타입 */
export type FavoriteSearchParams = {
  /** 검색할 영화 ID */
  movieId: number;
  /** 검색할 사용자 ID */
  userId: string;
};
