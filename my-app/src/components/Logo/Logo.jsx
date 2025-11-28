import React from "react";
import logo from "../../assets/logo.png";
import styles from "./Logo.module.css";

export default function Logo() {
  return <img src={logo} className={styles.logo} alt="QTify logo" />;
}
