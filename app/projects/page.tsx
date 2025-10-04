import { ProjectGrid } from "@/components/project-grid";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of my work spanning AI, data engineering, mobile
            development, and full-stack applications. Each project represents a
            unique challenge and learning opportunity.
          </p>
        </div>

        <ProjectGrid />
      </div>
    </div>
  );
}
