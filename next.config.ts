import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental'
  },
 
};

export default nextConfig;
