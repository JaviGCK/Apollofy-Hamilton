import { UserType } from "./user";

export interface FollowsType {
    userId: UserType,
    followedBy: UserType,
    following: UserType
}