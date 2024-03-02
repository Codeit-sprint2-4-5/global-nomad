import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./footer.module.scss";
import classNames from "classnames/bind";

import { ICON } from "@/constants/importImages";

const cx = classNames.bind(styles);

export default function Footer() {
  return (
    <div className={cx("footerEntire")}>
      <div className={cx("footerCompanyName")}>
        <span>©codeit - 2023</span>
        <div className={cx("footerPolicyFaq")}>
          <span>Privacy Policy</span>
          <span>FAQ</span>
        </div>
      </div>
      <div className={cx("footerIconLink")}>
        <Link href="https://facebook.com/" target="_blank">
          <Image
            src={ICON.facebook.default.src}
            height={20}
            width={20}
            alt={ICON.facebook.default.alt}
          />
        </Link>
        <Link href="https://twitter.com/" target="_blank">
          <Image
            src={ICON.twitter.default.src}
            height={20}
            width={20}
            alt={ICON.twitter.default.alt}
          />
        </Link>
        <Link href="https://youtube.com/" target="_blank">
          <Image
            src={ICON.youtube.default.src}
            height={20}
            width={20}
            alt={ICON.youtube.default.alt}
          />
        </Link>
        <Link href="https://instagram.com/" target="_blank">
          <Image
            src={ICON.instagram.default.src}
            height={20}
            width={20}
            alt={ICON.instagram.default.alt}
          />
        </Link>
      </div>
    </div>
  );
}
