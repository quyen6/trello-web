import { Box } from "@mui/material";

import { useEffect, useState } from "react";
import HeaderIntroduction from "./HeaderIntroduction/HeaderIntroduction";
import ContentIntroduction from "./ContentIntroduction/ContentIntroduction";
const Introduction = () => {
  const [boxShadowHeaderIntroduction, setBoxShadowHeaderIntroduction] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setBoxShadowHeaderIntroduction(true);
      } else {
        setBoxShadowHeaderIntroduction(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box>
      {/* Header */}
      <HeaderIntroduction
        boxShadowHeaderIntroduction={boxShadowHeaderIntroduction}
        setBoxShadowHeaderIntroduction={setBoxShadowHeaderIntroduction}
      />

      {/* Content */}
      <ContentIntroduction />
    </Box>
  );
};

export default Introduction;
