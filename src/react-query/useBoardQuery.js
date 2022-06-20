import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import api from "../utils/api";
import axios from "axios";

export const useBoardQuery = () => {
  const queryClient = useQueryClient();

  // board 가져오기 - infinite scroll 사용
  const getPageBoard = async ({ pageParam = 0 }) => {
    const res = await axios.get(
      `http://13.125.145.83/api/board?page=${pageParam}&size=2`
    );
    return {
      board_page: res.data.content,
      // 반환 값에 페이지를 넘겨주자
      current_page: pageParam,
      isLast: res.data.last,
    };
  };
  const {
    data: getBoard,
    fetchNextPage: getNextPage,
    isSuccess: getBoardIsSuccess,
    hasNextPage: getNextPageIsPossible,
  } = useInfiniteQuery(["page_board_list"], getPageBoard, {
    getNextPageParam: (lastPage, pages) => {
      // lastPage와 pages는 콜백함수에서 리턴한 값을 의미한다!!
      // lastPage: 직전에 반환된 리턴값, pages: 여태 받아온 전체 페이지
      if (!lastPage.isLast) return lastPage.current_page + 1;
      return undefined;
    },
  });

  return {
    getBoard,
    getNextPage,
    getBoardIsSuccess,
    getNextPageIsPossible,
  };
};
