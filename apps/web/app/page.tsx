"use client";

import styles from "../styles/index.module.css";
import { Button } from "@repo/ui";

export default function Web() {
  return (
    <div className={styles.container}>
      <h1>Web</h1>
      <Button onClick={() => console.log("Pressed!")}>Boop</Button>
    </div>
  );
}
