import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 border-4 border-black rounded-2xl bg-zinc-900 shadow-[8px_8px_0_0_#000]">
        <h1 className="font-game text-6xl text-yellow-400 mb-2">404</h1>
        <h2 className="font-game text-3xl mb-4 text-white">Level Not Found</h2>
        <p className="font-game text-xl text-gray-300 mb-6">
          The quest or page you are looking for does not exist in this realm.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button variant="pixel" className="font-game text-lg">
              Return Home
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="pixel" className="font-game text-lg">
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
