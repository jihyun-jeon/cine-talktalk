/** 날짜 형식 변환 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

/** 날짜 형식 변환 (일자만) */
export const formatDateToDayString = (dateString: string) => {
  const parsedDate = new Date(dateString);

  return parsedDate.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
