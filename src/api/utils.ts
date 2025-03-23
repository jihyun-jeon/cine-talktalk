export function withSupabaseHandler<T>(promise: PromiseLike<{ data: T; error: any }>): Promise<T> {
  return promise.then(({ data, error }) => {
    if (error) throw error;
    return data;
  }) as Promise<T>;
  // supabase 에서 반환되는 타입이 Promise가 아닌, PromiseLike인 문제로 타입 강제처리
}
