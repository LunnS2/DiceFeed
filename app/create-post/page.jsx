"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePost = () => {
  const router = useRouter();

  return (
      <h1 className="text-center"> CREATE POST </h1>
    )
  }
  

export default CreatePost;