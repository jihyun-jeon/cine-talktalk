import PosterImage from '@/components/PosterImage';
import { useAuth } from '@/context/AuthContext';
import { useGetAllPayQuery } from '@/hooks/query/usePay';
import { MoviePurchase } from '@/types/pay';
import { formatDate, formatDateToDayString } from '@/utils';
import { UserRound } from 'lucide-react';

const PurchaseHistory = ({ payInfo }: { payInfo: MoviePurchase }) => (
  <div className="flex border-b mx-2 pb-4  ">
    <div className="relative h-full max-w-[50px] flex mx-2">
      <PosterImage posterPath={payInfo.img_url} size="w500" />
    </div>
    <div className="flex  justify-between w-full  pr-2">
      <h3 className="font-medium">{payInfo.title}</h3>

      <div>
        <p className="text-gray-500">구매일: {formatDate(payInfo.created_at)}</p>
        <p className="text-green-600 text-right">₩{payInfo.price}</p>
      </div>
    </div>
  </div>
);

function MyPage() {
  const { session } = useAuth();

  const userId = session?.user.id;

  const { data: payments } = useGetAllPayQuery(userId!);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <section className="bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">프로필 정보</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 p-2 bg-gray-200 rounded-full">
                  <UserRound className="w-full h-full text-gray-500 " />
                </div>

                <div>
                  <h3 className="font-semibold">{session?.user.email}</h3>
                  <p className="font-semibold text-gray-400">
                    가입일 : {session && <span>{formatDateToDayString(session?.user.created_at)}</span>}
                  </p>
                </div>
              </div>

              <button className="text-blue-500  px-3 py-2 rounded">비밀번호 변경</button>
            </div>
          </div>
        </section>

        <section className="bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">내 구매 내역</h2>
          <div className="min-h-[100px] max-h-[400px] space-y-4 overflow-y-auto custom-scrollbar">
            {payments?.map((payInfo) => <PurchaseHistory key={payInfo.id} payInfo={payInfo as MoviePurchase} />)}
          </div>
        </section>
      </div>
    </main>
  );
}

export default MyPage;
