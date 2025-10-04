"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";
import { Calendar, MapPin, Building } from "lucide-react";

export function AboutContent() {
  const skillCategories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="space-y-16">
      {/* Bio Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">My Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              I'm a Computer Science student at Yale University with a passion
              for building innovative solutions at the intersection of AI, data
              engineering, and healthcare. My journey began with self-taught iOS
              development, leading to successful mobile apps with thousands of
              downloads across 50+ countries.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently, I'm working on predictive analytics for breast cancer
              recurrence at Yale School of Medicine, where I'm developing AI
              models to interface with large-scale electronic health records. I
              also lead product development for Yale's largest CS club, managing
              9 software products with 20,000+ users.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My experience spans from building scalable data pipelines at
              Bloomberg to developing AI-powered clinical trial analytics. I'm
              passionate about using technology to solve real-world problems and
              make a meaningful impact.
            </p>

            {/* What I'm Learning */}
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="font-semibold text-primary mb-2">
                Currently Learning
              </h3>
              <p className="text-sm text-muted-foreground">
                Advanced ML techniques for healthcare, distributed systems with
                Kubernetes, and exploring the intersection of AI and scientific
                computing.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillCategories).map(([category, categorySkills]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="text-sm"
                    >
                      {skill.icon && <span className="mr-1">{skill.icon}</span>}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{exp.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Building className="h-4 w-4" />
                          {exp.company}
                        </CardDescription>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.startDate} -{" "}
                          {exp.current ? "Present" : exp.endDate}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {exp.description.map((desc, descIndex) => (
                        <li key={descIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
