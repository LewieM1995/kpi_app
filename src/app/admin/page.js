"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import PantoneTable from "./pantone_table";
import PantoneFilter from "./pantone_filter";
import styles from "./styles.module.css";

const AdminPage = () => {
  const router = useRouter();
  const isAdminValue = typeof window !== "undefined" && localStorage.getItem("isAdmin") === "true";

  const [pantones, setPantones] = useState([]);
  const [filter, setFilter] = useState("");
  const [editedPantones, setEditedPantones] = useState({});
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const fetchPantoneData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.envNEXT_PUBLIC_API_URL_PANTONES}?page=${page}&limit=300`
      );
      const data = await response.json();

      setPantones((prev) => [...prev, ...data]); // Append new data to the existing pantones

      const initialEdits = data.reduce((acc, pantone) => {
        acc[pantone.id] = { ...pantone };
        return acc;
      }, {});
      setEditedPantones((prev) => ({ ...prev, ...initialEdits }));
    } catch (error) {
      console.error("Error fetching Pantone options:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleEditChange = (id, field, value) => {
    setEditedPantones((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSaveChanges = async (id) => {
    const updatedPantone = editedPantones[id];

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_UPDATEPANTONES}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPantone),
      });

      if (response.ok) {
        setPantones((prev) => prev.map((pantone) => (pantone.id === id ? updatedPantone : pantone)));
      } else {
        console.error("Failed to save changes:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_DELETEPANTONE}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPantones((prev) => prev.filter((pantone) => pantone.id !== id));
      } else {
        console.error("Failed to delete Pantone:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting Pantone:", error);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchPantoneData(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  if (!isAdminValue) {
    router.push("/");
    return null;
  }

  return (
    <div className={styles.adminPage}>
      <PantoneFilter filter={filter} handleFilterChange={handleFilterChange} />
      <PantoneTable
        pantones={pantones}
        editedPantones={editedPantones}
        handleEditChange={handleEditChange}
        handleSaveChanges={handleSaveChanges}
        handleDelete={handleDelete}
        filter={filter}
        loading={loading}
      />
    </div>
  );
};

export default AdminPage;
