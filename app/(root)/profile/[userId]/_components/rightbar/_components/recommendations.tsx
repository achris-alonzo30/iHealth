"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

type ActivityTimelineProps = {
    users: User[];
    loginUser: User;
}

export const Recommendations = ({ users, loginUser }: ActivityTimelineProps) => {
    const [ followedUsers, setFollowedUsers ] = useState<string[]>([])
    
    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const response  = await axios.get(`/api/follow`)
                
                setFollowedUsers(response.data.followingIds)
            } catch (error) {
                console.log("[GET_FOLLOWING_STATUS]", error)
            }
        }

        fetchFollowStatus()
    }, [loginUser.id, users])
    
    const handleFollow = async (followingId: string, followingUsername: string) => {
        try {
            await axios.post(`/api/follow/${followingId}`)
            toast.success(`Follow Request Sent to ${followingUsername} 🎉`)
        
            setFollowedUsers((prevUsers) =>[...prevUsers, followingId])
        } catch (error) {
            toast.error(`Error following ${followingUsername}. Please try again.`)
        }
    }

    const handleUnFollow = async (followingId: string, followingUsername: string) => {
        try {
            await axios.delete(`/api/follow/${followingId}`)
            toast.success(`Successfully unfollowed ${followingUsername} 😭`)
       
            setFollowedUsers((prevUsers) => prevUsers.filter((userId) => userId !== followingId))
        } catch (error) {
            toast.error(`Error unfollowing ${followingUsername}. Please try again.`)
        }
    }

    return (
        <main className="h-full flex flex-col my-1">
            <div className="w-full mx-auto px-1">
                <div className="w-full mx-auto">
                    <div className="flex flex-col gap-y-1">
                        {users.map((user) => (
                            <div className="flex flex-col gap-y-2 items-center bg-zinc-200 dark:bg-zinc-950 rounded-lg py-2" key={user.id}>
                                <Image src={user.profileImageUrl!} alt="profile-image" width="50" height="50" className="rounded-full aspect-square object-cover border-2 border-zinc-500 dark:border-zinc-200 hover:border-zinc-200 dark:hover:border-zinc-500" />
                                <Link href={`/profile/${user.id}/user-profile`} className="text-sm font-medium text-zinc-600 dark:text-gray-500 cursor-pointer hover:underline hover:text-[#7600FF]/90 line-clamp-2">
                                    {user.username}
                                </Link>
                                <Button onClick={() => (followedUsers.includes(user.id) ? handleUnFollow(user.id, user.username) : handleFollow(user.id, user.username))} className="items-center inline-flex focus:outline-none justify-center text-white bg-[#7600FF] py-1 px-2 focus-visible:outline-black focus-visible:ring-black font-medium hover:bg-[#7600FF]/70 hover:border-white hover:text-white lg:w-auto gap-x-2 rounded-lg text-center w-full transform hover:-translate-y-1 transition duration-400">{followedUsers.includes(user.id) ? "UnFollow": "Follow"}</Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}