import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  console.log(router);
  return `movies/${router.query.id}`;
}
