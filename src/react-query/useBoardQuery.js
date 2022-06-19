import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import api from "../utils/api";

export const useBoardQuery = () => {
  const queryClient = useQueryClient();

  // board 가져오기 - infinite scroll 사용
  const getPageBoard = async ({ pageParam = 0 }) => {
    const res = await api.get(
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

  // user의 board 가져오기
  const { data: getUserBoard, isSuccess: getUserBoardIsSuccess } = useQuery(
    ["my_board"],
    () => api.get("http://13.125.145.83/api/board/user")
  );

  // user의 board 삭제
  const { mutate: deleteUserBoardMutation } = useMutation(
    (board_id) => api.delete(`http://13.125.145.83/api/board/${board_id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("my_board");
      },
    }
  );
  // user의 board 업데이트
  const { mutate: updateUserBoardMutation } = useMutation(
    ([board, board_id]) =>
      api.put(`http://13.125.145.83/api/board/${board_id}`, board),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("my_board");
      },
    }
  );

  return {
    getBoard,
    getNextPage,
    getBoardIsSuccess,
    getUserBoard,
    getUserBoardIsSuccess,
    getNextPageIsPossible,
    deleteUserBoardMutation,
    updateUserBoardMutation,
  };
};
