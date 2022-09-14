import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  console.log(router);
  return (
    // <nav className={styles.nav}>
    <nav>
      <Link href="/">
        <a className={router.pathname === "/" ? "active" : ""}>HOME</a>
      </Link>
      <Link href="/about">
        <a className={router.pathname === "/about" ? "active" : ""}>ABOUT</a>
      </Link>
      {/* next js에서 스타일 먹이는 방식 */}
      <style jsx>{`
        a {
          text-decoration: none;
        }
        .active {
          color: tomato;
        }
      `}</style>
    </nav>
  );
}
