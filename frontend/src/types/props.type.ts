type UserProvider = {
  currentUser?: User | null;
  partner?: User | null;
  displayChat?: (followingUser: User) => void;
  login?: (user: User) => void;
  logout?: () => void;
};
