import React, { useEffect } from "react";
import { useHistory } from "@docusaurus/router";
import { useQuery } from "react-query";
import Tag from "@site/src/components/ui/Tag";
// import Spinner from "@site/src/components/ui/Spinner";
// import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import UpcomingCourseJSON from "@site/static/json/upcoming-course.json";
import { Skeleton } from "@site/src/components/ui/Skeleton";
import { getCourses } from "@site/src/api/course";
import { TCourse } from "../typings/course";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";

type TProps = {
  course: TCourse;
};

const CourseCard = (props: TProps) => {
  const { course } = props;
  const history = useHistory();

  const viewCourse = (path: string) => {
    if (path.startsWith("http")) {
      window.location.href = path;
    } else {
      history.push(path);
    }
  };

  return (
    <div
      onClick={() => viewCourse(course.route_path)}
      className="w-full cursor-pointer md:w-[300px] border border-solid rounded-md shadow-sm transition-shadow hover:shadow-lg overflow-hidden"
    >
      <div className="bg-background-subtle w-full h-[150px]">
        <img
          src={course.cover_img}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center text-[22px] leading-[25px] font-bold font-ubuntu">
          <span>{course.title}</span>
        </div>
        <div className="text-sm leading-[17px] mt-[10px]">
          {course.description}
        </div>
        {Boolean(course.user_cnt) && (
          <div className="flex gap-2 mt-[14px]">
            <Tag className="bg-brand-muted">{`${course.user_cnt} learners`}</Tag>
          </div>
        )}
      </div>
    </div>
  );
};

const UpcomingCourseCard = (props: any) => {
  const { course } = props;
  const history = useHistory();
  const { i18n } = useDocusaurusContext();

  const viewCourse = (path: string) => {
    if (path.startsWith("http")) {
      window.location.href = path;
    } else {
      history.push(path);
    }
  };

  return (
    <div
      onClick={() => viewCourse(i18n.currentLocale === "en" ? course.path_en : course.path)}
      className="w-full cursor-pointer md:w-[300px] border border-solid rounded-md shadow-sm transition-shadow hover:shadow-lg overflow-hidden"
    >
      <div className="bg-background-subtle w-full h-[150px]">
        <img
          src={course.image_url}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center text-[22px] leading-[25px] font-bold font-ubuntu">
          <span>
            {i18n.currentLocale === "en" ? course.title_en : course.title}
          </span>
        </div>
        <div className="text-sm leading-[17px] mt-[10px]">
          {i18n.currentLocale === "en" ? course.description_en : course.description}
        </div>
      </div>
    </div>
  );
};

const CourseList = ({
  isTotal = true,
  isUpcoming,
}: {
  isTotal?: boolean;
  isUpcoming: boolean;
}) => {
  const { i18n } = useDocusaurusContext();

  const { data, isLoading } = useQuery(
    ["getCourses", isUpcoming, i18n.currentLocale],
    () =>
      getCourses(
        isUpcoming ? 2 : 1,
        i18n.currentLocale === "en" ? "en" : undefined
      )
  );

  // const isLoading = true;

  return (
    <div
      className={[
        "w-full flex flex-col items-center",
        isUpcoming ? "mt-8" : "",
      ].join(" ")}
    >
      <div className="w-full font-ubuntu font-bold">
        <span>
          {isUpcoming ? (
            <Translate id="home.courses.upcoming.title">
              即将推出的课程
            </Translate>
          ) : (
            <Translate id="home.courses.popular.title">热门课程</Translate>
          )}
        </span>
        <Tag circle className="h-6 w-6 bg-background-muted ml-3">
          {isUpcoming ? UpcomingCourseJSON.length : data?.list.length ?? 0}
        </Tag>
      </div>
      <div className="flex flex-wrap justify-center md:justify-around gap-6 mt-[35px]">
        {isLoading ? (
          <>
            {new Array(3).fill("").map((_, index) => (
              <Skeleton
                key={index}
                className="h-[276px] w-full md:w-[300px] rounded-md shadow-sm transition-shadow hover:shadow-lg"
              >
                <Skeleton className="h-[150px] w-full bg-gray-200" />
                <Skeleton className="h-10 mt-4 mx-4 w-1/2 bg-gray-200" />
                <Skeleton className="h-6 mt-4 mx-4 w-3/4 bg-gray-200" />
              </Skeleton>
            ))}
          </>
        ) : isUpcoming ? (
          UpcomingCourseJSON.map(
            (item) => <UpcomingCourseCard key={item.id} course={item} />
          )
        ) : (
          ((isTotal ? data?.list : data?.list.slice(0, 6)) || []).map(
            (item) => <CourseCard key={item.id} course={item} />
          )
        )}
        {Array(3 - (data?.list.length % 3) || 0)
          .fill("")
          .map((_, index: number) => (
            <div key={index} className="w-full md:w-[300px] h-0"></div>
          ))}
      </div>
    </div>
  );
};

export default CourseList;
