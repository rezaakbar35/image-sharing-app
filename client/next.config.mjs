/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['via.placeholder.com', 'localhost'],
      },
      async headers() {
        return [
            {
                // matching all API routes
                source: "/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://localhost:3000/" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "Authorization" },
                ]
            }
        ]
    }
};

export default nextConfig;
