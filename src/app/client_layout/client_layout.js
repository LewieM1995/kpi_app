'use client';

import { useAuth } from "../auth_context/auth_context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import MenuIcon from '../../../public/menu-grid-svgrepo-com.svg';
import styles from "./page.module.css";

export default function ClientLayout({ children }) {

  const { isAuthenticated, isAdmin, login, logout, isLoading, error } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAdminValue, setIsAdminValue] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsAdmin = localStorage.getItem("isAdmin");
      setIsAdminValue(storedIsAdmin === "true");
    }
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={styles.toggleButton}
            disabled={!isAuthenticated ? true : false}
          >
            {isSidebarOpen ? <Image src={MenuIcon} alt="Menu Icon" width={20} /> : <Image src={MenuIcon} alt="Menu Icon" width={20} />}
          </button>
          <h1 className={styles.headerTitle} onClick={() => router.push('/')} >Fuji Seal KPI</h1>
        </header>

        <div className={styles.mainContainer}>
          {/* Sidebar */}
          {isAuthenticated ? (<aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarHidden : ""}`}>
            <nav className={styles.nav}>
              <div className={styles.navItem} onClick={() => router.push('/kpi_graphs')} >KPI Graphs</div>
              <div className={styles.navItem} onClick={() => router.push('/cm_submission')} >Colour Match Submission</div>
              <div className={styles.navItem} onClick={() => router.push('/add_pantone')} >Add New Pantone</div>
              <div className={styles.navItem} onClick={() => router.push('/quarantine_form')} >Quarantine Inks Form</div>
              { isAdminValue ? <div className={styles.navItem} onClick={() => router.push('/admin')} >Admin</div> : null}
              {isAuthenticated ? <div className={styles.navItem} onClick={(e) => logout(e)}>Logout</div> : null }
            </nav>
          </aside>) : null }
          

          {/* Children rendered so routes control display */}
          <div className={styles.mainContent}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
