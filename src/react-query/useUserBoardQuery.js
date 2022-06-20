import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../utils/api";

export const useUserBoardQuery = () => {
  const queryClient = useQueryClient();

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
    getUserBoard,
    getUserBoardIsSuccess,
    deleteUserBoardMutation,
    updateUserBoardMutation,
  };
};
