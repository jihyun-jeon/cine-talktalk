import { supabase } from '@/lib/supabaseClient';
import { FavoriteData, FavoriteSearchParams } from '@/types/favorite';
import { withSupabaseHandler } from '@/api/utils';

// 영화 즐겨찾기 조회
export const fetchFavorites = () => withSupabaseHandler(supabase.from('Favorites').select('*'));

// 즐겨찾기 추가
export const addFavorite = (favoriteData: FavoriteData) =>
  withSupabaseHandler(supabase.from('Favorites').insert([favoriteData]));

// 즐겨찾기 삭제
export const deleteFavorite = ({ movieId, userId }: FavoriteSearchParams) =>
  withSupabaseHandler(supabase.from('Favorites').delete().eq('movie_id', movieId).eq('user_id', userId));

// 특정 영화별 사용자 즐겨찾기에 추가된 리스트 조회
export const fetchFavoritesByMovie = ({ movieId, userId }: FavoriteSearchParams) =>
  withSupabaseHandler(supabase.from('Favorites').select('*').eq('movie_id', movieId).eq('user_id', userId));
