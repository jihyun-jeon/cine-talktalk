/**  TMDB 영화 크레딧 */
export interface MovieCredit {
  /** 출연진 정보 배열  */
  cast: {
    /**  성인 여부 */
    adult: boolean;
    /** 성별 (0: 알 수 없음, 1: 여성, 2: 남성) */
    gender: number;
    /**  인물 고유 ID */
    id: number;
    /**  배우 이름 */
    name: string;
    /**  배우 원어 이름 */
    original_name: string;
    /** 배우의 인기도  */
    popularity: number;
    /**  프로필 이미지 경로 */
    profile_path: string | null;
    /**  캐스트 ID  */
    cast_id: number;
    /**  맡은 역할/캐릭터 이름  */
    character: string;
    /** 크레딧 고유 ID  */
    credit_id: string;
    /**  캐스트 목록 정렬 순서  */
    order: number;
  }[];
}
