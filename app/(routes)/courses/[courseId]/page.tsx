"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseDetailBanner from "./_components/CourseDetailBanner";
import axios from "axios";
import { Course } from "../_components/CourseList";
import CourseChapters from "./_components/CourseChapters";
import CourseStatus from "./_components/CourseStatus";
import UpgradeToPro from "../../dashboard/_components/UpgradeToPro";
import CommunityHelpSection from "./_components/CommunityHelpSection";

type courseDetail = {};

function CourseDetail() {
  const { courseId } = useParams();
  const [courseDetail, setCourseDetail] = useState<Course>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    courseId && GetCourseDetail();
  }, [courseId]);

  const GetCourseDetail = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await axios.get("/api/course?courseid=" + courseId);
      if (result.data?.error) {
        setError(result.data.error);
      } else {
        setCourseDetail(result?.data);
      }
    } catch (err) {
      console.error("Failed to load course details:", err);
      setError("Unable to load this course at this moment.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center font-game">
        <h2 className="text-3xl text-yellow-400 mb-4">{error}</h2>
        <a href="/courses" className="text-xl underline text-gray-300 hover:text-white">
          ← Back to All Courses
        </a>
      </div>
    );
  }

  return (
    <div>
      <CourseDetailBanner
        loading={loading}
        courseDetail={courseDetail}
        refreshData={() => GetCourseDetail()}
      />
      <div className="grid grid-cols-3 p-10 md:px-24 lg:px-36 gap-7">
        <div className="col-span-2">
          <CourseChapters loading={loading} courseDetail={courseDetail} />
        </div>
        <div>
          <CourseStatus courseDetail={courseDetail} />
          <UpgradeToPro />
          <CommunityHelpSection />
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
