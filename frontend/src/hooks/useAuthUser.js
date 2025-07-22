import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../utils/api"


const useAuthUser = () => {
    const authUser = useQuery({
        queryKey: ["authUser"],
        queryFn:getAuthUser,
        retry: false,
    });

    return {isLoading: authUser.isLoading, authUser: authUser.data?.data}
}

export default useAuthUser