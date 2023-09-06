import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Load from "./pages/Load/Load";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Jobs = lazy(() => import("./pages/Jobs/Jobs"));
const Courses = lazy(() => import("./pages/Courses/Courses"));
const Locations = lazy(() => import("./pages/Locations/Locations"));
const Occupations = lazy(() => import("./pages/Occupations/Occupations"));
const Clusters = lazy(() => import("./pages/Clusters/Clusters"));
const ViewJob = lazy(() => import("./pages/Jobs/ViewJob"));
const ViewLocation = lazy(() => import("./pages/Locations/ViewLocation"));
const OnetJobs = lazy(() => import("./pages/Jobs/OnetJobs"));
const ViewCluster = lazy(() => import("./pages/Clusters/ViewCluster"));
const ClusterJobs = lazy(() => import("./pages/Jobs/ClusterJobs"));
const ViewCourse = lazy(() => import("./pages/Courses/ViewCourse"));
const ViewOccupation = lazy(() => import("./pages/Occupations/ViewOccupation"));
const LocationJobs = lazy(() => import("./pages/Jobs/LocationJobs"));
const CourseJobs = lazy(() => import("./pages/Jobs/CourseJobs"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Load />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/About",
    element: (
      <Suspense fallback={<Load />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/Jobs",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Load />}>
            <Jobs />
          </Suspense>
        ),
      },
      {
        path: ":id",
        element: (
          <Suspense fallback={<Load />}>
            <ViewJob />
          </Suspense>
        ),
      },

      {
        path: "/Jobs/occupation/:id",
        element: (
          <Suspense fallback={<Load />}>
            <OnetJobs />
          </Suspense>
        ),
      },

      {
        path: "/Jobs/locations/:id",
        element: (
          <Suspense fallback={<Load />}>
            <LocationJobs />
          </Suspense>
        ),
      },

      {
        path: "/Jobs/cluster/:id",
        element: (
          <Suspense fallback={<Load />}>
            <ClusterJobs />
          </Suspense>
        ),
      },

      {
        path: "/Jobs/course/:id",
        element: (
          <Suspense fallback={<Load />}>
            <CourseJobs />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/Occupations",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Load />}>
            <Occupations />
          </Suspense>
        ),
      },
      {
        path: ":id",
        element: (
          <Suspense fallback={<Load />}>
            <ViewOccupation />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/Courses",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Load />}>
            <Courses />
          </Suspense>
        ),
      },
      {
        path: ":id",
        element: (
          <Suspense fallback={<Load />}>
            <ViewCourse />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/Locations",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Load />}>
            <Locations />
          </Suspense>
        ),
      },
      {
        path: ":id",
        element: (
          <Suspense fallback={<Load />}>
            <ViewLocation />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/Clusters",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Load />}>
            <Clusters />
          </Suspense>
        ),
      },
      {
        path: ":id",
        element: (
          <Suspense fallback={<Load />}>
            <ViewCluster />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/Contact",
    element: (
      <Suspense fallback={<Load />}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: "/Load",
    element: <Load />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);