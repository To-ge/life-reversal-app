// import { Session } from "next-auth";

export type UserProvider = {
  currentUser?: User | null;
  partner?: User | null;
  displayChat?: (followingUser: User) => void;
  login?: (user: User) => void;
  logout?: () => void;
};

// export type UserSession = {
//   update: string;
//   data: Session;
//   status: string;
// };
