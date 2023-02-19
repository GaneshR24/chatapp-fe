import React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllChats } from "../apicalls/chats";
import { GetAllUsers, GetCurrentUser } from "../apicalls/users";
import { HideLoader, ShowLoader } from "../redux/loaderSlice";
import { SetAllUsers, SetUser, SetAllChats } from "../redux/userSlice";
import { io } from "socket.io-client";

const socket = io("https://chatappbe-wecalltext.onrender.com");
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoader());
      const response = await GetCurrentUser();
      const allUsersResponse = await GetAllUsers();
      const allChatsResponse = await GetAllChats();
      dispatch(HideLoader());
      if (response.success) {
        dispatch(SetUser(response.data));
        dispatch(SetAllUsers(allUsersResponse.data));
        dispatch(SetAllChats(allChatsResponse.data));
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-gray-100 p-2">
        {/* Header */}
        <div className="flex justify-between p-5 bg-primary rounded">
          <div className="flex items-center gap-1">
            <i className="ri-message-3-line text-2xl  text-white"></i>
            <h1
              className="text-white text-2xl uppercase font-bold cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              WeCallText
            </h1>
          </div>
          <div className="flex gap-2 text-md items-center bg-white p-2 rounded">
            {user?.profilePic && (
              <img
                src={user?.profilePic}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
            {!user?.profilePic && (
              <i class="ri-shield-user-line text-primary"></i>
            )}
            <h1
              className="underline text-primary cursor-pointer"
              onClick={() => {
                navigate("/profile");
              }}
            >
              {user?.name}
            </h1>
            <i
              className="ri-logout-circle-r-line ml-5 text-xl cursor-pointer text-primary"
              onClick={() => {
                socket.emit("went-offline", user._id);
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>

        {/* Main Content Pages */}
        <div className="py-5">{children}</div>
      </div>
    </>
  );
};

export default ProtectedRoute;
