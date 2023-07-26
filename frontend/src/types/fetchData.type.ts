type User = {
  id: number;
  uid: string;
  name: string;
  image: string;
  email: string;
  password?: string;
  password_salt?: string;
  password_hash?: string;
  provider: string;
  created_at: string;
  updated_at: string;
};

type Article = {
  id: number;
  user_id: number;
  text: string;
  created_at: string;
  updated_at: string;
};

interface UserAndArticle {
  user?: User;
  article: Article;
}
interface UsersAndArticles {
  users: User[];
  articles: Article[];
}

interface UserAndArticleAndCards {
  user: User;
  article: Article;
  cards: { id: number; content: string };
}

type Card = {
  id: number;
  text: string;
};

type FollowUser = {
  email: string;
  followed_id?: number;
  following_id?: number;
};

type Message = {
  id?: number;
  user_id: number;
  room_id: number;
  content: string;
};

type FetchMessage = {
  email: string;
  other_id: number;
};

type SendMessage = Message & FetchMessage;
