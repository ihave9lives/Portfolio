import ProjectCard from "@/components/ui/ProjectCard";
import { projectsData } from "@/data/projects";

export default function Projects() {
  return (
    <section className="min-h-screen py-24 px-6 md:px-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {projectsData.map((project, index) => (
            <div key={index} className="h-full min-h-[400px]">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
