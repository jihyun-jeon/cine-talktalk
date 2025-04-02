import { supabase } from '@/lib/supabaseClient';
import { withSupabaseHandler } from '@/api/utils';
import { AddPaymentData } from '@/types/pay';

// 결제 조회
export const fetchPayment = ({ userId, movieId }: { userId: string; movieId: number }) =>
  withSupabaseHandler(supabase.from('Pay').select('*').eq('user_id', userId).eq('movie_id', movieId));

// 결제 이력 조회
export const fetchAllPayment = ({ userId }: { userId: string }) =>
  withSupabaseHandler(supabase.from('Pay').select('*').eq('user_id', userId));

// 결제 추가
export const addPayment = ({ userId, movieId, title, imgUrl, price }: AddPaymentData) =>
  withSupabaseHandler(
    supabase.from('Pay').insert([{ user_id: userId, movie_id: movieId, title, img_url: imgUrl, price }]),
  );
