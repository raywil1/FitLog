import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Dumbbell,
  Clock,
  Calendar,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

interface Template {
  id: string;
  name: string;
  type: "strength" | "cutting";
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  daysPerWeek: number;
  duration: string;
  workouts: WorkoutDay[];
}

const TrainingTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );

  // Mock data for templates
  const templates: Template[] = [
    {
      id: "1",
      name: "Push Pull Legs",
      type: "strength",
      description:
        "A classic bodybuilding split focusing on pushing movements, pulling movements, and leg exercises.",
      difficulty: "intermediate",
      daysPerWeek: 6,
      duration: "8-12 weeks",
      workouts: [
        {
          day: "Day 1",
          focus: "Push (Chest, Shoulders, Triceps)",
          exercises: [
            { name: "Bench Press", sets: 4, reps: "8-10", rest: "90 sec" },
            { name: "Overhead Press", sets: 3, reps: "8-12", rest: "90 sec" },
            {
              name: "Incline Dumbbell Press",
              sets: 3,
              reps: "10-12",
              rest: "60 sec",
            },
            { name: "Lateral Raises", sets: 3, reps: "12-15", rest: "60 sec" },
            {
              name: "Tricep Pushdowns",
              sets: 3,
              reps: "12-15",
              rest: "60 sec",
            },
            {
              name: "Overhead Tricep Extension",
              sets: 3,
              reps: "12-15",
              rest: "60 sec",
            },
          ],
        },
        {
          day: "Day 2",
          focus: "Pull (Back, Biceps)",
          exercises: [
            { name: "Deadlifts", sets: 4, reps: "6-8", rest: "120 sec" },
            {
              name: "Pull-ups/Lat Pulldowns",
              sets: 3,
              reps: "8-12",
              rest: "90 sec",
            },
            { name: "Barbell Rows", sets: 3, reps: "8-10", rest: "90 sec" },
            { name: "Face Pulls", sets: 3, reps: "12-15", rest: "60 sec" },
            { name: "Barbell Curls", sets: 3, reps: "10-12", rest: "60 sec" },
            { name: "Hammer Curls", sets: 3, reps: "10-12", rest: "60 sec" },
          ],
        },
        {
          day: "Day 3",
          focus: "Legs (Quads, Hamstrings, Calves)",
          exercises: [
            { name: "Squats", sets: 4, reps: "8-10", rest: "120 sec" },
            {
              name: "Romanian Deadlifts",
              sets: 3,
              reps: "8-12",
              rest: "90 sec",
            },
            { name: "Leg Press", sets: 3, reps: "10-12", rest: "90 sec" },
            { name: "Leg Extensions", sets: 3, reps: "12-15", rest: "60 sec" },
            { name: "Leg Curls", sets: 3, reps: "12-15", rest: "60 sec" },
            {
              name: "Standing Calf Raises",
              sets: 4,
              reps: "15-20",
              rest: "60 sec",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Upper/Lower Split",
      type: "strength",
      description:
        "A 4-day split that alternates between upper body and lower body workouts for balanced development.",
      difficulty: "beginner",
      daysPerWeek: 4,
      duration: "8-12 weeks",
      workouts: [
        {
          day: "Day 1",
          focus: "Upper Body",
          exercises: [
            { name: "Bench Press", sets: 4, reps: "6-8", rest: "90 sec" },
            { name: "Bent Over Rows", sets: 4, reps: "6-8", rest: "90 sec" },
            { name: "Overhead Press", sets: 3, reps: "8-10", rest: "90 sec" },
            {
              name: "Pull-ups/Lat Pulldowns",
              sets: 3,
              reps: "8-10",
              rest: "90 sec",
            },
            {
              name: "Tricep Extensions",
              sets: 3,
              reps: "10-12",
              rest: "60 sec",
            },
            { name: "Bicep Curls", sets: 3, reps: "10-12", rest: "60 sec" },
          ],
        },
        {
          day: "Day 2",
          focus: "Lower Body",
          exercises: [
            { name: "Squats", sets: 4, reps: "6-8", rest: "120 sec" },
            {
              name: "Romanian Deadlifts",
              sets: 4,
              reps: "6-8",
              rest: "120 sec",
            },
            { name: "Leg Press", sets: 3, reps: "8-10", rest: "90 sec" },
            { name: "Leg Curls", sets: 3, reps: "10-12", rest: "60 sec" },
            { name: "Calf Raises", sets: 4, reps: "12-15", rest: "60 sec" },
            {
              name: "Weighted Planks",
              sets: 3,
              reps: "30-60 sec",
              rest: "60 sec",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "HIIT Cutting Program",
      type: "cutting",
      description:
        "High-intensity interval training combined with strength training to maximize fat loss while preserving muscle.",
      difficulty: "intermediate",
      daysPerWeek: 5,
      duration: "6-8 weeks",
      workouts: [
        {
          day: "Day 1",
          focus: "Full Body + HIIT",
          exercises: [
            { name: "Squat", sets: 3, reps: "10-12", rest: "60 sec" },
            { name: "Push-ups", sets: 3, reps: "12-15", rest: "60 sec" },
            { name: "Dumbbell Rows", sets: 3, reps: "12-15", rest: "60 sec" },
            { name: "Burpees", sets: 4, reps: "30 sec", rest: "30 sec" },
            {
              name: "Mountain Climbers",
              sets: 4,
              reps: "30 sec",
              rest: "30 sec",
            },
            { name: "Jump Rope", sets: 4, reps: "60 sec", rest: "30 sec" },
          ],
        },
        {
          day: "Day 2",
          focus: "Cardio",
          exercises: [
            {
              name: "Treadmill Intervals",
              sets: 10,
              reps: "30 sec sprint/90 sec walk",
              rest: "0 sec",
            },
            {
              name: "Cycling",
              sets: 1,
              reps: "20 min steady state",
              rest: "0 sec",
            },
            {
              name: "Core Circuit",
              sets: 3,
              reps: "1 min each exercise",
              rest: "60 sec between circuits",
            },
          ],
        },
        {
          day: "Day 3",
          focus: "Upper Body + HIIT",
          exercises: [
            {
              name: "Incline Bench Press",
              sets: 3,
              reps: "10-12",
              rest: "60 sec",
            },
            {
              name: "Pull-ups/Lat Pulldowns",
              sets: 3,
              reps: "10-12",
              rest: "60 sec",
            },
            { name: "Shoulder Press", sets: 3, reps: "10-12", rest: "60 sec" },
            { name: "Battle Ropes", sets: 4, reps: "30 sec", rest: "30 sec" },
            { name: "Box Jumps", sets: 4, reps: "30 sec", rest: "30 sec" },
            {
              name: "Kettlebell Swings",
              sets: 4,
              reps: "30 sec",
              rest: "30 sec",
            },
          ],
        },
      ],
    },
    {
      id: "4",
      name: "Full Body Circuit",
      type: "cutting",
      description:
        "A full body circuit training program designed to burn calories and improve conditioning.",
      difficulty: "beginner",
      daysPerWeek: 3,
      duration: "4-6 weeks",
      workouts: [
        {
          day: "Day 1",
          focus: "Full Body Circuit",
          exercises: [
            { name: "Goblet Squats", sets: 3, reps: "15", rest: "30 sec" },
            { name: "Push-ups", sets: 3, reps: "12-15", rest: "30 sec" },
            { name: "Dumbbell Rows", sets: 3, reps: "15", rest: "30 sec" },
            { name: "Lunges", sets: 3, reps: "12 each leg", rest: "30 sec" },
            { name: "Plank", sets: 3, reps: "45 sec", rest: "30 sec" },
            {
              name: "Mountain Climbers",
              sets: 3,
              reps: "45 sec",
              rest: "30 sec",
            },
          ],
        },
      ],
    },
  ];

  const strengthTemplates = templates.filter(
    (template) => template.type === "strength",
  );
  const cuttingTemplates = templates.filter(
    (template) => template.type === "cutting",
  );

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleStartWorkout = () => {
    // This would integrate with the WorkoutLogger component
    console.log("Starting workout with template:", selectedTemplate?.name);
    // Navigate to workout logger or open a modal to start the workout
  };

  const renderTemplateCard = (template: Template) => (
    <Card
      key={template.id}
      className="mb-4 hover:shadow-md transition-shadow cursor-pointer bg-background"
      onClick={() => handleSelectTemplate(template)}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription className="mt-1">
              {template.description}
            </CardDescription>
          </div>
          <Badge
            variant={template.type === "strength" ? "default" : "secondary"}
          >
            {template.type === "strength" ? "Strength" : "Cutting"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Dumbbell className="h-4 w-4" />
            <span>{template.difficulty}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{template.daysPerWeek} days/week</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{template.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" size="sm">
          View Details <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 bg-background">
      <h1 className="text-3xl font-bold mb-6">Training Templates</h1>

      {!selectedTemplate ? (
        <>
          <p className="text-muted-foreground mb-6">
            Choose from our pre-built workout templates designed for different
            fitness goals. Whether you're looking to build strength or cut body
            fat, we have a plan for you.
          </p>

          <Tabs defaultValue="strength" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="strength">Strength Training</TabsTrigger>
              <TabsTrigger value="cutting">Cutting</TabsTrigger>
            </TabsList>

            <TabsContent value="strength" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {strengthTemplates.map(renderTemplateCard)}
              </div>
            </TabsContent>

            <TabsContent value="cutting" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cuttingTemplates.map(renderTemplateCard)}
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div>
          <Button
            variant="outline"
            onClick={() => setSelectedTemplate(null)}
            className="mb-6"
          >
            Back to Templates
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">
                    {selectedTemplate.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {selectedTemplate.description}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    selectedTemplate.type === "strength"
                      ? "default"
                      : "secondary"
                  }
                >
                  {selectedTemplate.type === "strength"
                    ? "Strength"
                    : "Cutting"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-medium">{selectedTemplate.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Frequency</p>
                    <p className="font-medium">
                      {selectedTemplate.daysPerWeek} days/week
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{selectedTemplate.duration}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">Workout Schedule</h3>

              <Accordion type="single" collapsible className="w-full">
                {selectedTemplate.workouts.map((workout, index) => (
                  <AccordionItem key={index} value={`day-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center">
                        <span className="font-medium">{workout.day}</span>
                        <span className="ml-2 text-muted-foreground">
                          - {workout.focus}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-muted">
                            <tr>
                              <th className="text-left p-3">Exercise</th>
                              <th className="text-center p-3">Sets</th>
                              <th className="text-center p-3">Reps</th>
                              <th className="text-center p-3">Rest</th>
                            </tr>
                          </thead>
                          <tbody>
                            {workout.exercises.map((exercise, exIndex) => (
                              <tr key={exIndex} className="border-t">
                                <td className="p-3">{exercise.name}</td>
                                <td className="text-center p-3">
                                  {exercise.sets}
                                </td>
                                <td className="text-center p-3">
                                  {exercise.reps}
                                </td>
                                <td className="text-center p-3">
                                  {exercise.rest}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartWorkout} className="w-full sm:w-auto">
                Start This Workout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrainingTemplates;
