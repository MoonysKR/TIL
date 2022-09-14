/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        // 주소를 동적으로도 조작가능
        // source: "/contact/:path",
        // catch도 가능, 뒤에 작성한 모든 것을 가져옴
        // source: "/contact/:path*",
        source: "/contact",
        destination: "/form",
        permanent: false,
      },
    ];
  },
  // URL이 바뀌어도 유저가 인식하지 못하기 때문에 API키를 숨길 수 있음
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
