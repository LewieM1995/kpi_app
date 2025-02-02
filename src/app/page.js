'use client'

import { useAuth } from "./auth_context/auth_context";
import { useRouter } from "next/navigation"; //"next/router" deprecated use "next/navigation"
import { useEffect, useState } from "react";

import styles from "./page.module.css";

export default function Home() {

  const { isAuthenticated, isAdmin, login, logout, isLoading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated){
      router.push('/login')
    }
  }, [isAuthenticated, router])

  return (
    <div className={styles.page}>
      <div></div>
    </div>
  );
}
