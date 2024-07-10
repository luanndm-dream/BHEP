// declare module "*.svg" {
//   import React from "react";
//   // import { SvgProps } from "react-native-svg";
//   const content: React.FC<SvgProps>;
//   export default content;
// }
declare module '*.ts';

// env.d.ts
declare module '@env' {
    export const APP_STORE_SECRET: string;
    // Thêm các biến môi trường khác nếu có
  }
  