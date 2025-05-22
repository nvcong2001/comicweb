import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/dashboard" className="">
        Dashboard
      </Link>
    </div>
  );
}
