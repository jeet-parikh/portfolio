import { ProjectGrid } from "@/components/project-grid";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            My Projects
          </h1>
          
        </div>

        <ProjectGrid />
      </div>
    </div>
  );
}
