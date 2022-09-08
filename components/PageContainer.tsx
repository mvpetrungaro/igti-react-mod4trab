import Head from "next/head";
import React, { ReactNode } from "react";
import styles from "../styles/PagesContainer.module.css";

interface PageContainerProps {
  style?: React.CSSProperties;
  children?: ReactNode;
}

export default function PageContainer({ children, style }: PageContainerProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>IGTI - React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} style={style}>
        {children}
      </main>

      <footer className={styles.footer}>
        IGTI - React - Module 4: Practice
      </footer>
    </div>
  );
}
