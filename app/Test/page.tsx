"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (count > 3) {
      setCount(0);
    }
  }, [count]);

  const handleRun = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <Button className="m-3" onClick={handleRun}>
        Hola mundo
      </Button>
    </div>
  );
};

export default Page;
