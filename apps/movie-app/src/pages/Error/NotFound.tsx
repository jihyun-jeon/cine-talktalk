const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold mb-2">요청하신 페이지를 찾을 수 없어요</h1>
      <p className="text-gray-400 text-center mb-6">여기에 당신과 저 빼고는 아무도 없는 것 같아요</p>
      <button
        onClick={() => (window.location.href = '/')}
        className="px-6 py-3 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors"
      >
        홈으로 가기
      </button>
    </div>
  </div>
);

export default NotFound;
