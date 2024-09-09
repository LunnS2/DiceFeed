"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Feed from "@components/Feed";

const MyFeed = () => {
  const router = useRouter();

  return (
      <h1 className="text-center"> My Feed </h1>
    )
  }
  

export default MyFeed;