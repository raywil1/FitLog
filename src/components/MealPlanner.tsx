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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronRight, Plus, Printer, ShoppingCart } from "lucide-react";

interface MealPlannerProps {
  currentGoal?: "bulking" | "cutting";
  onGenerateGroceryList?: (mealPlan: MealPlan) => void;
}

interface MealPlan {
  id: string;
  name: string;
  goal: "bulking" | "cutting";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: Meal[];
}

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
}

const MealPlanner: React.FC<MealPlannerProps> = ({
  currentGoal = "bulking",
  onGenerateGroceryList = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("create");
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [calorieGoal, setCalorieGoal] = useState("2500");
  const [proteinGoal, setProteinGoal] = useState("180");
  const [carbsGoal, setCarbsGoal] = useState("300");
  const [fatGoal, setFatGoal] = useState("70");
  const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlan | null>(
    null,
  );

  // Mock meal plans
  const mealPlans: MealPlan[] = [
    {
      id: "1",
      name: "High Protein Bulking Plan",
      goal: "bulking",
      calories: 3200,
      protein: 220,
      carbs: 350,
      fat: 80,
      meals: [
        {
          id: "m1",
          name: "Breakfast",
          time: "8:00 AM",
          calories: 650,
          protein: 45,
          carbs: 70,
          fat: 20,
          ingredients: [
            "Oatmeal (1 cup)",
            "Banana (1)",
            "Protein powder (2 scoops)",
            "Peanut butter (2 tbsp)",
            "Milk (1 cup)",
          ],
        },
        {
          id: "m2",
          name: "Mid-Morning Snack",
          time: "10:30 AM",
          calories: 350,
          protein: 25,
          carbs: 30,
          fat: 15,
          ingredients: [
            "Greek yogurt (1 cup)",
            "Berries (1/2 cup)",
            "Almonds (1/4 cup)",
            "Honey (1 tsp)",
          ],
        },
        {
          id: "m3",
          name: "Lunch",
          time: "1:00 PM",
          calories: 750,
          protein: 50,
          carbs: 80,
          fat: 20,
          ingredients: [
            "Chicken breast (8 oz)",
            "Brown rice (1.5 cups)",
            "Broccoli (1 cup)",
            "Olive oil (1 tbsp)",
            "Sweet potato (1 medium)",
          ],
        },
        {
          id: "m4",
          name: "Afternoon Snack",
          time: "4:00 PM",
          calories: 400,
          protein: 30,
          carbs: 40,
          fat: 10,
          ingredients: [
            "Protein shake (1 scoop)",
            "Banana (1)",
            "Ezekiel bread (2 slices)",
            "Avocado (1/4)",
          ],
        },
        {
          id: "m5",
          name: "Dinner",
          time: "7:00 PM",
          calories: 800,
          protein: 55,
          carbs: 70,
          fat: 25,
          ingredients: [
            "Salmon (8 oz)",
            "Quinoa (1 cup)",
            "Asparagus (1 cup)",
            "Olive oil (1 tbsp)",
            "Sweet potato (1 medium)",
          ],
        },
        {
          id: "m6",
          name: "Before Bed",
          time: "9:30 PM",
          calories: 250,
          protein: 15,
          carbs: 10,
          fat: 15,
          ingredients: [
            "Cottage cheese (1 cup)",
            "Casein protein (1 scoop)",
            "Almond butter (1 tbsp)",
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Lean Cutting Plan",
      goal: "cutting",
      calories: 1800,
      protein: 180,
      carbs: 150,
      fat: 50,
      meals: [
        {
          id: "m1",
          name: "Breakfast",
          time: "7:00 AM",
          calories: 350,
          protein: 35,
          carbs: 30,
          fat: 10,
          ingredients: [
            "Egg whites (1 cup)",
            "Whole egg (1)",
            "Ezekiel bread (1 slice)",
            "Spinach (1 cup)",
            "Bell peppers (1/2 cup)",
          ],
        },
        {
          id: "m2",
          name: "Mid-Morning Snack",
          time: "10:00 AM",
          calories: 200,
          protein: 25,
          carbs: 15,
          fat: 5,
          ingredients: [
            "Greek yogurt (3/4 cup)",
            "Berries (1/4 cup)",
            "Protein powder (1/2 scoop)",
          ],
        },
        {
          id: "m3",
          name: "Lunch",
          time: "1:00 PM",
          calories: 450,
          protein: 40,
          carbs: 40,
          fat: 15,
          ingredients: [
            "Chicken breast (6 oz)",
            "Sweet potato (small)",
            "Green beans (1 cup)",
            "Olive oil (1/2 tbsp)",
          ],
        },
        {
          id: "m4",
          name: "Afternoon Snack",
          time: "4:00 PM",
          calories: 200,
          protein: 30,
          carbs: 10,
          fat: 5,
          ingredients: [
            "Protein shake (1 scoop)",
            "Apple (1 small)",
            "Almonds (10)",
          ],
        },
        {
          id: "m5",
          name: "Dinner",
          time: "7:00 PM",
          calories: 450,
          protein: 40,
          carbs: 30,
          fat: 15,
          ingredients: [
            "Lean ground turkey (6 oz)",
            "Quinoa (1/2 cup)",
            "Zucchini (1 cup)",
            "Broccoli (1 cup)",
            "Olive oil (1/2 tbsp)",
          ],
        },
        {
          id: "m6",
          name: "Evening Snack",
          time: "9:00 PM",
          calories: 150,
          protein: 10,
          carbs: 5,
          fat: 10,
          ingredients: [
            "Cottage cheese (1/2 cup)",
            "Casein protein (1/2 scoop)",
          ],
        },
      ],
    },
  ];

  const dietaryOptions = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten-free", label: "Gluten Free" },
    { id: "dairy-free", label: "Dairy Free" },
    { id: "keto", label: "Keto" },
    { id: "paleo", label: "Paleo" },
  ];

  const handleGenerateMealPlan = () => {
    // In a real app, this would generate a custom meal plan based on inputs
    // For now, we'll just select a mock meal plan based on the current goal
    const filteredPlans = mealPlans.filter((plan) => plan.goal === currentGoal);
    if (filteredPlans.length > 0) {
      setSelectedMealPlan(filteredPlans[0]);
      setActiveTab("view");
    }
  };

  const handleGenerateGroceryList = () => {
    if (selectedMealPlan) {
      onGenerateGroceryList(selectedMealPlan);
    }
  };

  const toggleDietaryPreference = (preference: string) => {
    if (dietaryPreferences.includes(preference)) {
      setDietaryPreferences(dietaryPreferences.filter((p) => p !== preference));
    } else {
      setDietaryPreferences([...dietaryPreferences, preference]);
    }
  };

  return (
    <div className="bg-background p-6 rounded-lg w-full h-full">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Meal Planner</h2>
            <p className="text-muted-foreground">
              Create and customize meal plans based on your fitness goals.
            </p>
          </div>
          <Badge
            variant={currentGoal === "bulking" ? "default" : "destructive"}
            className="text-sm py-1 px-3"
          >
            {currentGoal === "bulking" ? "Bulking Mode" : "Cutting Mode"}
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="create">Create Meal Plan</TabsTrigger>
            <TabsTrigger value="view">View Meal Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dietary Preferences</CardTitle>
                <CardDescription>
                  Select any dietary restrictions or preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dietaryOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={option.id}
                        checked={dietaryPreferences.includes(option.id)}
                        onCheckedChange={() =>
                          toggleDietaryPreference(option.id)
                        }
                      />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nutrition Goals</CardTitle>
                <CardDescription>
                  Set your daily calorie and macro targets.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="calories">Daily Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={calorieGoal}
                        onChange={(e) => setCalorieGoal(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="protein">Protein (g)</Label>
                      <Input
                        id="protein"
                        type="number"
                        value={proteinGoal}
                        onChange={(e) => setProteinGoal(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="carbs">Carbohydrates (g)</Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={carbsGoal}
                        onChange={(e) => setCarbsGoal(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fat">Fat (g)</Label>
                      <Input
                        id="fat"
                        type="number"
                        value={fatGoal}
                        onChange={(e) => setFatGoal(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleGenerateMealPlan} className="w-full">
                  Generate Meal Plan
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="view" className="space-y-6">
            {selectedMealPlan ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{selectedMealPlan.name}</CardTitle>
                      <CardDescription>
                        {selectedMealPlan.calories} calories •{" "}
                        {selectedMealPlan.protein}g protein •
                        {selectedMealPlan.carbs}g carbs • {selectedMealPlan.fat}
                        g fat
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {}}
                        className="flex items-center gap-1"
                      >
                        <Printer className="h-4 w-4" />
                        Print
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleGenerateGroceryList}
                        className="flex items-center gap-1"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Grocery List
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-6">
                        {selectedMealPlan.meals.map((meal) => (
                          <div key={meal.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <h3 className="font-medium text-lg">
                                  {meal.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {meal.time}
                                </p>
                              </div>
                              <div className="text-sm text-right">
                                <p>{meal.calories} calories</p>
                                <p className="text-muted-foreground">
                                  P: {meal.protein}g • C: {meal.carbs}g • F:{" "}
                                  {meal.fat}g
                                </p>
                              </div>
                            </div>
                            <Separator className="my-2" />
                            <div>
                              <h4 className="text-sm font-medium mb-1">
                                Ingredients:
                              </h4>
                              <ul className="text-sm space-y-1">
                                {meal.ingredients.map((ingredient, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-center gap-2"
                                  >
                                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                    {ingredient}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("create")}
                    >
                      Create New Plan
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="default">Customize Plan</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Customize Meal Plan
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            You can adjust meals, ingredients, and portions to
                            better fit your preferences.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="py-4">
                          <p className="text-sm text-muted-foreground mb-4">
                            This feature will allow you to customize individual
                            meals and ingredients.
                          </p>
                          <p className="text-sm font-medium">
                            Coming soon in the next update!
                          </p>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Meal Plan Selected</CardTitle>
                  <CardDescription>
                    Generate a new meal plan or select from your saved plans.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <div className="text-center space-y-4">
                    <div className="bg-muted rounded-full p-6 inline-block">
                      <Plus className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium">
                      Create Your First Meal Plan
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      Generate a customized meal plan based on your fitness
                      goals, dietary preferences, and calorie targets.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setActiveTab("create")}
                    className="w-full"
                  >
                    Create Meal Plan
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MealPlanner;
