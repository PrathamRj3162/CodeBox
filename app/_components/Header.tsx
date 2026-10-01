"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { Course } from "../(routes)/courses/_components/CourseList";
import { UserDetailContext } from "@/context/UserDetailContext";

function Header() {
  const { user } = useUser();
  const { userDetail, isGuest, logoutGuest } = useContext(UserDetailContext);
  const { exerciseslug } = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const activeUser = user || (isGuest ? userDetail : null);

  useEffect(() => {
    GetCourses();
  }, []);

  const GetCourses = async () => {
    try {
      const result = await axios.get("/api/course");
      if (Array.isArray(result.data)) {
        setCourses(result.data);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses in header:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-7xl flex justify-between items-center w-full">
      <Link href={"/"}>
        <div className="flex items-center gap-2">
          <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
          <h2 className="font-bold text-4xl font-game">CodeBox</h2>
        </div>
      </Link>

      {/* Navbar */}
      {!exerciseslug && !loading && courses.length > 0 ? (
        <NavigationMenu>
          <NavigationMenuList className="gap-8">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-game text-2xl">
                Courses
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid md:grid-cols-2 gap-2 sm:w-[400px] md:w-[500px] lg:w-[600px] p-2">
                  {courses.map((course, index) => (
                    <Link href={"/courses/" + course?.CourseId} key={index}>
                      <div className="p-2 hover:bg-zinc-800 rounded-2xl cursor-pointer">
                        <h2 className="text-2xl font-game">{course?.title}</h2>
                        <p className="text-lg text-gray-400 font-game line-clamp-2">
                          {course?.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/courses"
                className="font-game text-2xl"
              >
                All Courses
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/pricing"
                className="font-game text-2xl"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : exerciseslug ? (
        <h2 className="font-game text-2xl">
          {exerciseslug?.toString()?.replaceAll("-", " ").toLocaleUpperCase()}
        </h2>
      ) : null}

      {/* Auth state: Guest or Clerk */}
      {!activeUser ? (
        <div className="flex gap-3 items-center">
          <Link href="/courses">
            <Button className="font-game text-xl" variant="outline">
              Explore Courses
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button className="font-game text-2xl" variant="pixel">
              Sign In
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link href="/dashboard">
            <Button className="font-game text-2xl" variant="pixel">
              Dashboard
            </Button>
          </Link>

          {user ? (
            <UserButton />
          ) : (
            <div className="flex items-center gap-3">
              <span className="font-game text-lg bg-zinc-800 border-2 border-black px-2 py-1 rounded-md text-yellow-400 shadow-[2px_2px_0_0_#000]">
                ⭐ {userDetail?.points || 250} XP
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={logoutGuest}
                className="font-game text-base text-zinc-400 hover:text-white"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;