import React, { useState } from "react";
import styles from "./Widget.module.css";
import Image from "next/image";
import { SearchType } from "@/utils/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Picture from "../../../public/svgs/Picture.svg";
import Video from "../../../public/svgs/Video.svg";
import Plus from "../../../public/svgs/Plus.svg";
import PrevArrow from "../../../public/svgs/PrevArrow.svg";
import NextArrow from "../../../public/svgs/NextArrow.svg";
import PlayIcon from "../../../public/svgs/Play.svg";

type searchProps = {
  searchResults?: SearchType;
};

const Widget = ({ searchResults }: searchProps) => {
  const images = searchResults?.data?.images?.value;
  const videos = searchResults?.data?.videos?.value;
  const [openMedia, setOpenMedia] = useState<"picture" | "video" | null>(null);

  const openInNewWindow = (url: string) => {
    window.open(url, "_blank");
  };

  const handleMediaClick = (type: "picture" | "video") => {
    setOpenMedia(type);
  };

  if (!images && !videos) {
    return null;
  }

  return (
    <div className={styles.container}>
      {images && (
        <>
          {openMedia === "picture" ? (
            <div className={styles.carousel}>
              <Swiper
                style={
                  {
                    "--swiper-pagination-color": "#FFFFFF",
                    "--swiper-pagination-bullet-inactive-color": "#FFFFFFAA",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                  } as React.CSSProperties
                }
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                rewind={true}
                navigation={{
                  prevEl: `.${styles.prevArrow}`,
                  nextEl: `.${styles.nextArrow}`,
                }}
                modules={[Pagination, Navigation]}
                className={styles.swiper}
              >
                {images.map((image: any, index: number) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={image.thumbnailUrl}
                      alt={image.name || `Search result image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      onClick={() => openInNewWindow(image.hostPageUrl)}
                    />
                  </SwiperSlide>
                ))}
                <div className={styles.prevArrow}>
                  <Image src={PrevArrow} alt="Previous image" width={24} height={24} />
                </div>
                <div className={styles.nextArrow}>
                  <Image src={NextArrow} alt="Next image" width={24} height={24} />
                </div>
              </Swiper>
            </div>
          ) : (
            <div
              className={styles.card}
              onClick={() => handleMediaClick("picture")}
            >
              <div className={styles.cardTitle}>
                <Image src={Picture} alt="Pictures icon" width={21} height={21} className={styles.icon} />
                Search Images
              </div>
              <Image src={Plus} alt="Show images" width={18} height={18} className={styles.plus} />
            </div>
          )}
        </>
      )}

      {videos && (
        <>
          {openMedia === "video" ? (
            <div className={styles.carousel}>
              <Swiper
                style={
                  {
                    "--swiper-pagination-color": "#FFFFFF",
                    "--swiper-pagination-bullet-inactive-color": "#FFFFFFAA",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                  } as React.CSSProperties
                }
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                rewind={true}
                navigation={{
                  prevEl: `.${styles.prevArrow}`,
                  nextEl: `.${styles.nextArrow}`,
                }}
                modules={[Pagination, Navigation]}
                className={styles.swiper}
              >
                {videos.map((video: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className={styles.videoSlide}>
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.name || `Search result video ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        onClick={() => openInNewWindow(video.hostPageUrl)}
                      />
                      <div className={styles.playIcon}>
                        <Image src={PlayIcon} alt="Play video" width={50} height={50} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className={styles.prevArrow}>
                  <Image src={PrevArrow} alt="Previous video" width={24} height={24} />
                </div>
                <div className={styles.nextArrow}>
                  <Image src={NextArrow} alt="Next video" width={24} height={24} />
                </div>
              </Swiper>
            </div>
          ) : (
            <div
              className={styles.card}
              onClick={() => handleMediaClick("video")}
            >
              <div className={styles.cardTitle}>
                <Image src={Video} alt="Videos icon" width={21} height={21} className={styles.icon} />
                Search Videos
              </div>
              <Image src={Plus} alt="Show videos" width={18} height={18} className={styles.plus} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Widget;
