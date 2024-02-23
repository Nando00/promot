import React from 'react'
import {prisma} from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs";
import Menu from '@/components/Menu';
export default async function Dashboard() {
  const user = auth().userId

  return(
    <div>
      <Menu />
    </div>)
}
