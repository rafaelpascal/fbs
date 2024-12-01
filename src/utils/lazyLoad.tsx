// utils/lazyLoad.tsx

import { lazy } from "react";

// Utility function to automatically lazy load components
export const lazyLoad = (importFunc: () => Promise<any>) => {
  return lazy(importFunc);
};
