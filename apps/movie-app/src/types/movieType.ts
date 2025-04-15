/** 영화 정보 */
export interface Movie {
  /** 영화 고유 ID */
  id: number;
  /** 배경 이미지 경로 */
  backdrop_path: string | null;
  /** 포스터 이미지 경로 */
  poster_path: string | null;
  /** 영화 제목 */
  title: string;
  /** 평균 평점 */
  vote_average: number;
  /** 평점 투표 수 */
  vote_count: number;
  /** 줄거리 */
  overview: string;
  /** 개봉일 */
  release_date: string;
  /** 비디오 여부 */
  video: boolean;
  /** 성인 영화 여부 */
  adult: boolean;
  /** 장르 ID 목록 */
  genre_ids: number[];
  /** 원어 */
  original_language: string;
  /** 원제 */
  original_title: string;
  /** 인기 지수 */
  popularity: number;
}

/** 영화 목록 API 응답 타입 */
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/** 영화 장르 정보 */
export interface Genre {
  /** 장르 ID */
  id: number;
  /** 장르 이름 */
  name: string;
}

/**  영화 장르 목록 API 응답 타입 */
export interface GenresResponse {
  /** 장르 목록 */
  genres: Genre[];
}

/** 영화 세부 정보 */
export interface MovieDetail {
  /** 영화 고유 ID */
  id: number;
  /** 배경 이미지 경로  */
  backdrop_path: string | null;
  /** 포스터 이미지 경로  */
  poster_path: string | null;
  /** 영화 제목 */
  title: string;
  /** 평균 평점 */
  vote_average: number;
  /** 평점 투표 수 */
  vote_count: number;
  /** 장르 정보 목록 */
  genres: Genre[];
  /** 상영 시간 (분 단위) */
  runtime: number;
  /** 줄거리 */
  overview: string;
  /** 개봉일 */
  release_date: string;
  /** 비디오 여부 */
  video: boolean;
}

/**  TMDB API의 공통 쿼리 파라미터 */
export interface baseSearchParam {
  /** 언어 설정 (예: 'ko-KR', 'en-US') */
  language: string;
  /** 페이지 번호 (기본값: 1) */
  page?: number;
}

/**  장르 기반 검색 쿼리 파라미터   */
export interface genreSearchParam extends baseSearchParam {
  /** 쉼표로 구분된 장르 ID 목록 */
  with_genres?: string;
}

/** 키워드 기반 검색 쿼리 파라미터  */
export interface keywordSearchParam extends baseSearchParam {
  /** 검색할 키워드 */
  query?: string;
}
