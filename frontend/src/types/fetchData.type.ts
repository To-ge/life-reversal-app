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
  user: User;
  article: Article;
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
