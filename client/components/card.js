'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getAllPhotos } from "@/modules/fetch/photo";

// const getRandomImageUrl = () => {
//   const width = 500;
//   const height = Math.floor(Math.random() * (800 - 300 + 1)) + 300; // Random height between 300 and 800
//   return `https://via.placeholder.com/${width}x${height}`;
// };

export default function Card() {
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getAllPhotos();
            setPhotos(data.photo);
          } catch (error) {
            console.error("Error fetching photos:", error);
          }
        };
        fetchData();
      }, []);

  return (
    <div className="columns-2 md:columns-5">
      {photos.map((photo, index) => (
        <div key={index}>
          <Image
            src={`http://localhost:8000/${photo.photoUrl}`}
            alt=""
            width={500}
            height={0}
            className="rounded-xl mb-5 cursor-pointer"
            onClick={() => console.log(photo.ID)}
          />
        </div>
      ))}
    </div>
  );
}
