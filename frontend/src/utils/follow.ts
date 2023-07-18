import api from "./axios";

export const followUser = async (props: FollowUser) => {
  const { email, followed_id } = props;
  try {
    const response = await api.post("/follower_relationships", {
      email,
      followed_id,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteFollowingUser = async (props: FollowUser) => {
  const { email, followed_id } = props;
  try {
    const response = await api.delete(
      `/follower_relationships/${followed_id}`,
      {
        data: { email },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const findFollowers = async (props: FollowUser) => {
  const { email } = props;
  try {
    const response = await api.post("/find_followers", {
      email,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const findFollowingUsers = async (props: FollowUser) => {
  const { email } = props;
  try {
    const response = await api.post("/find_following_users", {
      email,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
