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
