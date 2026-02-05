import { createBrowserRouter } from "react-router";
import { Root } from "./components/root";
import { Home } from "./components/home";
import { Clubs } from "./components/clubs";
import { ClubDetail } from "./components/club-detail";
import { Jobs } from "./components/jobs";
import { JobDetail } from "./components/job-detail";
import { PostJob } from "./components/post-job";
import { MyApplications } from "./components/my-applications";
import { Profile } from "./components/profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "clubs", Component: Clubs },
      { path: "clubs/:id", Component: ClubDetail },
      { path: "jobs", Component: Jobs },
      { path: "jobs/:id", Component: JobDetail },
      { path: "post-job", Component: PostJob },
      { path: "my-applications", Component: MyApplications },
      { path: "profile", Component: Profile },
    ],
  },
]);
