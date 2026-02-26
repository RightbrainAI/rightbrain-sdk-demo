import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    settings: {
      react: { version: "19" },
    },
  },
  {
    ignores: ["**/src/generated/**"],
  },
];

export default eslintConfig;
