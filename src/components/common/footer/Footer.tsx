import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";

import { ICON } from "@/constants/importImages";

const cn = classNames.bind(styles);

export default function Footer() {
  return (
    <div className={cn("footer-entire")}>
      <div className={cn("footer-company-name")}>
        <span>©codeit - 2023</span>
        <div className={cn("footer-policy-faq")}>
          <span>Privacy Policy</span>
          <span>FAQ</span>
        </div>
      </div>
      <div className={cn("footer-icon-link")}>
        <Link href="https://facebook.com/" target="_blank">
          <Image
            src={ICON.facebook.default.src}
            height={20}
            width={20}
            alt={ICON.facebook.default.alt}
            className={cn("footer-icon-image")}
          />
        </Link>
        <Link href="https://twitter.com/" target="_blank">
          <Image
            src={ICON.twitter.default.src}
            height={20}
            width={20}
            alt={ICON.twitter.default.alt}
            className={cn("footer-icon-image")}
          />
        </Link>
        <Link href="https://youtube.com/" target="_blank">
          <Image
            src={ICON.youtube.default.src}
            height={20}
            width={20}
            alt={ICON.youtube.default.alt}
            className={cn("footer-icon-image")}
          />
        </Link>
        <Link href="https://instagram.com/" target="_blank">
          <Image
            src={ICON.instagram.default.src}
            height={20}
            width={20}
            alt={ICON.instagram.default.alt}
            className={cn("footer-icon-image")}
          />
        </Link>
      </div>
    </div>
  );
}
