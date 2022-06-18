import { useMutation, useQueryClient } from "react-query";
import api from "../utils/api";

export const useLikeBoardQuery = () => {
  const queryClient = useQueryClient();
  const { mutate: likeBoardMutation } = useMutation(
    (board_id) => api.post(`http://13.125.145.83/api/board/${board_id}/like`),
    {
      onSuccess: () => {
        // infinite query 인스턴스의 query key
        queryClient.invalidateQueries("page_board_list");
      },
    }
  );

  const { mutate: dislikeBoardMutation } = useMutation(
    (board_id) => api.delete(`http://13.125.145.83/api/board/${board_id}/like`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("page_board_list");
      },
    }
  );

  return { likeBoardMutation, dislikeBoardMutation };
};
