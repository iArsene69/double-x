import { Database as DB } from "../../lib/database.types";

type Tweet = DB["public"]["Tables"]["threads"]["Row"];
type Profile = DB["public"]["Tables"]["profiles"]["Row"];


declare global {
  type Database = DB;
  
  type TweetUnionAuthor = Tweet & {
    author: Profile;
    likes: number;
    user_has_liked_tweet: boolean;
  };
}
