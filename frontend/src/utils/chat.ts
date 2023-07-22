import api from "./axios";

export const sendMessage = async (props: SendMessage) => {
  const { email, other_id, content } = props;
  try {
    const response = await api.post("/messages", {
      email,
      other_id,
      content,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllMessages = async (props: FetchMessage) => {
  const { email, other_id } = props;
  try {
    const response = await api.post("/all_messages", {
      email,
      other_id,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
