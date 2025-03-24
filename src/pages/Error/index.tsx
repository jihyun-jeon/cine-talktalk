const ErrorPage = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold mb-2">예상치 못한 오류가 발생했어요</h1>
      <p className="text-gray-400 text-center mb-6">
        일시적인 장애이거나 네트워크 문제일 수 있으니
        <br />
        잠시 후에 다시 시도해 주세요
      </p>
      <button className="px-6 py-3 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors">
        고객센터로 가기
      </button>
    </div>
  </div>
);

export default ErrorPage;
