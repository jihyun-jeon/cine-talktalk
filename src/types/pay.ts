/** 결제하기 데이터 타입 */
export type AddPaymentData = {
  /** 영화 포스터 이미지 URL */
  imgUrl: string;
  /** TMDB 영화 ID */
  movieId: number;
  /** 영화 제목 */
  title: string;
  /** 사용자 ID */
  userId: string;
  /** 결제 가격 */
  price: number;
};

/** 구매한 영화 정보 타입 */
export type MoviePurchase = {
  /** 구매 내역 ID */
  id: number;
  /** 구매 일시 */
  created_at: string;
  /** 구매한 사용자 ID */
  user_id: string;
  /** TMDB 영화 ID */
  movie_id: number;
  /** 영화 제목 */
  title: string;
  /** 영화 포스터 이미지 URL */
  img_url: string;
  /** 구매 가격 */
  price: number;
};
