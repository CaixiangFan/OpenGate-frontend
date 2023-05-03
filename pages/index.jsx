import Head from 'next/head';
import React, { useState, useEffect } from "react";
import { useConnect } from 'wagmi';
import Navbar from "../components/Navbar";
import Core from "../components/Core";
import Upload from "../components/Upload";
import styles from '../styles/Home.module.css';
import Executebtn from '../components/Buttons/Executebtn';

export default function Home() {
  const { connectors, connect } = useConnect();
  const [step, setStep] = useState("TH");

  return (
    <div className={styles.container}>
      <Head>
        <title>Chainlink functions</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="This is a description of chainlink functions." />
        <meta name="keywords" content="chainlink functions" />
        <meta name="author" content="chainlink functions" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      {/* <Core step={step} setStep={setStep} /> */}
      <Upload />
      <Executebtn />

    </div>
  )
}
