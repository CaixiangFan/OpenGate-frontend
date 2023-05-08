import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";

function History() {
  const account = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/queryhistoricaloffers/" + account.address);
        const data = await response.json();
        setOffers(data.boughtOffers);
        setListings(data.soldOffers);
      } catch {
        (e) => console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      Source code history
    </div>
  );
}

export default History;
