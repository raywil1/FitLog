import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  DumbbellIcon,
  LineChart,
  Utensils,
  ShoppingCart,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import WorkoutLogger from "./WorkoutLogger";
import MealPlanner from "./MealPlanner";
import TrainingTemplates from "./TrainingTemplates";

interface DashboardProps {
  currentGoal?: "bulking" | "cutting";
  onChangeGoal?: (goal: "bulking" | "cutting") => void;
  recentWorkouts?: Array<{
    id: string;
    date: string;
    type: string;
    duration: number;
    exercises: number;
  }>;
  mealPlanProgress?: number;
  workoutProgress?: number;
  calorieGoal?: number;
  proteinGoal?: number;
}

const Dashboard = ({
  currentGoal = "bulking",
  onChangeGoal = () => {},
  recentWorkouts = [
    {
      id: "1",
      date: "2023-06-15",
      type: "Upper Body",
      duration: 45,
      exercises: 6,
    },
    {
      id: "2",
      date: "2023-06-13",
      type: "Lower Body",
      duration: 60,
      exercises: 5,
    },
    {
      id: "3",
      date: "2023-06-10",
      type: "Full Body",
      duration: 75,
      exercises: 8,
    },
  ],
  mealPlanProgress = 85,
  workoutProgress = 70,
  calorieGoal = currentGoal === "bulking" ? 3200 : 2200,
  proteinGoal = currentGoal === "bulking" ? 180 : 160,
}: DashboardProps) => {
  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Fitness Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your fitness journey and reach your goals
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={currentGoal === "bulking" ? "default" : "outline"}
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => onChangeGoal("bulking")}
            >
              <ArrowUpCircle className="h-4 w-4" />
              Bulking
            </Badge>
            <Badge
              variant={currentGoal === "cutting" ? "default" : "outline"}
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => onChangeGoal("cutting")}
            >
              <ArrowDownCircle className="h-4 w-4" />
              Cutting
            </Badge>
            <Button
              size="sm"
              onClick={() =>
                onChangeGoal(currentGoal === "bulking" ? "cutting" : "bulking")
              }
            >
              Switch to {currentGoal === "bulking" ? "Cutting" : "Bulking"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <DumbbellIcon className="h-5 w-5" />
                Workout Progress
              </CardTitle>
              <CardDescription>Weekly workout completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    {workoutProgress}% Complete
                  </span>
                  <span className="text-sm text-muted-foreground">
                    4/6 workouts
                  </span>
                </div>
                <Progress value={workoutProgress} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Meal Plan Progress
              </CardTitle>
              <CardDescription>Weekly meal plan adherence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    {mealPlanProgress}% Complete
                  </span>
                  <span className="text-sm text-muted-foreground">
                    18/21 meals
                  </span>
                </div>
                <Progress value={mealPlanProgress} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Nutrition Goals
              </CardTitle>
              <CardDescription>
                {currentGoal === "bulking" ? "Surplus" : "Deficit"} targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Calories</span>
                    <span className="font-medium">{calorieGoal} kcal</span>
                  </div>
                  <Progress value={75} className="mt-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Protein</span>
                    <span className="font-medium">{proteinGoal}g</span>
                  </div>
                  <Progress value={80} className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="meals">Meal Plans</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Recent Workouts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentWorkouts.map((workout) => (
                      <div
                        key={workout.id}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{workout.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {workout.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            {workout.exercises} exercises
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {workout.duration} min
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Workouts
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Current Meal Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">
                        {currentGoal === "bulking"
                          ? "High Protein Bulk Plan"
                          : "Lean Cutting Plan"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Week 2 of 8
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium">Today's Meals</p>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Breakfast</span>
                          <span className="text-muted-foreground">
                            {currentGoal === "bulking"
                              ? "Protein Oats & Eggs"
                              : "Greek Yogurt & Berries"}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Lunch</span>
                          <span className="text-muted-foreground">
                            {currentGoal === "bulking"
                              ? "Chicken Rice Bowl"
                              : "Tuna Salad"}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Dinner</span>
                          <span className="text-muted-foreground">
                            {currentGoal === "bulking"
                              ? "Steak & Potatoes"
                              : "Grilled Chicken & Veggies"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Full Meal Plan
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workouts">
            <WorkoutLogger />
          </TabsContent>

          <TabsContent value="meals">
            <MealPlanner />
          </TabsContent>

          <TabsContent value="templates">
            <TrainingTemplates />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
