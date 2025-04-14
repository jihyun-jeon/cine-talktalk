import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import '@/pages/Pay/pay.css';

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = '5w7v1KP1o4XRzkLogkn1F';

function CheckoutPage() {
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: 200,
  });
  const [ready, setReady] = useState<boolean>(false);
  const [widgets, setWidgets] = useState<any | null>(null);

  const [searchParams] = useSearchParams();

  const handlePayment = async () => {
    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
      await widgets.requestPayment({
        orderId: '5vnitP6t1I_VsgeNWdgGt',
        orderName: '개별 영화 구매',
        successUrl: window.location.origin + `/payment/success?${searchParams}`,
        failUrl: window.location.origin + '/payment/fail',
        customerEmail: 'customer123@gmail.com',
        customerName: '김토스',
        customerMobilePhone: '01012341234',
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      });
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount(amount);
  }, [widgets, amount]);

  return (
    <div className="wrapper">
      <div className="box_section">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* 쿠폰 체크박스 */}
        <div>
          <div>
            <label htmlFor="coupon-box">
              <input
                id="coupon-box"
                type="checkbox"
                aria-checked="true"
                disabled={!ready}
                onChange={(event) => {
                  // ------  주문서의 결제 금액이 변경되었을 경우 결제 금액 업데이트 ------
                  setAmount((prev) => ({ ...prev, value: event.target.checked ? prev.value - 100 : prev.value + 100 }));
                }}
              />
              <span>100원 쿠폰 적용</span>
            </label>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <button className="button" disabled={!ready} onClick={handlePayment}>
          {amount.value}원 결제하기
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
