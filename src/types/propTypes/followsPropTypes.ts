import { FollowsType } from "../dataTypes/follows"

export interface FollowsPropTypes {

    userId: FollowsType,
    userFollowers: FollowsType,
    userFollowing: FollowsType
}