import PosterImage from '@/components/PosterImage';

const PurchaseHistory = () => (
  <div className="flex border-b mx-2 pb-4 pr-6">
    <div className="relative h-full max-w-[50px] flex mr-10">
      <PosterImage posterPath={'https://image.tmdb.org/t/p/w342/2fXrKKgTo0gjEAEdjEdhekX4qxl.jpg'} size="w500" />
    </div>
    <div className="flex flex-col justify-between w-full">
      <div className="flex justify-between">
        <h3 className="font-medium">라이프 리스트</h3>
        <p className="text-gray-600">구매일: 2024-03-20</p>
      </div>
      <div>
        <span className="text-green-600">₩15,000</span>
      </div>
    </div>
  </div>
);

function MyPage() {
  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="bg-gray-900 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">프로필 정보</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full" />
              <div>
                <h3 className="font-semibold">사용자 이름</h3>
                <p className="text-gray-600">user@example.com</p>
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">프로필 수정</button>
              <button className="text-red-800 px-4 py-2">탈퇴하기</button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-md p-6 h-[400px] flex flex-col">
          <h2 className="text-xl font-bold mb-4">내 구매 내역</h2>
          <div className="space-y-4 overflow-y-auto custom-scrollbar">
            <PurchaseHistory />
            <PurchaseHistory />
            <PurchaseHistory />
            <PurchaseHistory />
            <PurchaseHistory />
            <PurchaseHistory />
            <PurchaseHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
