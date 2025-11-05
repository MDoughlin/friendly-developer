import type { Route } from "./+types/index";
import type { Project } from "~/types";
import ProjectCard from "../components/ProjectCard";
import Pagination from "../components/Pagination";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const data = await res.json();

  return { projects: data };
}

const ProjectPage = ({ loaderData }: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { projects } = loaderData as { projects: Project[] };

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const projectsPerPage = 10;

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  //get current pages projects
  const indexofLast = currentPage * projectsPerPage;
  const indexofFirst = indexofLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexofFirst, indexofLast);

  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm cursor-pointer % ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {currentProjects.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard key={project.id} project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
export default ProjectPage;
