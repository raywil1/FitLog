import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusCircle,
  Save,
  ChevronRight,
  BarChart3,
  Calendar,
  Clock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Exercise {
  id: string;
  name: string;
  sets: Array<{
    id: string;
    weight: number;
    reps: number;
    completed: boolean;
  }>;
}

interface Workout {
  id: string;
  date: string;
  name: string;
  exercises: Exercise[];
  duration: number;
}

const WorkoutLogger = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [workoutName, setWorkoutName] = useState("New Workout");
  const [selectedExercise, setSelectedExercise] = useState("");

  // Mock data for exercises and workout history
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      name: "Bench Press",
      sets: [
        { id: "1-1", weight: 135, reps: 10, completed: false },
        { id: "1-2", weight: 155, reps: 8, completed: false },
        { id: "1-3", weight: 175, reps: 6, completed: false },
      ],
    },
    {
      id: "2",
      name: "Squat",
      sets: [
        { id: "2-1", weight: 185, reps: 8, completed: false },
        { id: "2-2", weight: 205, reps: 6, completed: false },
        { id: "2-3", weight: 225, reps: 4, completed: false },
      ],
    },
  ]);

  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([
    {
      id: "1",
      date: "2023-06-15",
      name: "Push Day",
      exercises: [
        {
          id: "1",
          name: "Bench Press",
          sets: [
            { id: "1-1", weight: 135, reps: 10, completed: true },
            { id: "1-2", weight: 155, reps: 8, completed: true },
            { id: "1-3", weight: 175, reps: 6, completed: true },
          ],
        },
        {
          id: "3",
          name: "Shoulder Press",
          sets: [
            { id: "3-1", weight: 95, reps: 10, completed: true },
            { id: "3-2", weight: 105, reps: 8, completed: true },
          ],
        },
      ],
      duration: 45,
    },
    {
      id: "2",
      date: "2023-06-13",
      name: "Pull Day",
      exercises: [
        {
          id: "4",
          name: "Deadlift",
          sets: [
            { id: "4-1", weight: 225, reps: 8, completed: true },
            { id: "4-2", weight: 275, reps: 6, completed: true },
            { id: "4-3", weight: 315, reps: 4, completed: true },
          ],
        },
        {
          id: "5",
          name: "Barbell Row",
          sets: [
            { id: "5-1", weight: 135, reps: 10, completed: true },
            { id: "5-2", weight: 155, reps: 8, completed: true },
          ],
        },
      ],
      duration: 50,
    },
  ]);

  const exerciseOptions = [
    { value: "bench-press", label: "Bench Press" },
    { value: "squat", label: "Squat" },
    { value: "deadlift", label: "Deadlift" },
    { value: "shoulder-press", label: "Shoulder Press" },
    { value: "barbell-row", label: "Barbell Row" },
    { value: "pull-up", label: "Pull Up" },
  ];

  const addExercise = () => {
    if (!selectedExercise) return;

    const selectedOption = exerciseOptions.find(
      (option) => option.value === selectedExercise,
    );
    if (!selectedOption) return;

    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: selectedOption.label,
      sets: [{ id: `${Date.now()}-1`, weight: 0, reps: 0, completed: false }],
    };

    setExercises([...exercises, newExercise]);
    setSelectedExercise("");
  };

  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: [
              ...exercise.sets,
              {
                id: `${exerciseId}-${exercise.sets.length + 1}`,
                weight: exercise.sets[exercise.sets.length - 1]?.weight || 0,
                reps: exercise.sets[exercise.sets.length - 1]?.reps || 0,
                completed: false,
              },
            ],
          };
        }
        return exercise;
      }),
    );
  };

  const updateSet = (
    exerciseId: string,
    setId: string,
    field: "weight" | "reps",
    value: number,
  ) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) => {
              if (set.id === setId) {
                return { ...set, [field]: value };
              }
              return set;
            }),
          };
        }
        return exercise;
      }),
    );
  };

  const toggleSetCompletion = (exerciseId: string, setId: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) => {
              if (set.id === setId) {
                return { ...set, completed: !set.completed };
              }
              return set;
            }),
          };
        }
        return exercise;
      }),
    );
  };

  const saveWorkout = () => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      name: workoutName,
      exercises: exercises
        .map((exercise) => ({
          ...exercise,
          sets: exercise.sets.filter((set) => set.completed),
        }))
        .filter((exercise) => exercise.sets.length > 0),
      duration: 45, // Mock duration
    };

    setWorkoutHistory([newWorkout, ...workoutHistory]);

    // Reset for new workout
    setWorkoutName("New Workout");
    setExercises([]);
    setActiveTab("history");
  };

  return (
    <div className="bg-background p-6 rounded-lg w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Workout Logger</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="new">New Workout</TabsTrigger>
          <TabsTrigger value="history">Workout History</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Input
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  className="text-xl font-bold"
                />
              </CardTitle>
              <CardDescription>
                Today's Date: {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Label htmlFor="exercise-select">Add Exercise</Label>
                  <Select
                    value={selectedExercise}
                    onValueChange={setSelectedExercise}
                  >
                    <SelectTrigger id="exercise-select">
                      <SelectValue placeholder="Select an exercise" />
                    </SelectTrigger>
                    <SelectContent>
                      {exerciseOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={addExercise}
                  className="flex items-center gap-2"
                >
                  <PlusCircle size={16} />
                  Add
                </Button>
              </div>

              {exercises.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No exercises added yet. Add an exercise to get started.
                </div>
              ) : (
                <div className="space-y-6">
                  {exercises.map((exercise) => (
                    <Card key={exercise.id} className="overflow-hidden">
                      <CardHeader className="bg-muted py-3">
                        <CardTitle className="text-lg">
                          {exercise.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[80px]">Set</TableHead>
                              <TableHead>Weight (lbs)</TableHead>
                              <TableHead>Reps</TableHead>
                              <TableHead className="w-[100px]">Done</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {exercise.sets.map((set, index) => (
                              <TableRow key={set.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={set.weight}
                                    onChange={(e) =>
                                      updateSet(
                                        exercise.id,
                                        set.id,
                                        "weight",
                                        Number(e.target.value),
                                      )
                                    }
                                    className="w-20"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={set.reps}
                                    onChange={(e) =>
                                      updateSet(
                                        exercise.id,
                                        set.id,
                                        "reps",
                                        Number(e.target.value),
                                      )
                                    }
                                    className="w-20"
                                  />
                                </TableCell>
                                <TableCell>
                                  <input
                                    type="checkbox"
                                    checked={set.completed}
                                    onChange={() =>
                                      toggleSetCompletion(exercise.id, set.id)
                                    }
                                    className="h-5 w-5"
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addSet(exercise.id)}
                          className="mt-4"
                        >
                          Add Set
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Button
                onClick={saveWorkout}
                className="w-full"
                disabled={exercises.length === 0}
              >
                <Save className="mr-2 h-4 w-4" /> Save Workout
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Workout History</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" /> Filter by Date
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" /> View Progress
                </Button>
              </div>
            </div>

            {workoutHistory.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8 text-muted-foreground">
                  No workout history yet. Complete a workout to see it here.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {workoutHistory.map((workout) => (
                  <Card key={workout.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>{workout.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" /> {workout.date}
                          <Clock className="ml-3 mr-1 h-4 w-4" />{" "}
                          {workout.duration} min
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {workout.exercises.map((exercise) => (
                          <div
                            key={exercise.id}
                            className="flex justify-between items-center py-1 border-b last:border-0"
                          >
                            <div>
                              <p className="font-medium">{exercise.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {exercise.sets.length} sets •
                                {exercise.sets.reduce(
                                  (total, set) => total + set.reps,
                                  0,
                                )}{" "}
                                total reps
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              Details <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
                <CardDescription>
                  Your strength progress over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Bench Press</span>
                      <span className="text-sm text-muted-foreground">
                        175 lbs (1RM)
                      </span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Squat</span>
                      <span className="text-sm text-muted-foreground">
                        285 lbs (1RM)
                      </span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Deadlift</span>
                      <span className="text-sm text-muted-foreground">
                        315 lbs (1RM)
                      </span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutLogger;
