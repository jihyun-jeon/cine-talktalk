import { useAuth } from '@/context/AuthContext';
import { PaymentQuery, usePostPayMutation } from '@/hooks/query/usePay';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const getUser = useAuth();
  const userId = getUser.session?.user.id;

  const postPay = usePostPayMutation();

  useEffect(() => {
    function confirm() {
      const requestData = {
        movieId: searchParams.get('movieId'),
        title: searchParams.get('title'),
        imgUrl: searchParams.get('imgUrl'),
        price: searchParams.get('amount'),
      };

      // api
      return Promise.resolve(requestData);
    }

    confirm()
      .then((data) => {
        const { imgUrl, movieId, title, price } = data;

        postPay.mutate(
          {
            userId: userId!,
            movieId: +movieId!,
            title: title!,
            imgUrl: imgUrl!,
            price: +price!,
          },
          {
            onSuccess: () => {
              // BroadcastChannel을 통해 메시지 전송
              const channel = new BroadcastChannel('payment_success');
              channel.postMessage({
                type: 'INVALIDATE_QUERIES',
                movieId: movieId,
              });
              channel.close();

              // 현재 창에서도 쿼리 무효화
              queryClient.invalidateQueries({
                queryKey: PaymentQuery.getOne(+movieId!),
                exact: true,
              });
            },
          },
        );
      })
      .catch((error) => {
        // navigate(`/payment/fail?code=${error.code}&message=${error.message}`);
      });
  }, [searchParams]);

  return (
    <>
      <div className="box_section" style={{ width: '600px' }}>
        <div className="flex flex-col items-center justify-center">
          <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
          <h2>결제를 완료했어요</h2>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: '50px' }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {`${Number(searchParams.get('amount')).toLocaleString()}원`}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: '10px' }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right" id="orderId">
            {`${searchParams.get('orderId')}`}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: '10px' }}>
          <div className="p-grid-col text--left">
            <b>paymentKey</b>
          </div>
          <div className="p-grid-col text--right" id="paymentKey" style={{ whiteSpace: 'initial', width: '250px' }}>
            {`${searchParams.get('paymentKey')}`}
          </div>
        </div>
        <div className="p-grid-col mt-16">
          <button className="button p-grid-col5" onClick={() => window.close()} style={{ margin: '0 auto' }}>
            확인
          </button>
        </div>
      </div>
    </>
  );
}

export default SuccessPage;
