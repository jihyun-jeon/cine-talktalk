import { addPayment, fetchAllPayment, fetchPayment } from '@/api/pay';
import { AddPaymentData } from '@/types/pay';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

/** 결제 조회  */
export const useGetPayQuery = (userId: string, movieId: number) =>
  useQuery({
    enabled: !!userId && !!movieId,
    queryFn: () => fetchPayment({ userId, movieId }),
    queryKey: PaymentQuery.getOne(movieId),
  });

/** 결제 이력 조회  */
export const useGetAllPayQuery = (userId: string) =>
  useQuery({
    enabled: !!userId,
    queryFn: () => fetchAllPayment({ userId }),
    queryKey: PaymentQuery.getMany(userId),
  });

/** 결제 추가  */
export const usePostPayMutation = (options?: UseMutationOptions<null, Error, AddPaymentData>) =>
  useMutation({
    mutationFn: addPayment,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });

export const PaymentQuery = {
  all: ['payment'] as const,
  getMany: (userId: string) => [...PaymentQuery.all, 'getMany', userId] as const,
  getOne: (movieId: number) => [...PaymentQuery.all, 'getOne', movieId] as const,
};
