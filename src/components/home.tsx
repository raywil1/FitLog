import React from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dumbbell,
  Utensils,
  ClipboardList,
  LineChart,
  User,
} from "lucide-react";

import Dashboard from "./Dashboard";
import WorkoutLogger from "./WorkoutLogger";
import MealPlanner from "./MealPlanner";
import TrainingTemplates from "./TrainingTemplates";

const Home = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />
            <h1 className="text-xl font-bold">FitTrack Pro</h1>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-primary/10">
              <span className="text-primary">Bulking Mode</span>
            </Badge>

            <Avatar>
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=fitness"
                alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <div className="container mt-6">
        <Tabs
          defaultValue="dashboard"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="workout" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              Workout Logger
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Training Templates
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Meal Planner
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="dashboard" className="space-y-4">
            <Dashboard />
          </TabsContent>

          <TabsContent value="workout" className="space-y-4">
            <WorkoutLogger />
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <TrainingTemplates />
          </TabsContent>

          <TabsContent value="meals" className="space-y-4">
            <MealPlanner />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>
                  Manage your fitness goals and personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=fitness"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Name</h3>
                    <p className="text-sm text-muted-foreground">
                      John Fitness
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Current Goal</h3>
                    <p className="text-sm text-muted-foreground">Bulking</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Weight</h3>
                    <p className="text-sm text-muted-foreground">185 lbs</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Height</h3>
                    <p className="text-sm text-muted-foreground">6'0"</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
