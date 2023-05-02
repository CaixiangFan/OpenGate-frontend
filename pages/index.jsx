import Head from 'next/head';
import React, { useState, useEffect } from "react";
import { useConnect } from 'wagmi';
import Navbar from "../components/Navbar";
import Core from "../components/Core";
import styles from '../styles/Home.module.css';

export default function Home() {
  const { connectors, connect } = useConnect();
  const [step, setStep] = useState("TH");

  return (
    <div className={styles.container}>
      <Head>
        <title>Chainlink functions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Core step={step} setStep={setStep} />

    </div>
  )
}
