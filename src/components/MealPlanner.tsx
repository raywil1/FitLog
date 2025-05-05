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
  description?: string;
  duration?: string;
}

interface Ingredient {
  name: string;
  amount: string;
  measurement: string;
}

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: Ingredient[];
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
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
            { name: "Oatmeal", amount: "1", measurement: "cup" },
            { name: "Banana", amount: "1", measurement: "medium" },
            { name: "Protein powder", amount: "2", measurement: "scoops" },
            { name: "Peanut butter", amount: "2", measurement: "tbsp" },
            { name: "Milk", amount: "1", measurement: "cup" },
          ],
          prepTime: "5 minutes",
          cookTime: "5 minutes",
          instructions: [
            "Bring water to a boil and add oatmeal. Cook for 3-5 minutes, stirring occasionally.",
            "Mix in protein powder until fully dissolved.",
            "Top with sliced banana and peanut butter.",
            "Serve with a glass of milk on the side.",
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
            { name: "Greek yogurt", amount: "1", measurement: "cup" },
            { name: "Mixed berries", amount: "1/2", measurement: "cup" },
            { name: "Almonds", amount: "1/4", measurement: "cup" },
            { name: "Honey", amount: "1", measurement: "tsp" },
          ],
          prepTime: "5 minutes",
          cookTime: "0 minutes",
          instructions: [
            "Add Greek yogurt to a bowl.",
            "Top with mixed berries and almonds.",
            "Drizzle honey over the top.",
            "Mix and enjoy.",
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
            { name: "Chicken breast", amount: "8", measurement: "oz" },
            { name: "Brown rice", amount: "1.5", measurement: "cups" },
            { name: "Broccoli", amount: "1", measurement: "cup" },
            { name: "Olive oil", amount: "1", measurement: "tbsp" },
            { name: "Sweet potato", amount: "1", measurement: "medium" },
          ],
          prepTime: "10 minutes",
          cookTime: "25 minutes",
          instructions: [
            "Season chicken breast with salt and pepper.",
            "Heat olive oil in a pan over medium heat and cook chicken for 6-7 minutes per side until fully cooked.",
            "Cook brown rice according to package instructions.",
            "Steam broccoli for 5 minutes until tender but still crisp.",
            "Bake sweet potato in the oven at 400°F for 45 minutes or microwave for 5-8 minutes.",
            "Plate all components and serve.",
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
            { name: "Protein powder", amount: "1", measurement: "scoop" },
            { name: "Banana", amount: "1", measurement: "medium" },
            { name: "Ezekiel bread", amount: "2", measurement: "slices" },
            { name: "Avocado", amount: "1/4", measurement: "whole" },
            { name: "Water", amount: "8", measurement: "oz" },
          ],
          prepTime: "3 minutes",
          cookTime: "2 minutes",
          instructions: [
            "Toast the Ezekiel bread until golden brown.",
            "Mash the avocado and spread it on the toast.",
            "Mix protein powder with water in a shaker bottle until smooth.",
            "Enjoy with a banana on the side.",
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
            { name: "Salmon", amount: "8", measurement: "oz" },
            { name: "Quinoa", amount: "1", measurement: "cup" },
            { name: "Asparagus", amount: "1", measurement: "cup" },
            { name: "Olive oil", amount: "1", measurement: "tbsp" },
            { name: "Sweet potato", amount: "1", measurement: "medium" },
            { name: "Lemon", amount: "1/2", measurement: "whole" },
            { name: "Garlic", amount: "2", measurement: "cloves" },
            { name: "Salt and pepper", amount: "1/4", measurement: "tsp each" },
          ],
          prepTime: "10 minutes",
          cookTime: "25 minutes",
          instructions: [
            "Preheat oven to 400°F.",
            "Season salmon with salt, pepper, and minced garlic.",
            "Place salmon on a baking sheet and drizzle with half the olive oil.",
            "Bake for 12-15 minutes until salmon flakes easily with a fork.",
            "Meanwhile, cook quinoa according to package instructions.",
            "Trim asparagus and toss with remaining olive oil, salt, and pepper.",
            "Roast asparagus in the oven for the last 10 minutes of salmon cooking time.",
            "Microwave or bake sweet potato until tender.",
            "Plate all components and squeeze fresh lemon over the salmon before serving.",
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
            { name: "Cottage cheese", amount: "1", measurement: "cup" },
            { name: "Casein protein", amount: "1", measurement: "scoop" },
            { name: "Almond butter", amount: "1", measurement: "tbsp" },
            { name: "Cinnamon", amount: "1/4", measurement: "tsp" },
          ],
          prepTime: "3 minutes",
          cookTime: "0 minutes",
          instructions: [
            "Mix cottage cheese and casein protein powder in a bowl until well combined.",
            "Stir in almond butter.",
            "Sprinkle with cinnamon for added flavor.",
            "Consume 30-60 minutes before bedtime for optimal overnight protein synthesis.",
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
            { name: "Egg whites", amount: "1", measurement: "cup" },
            { name: "Whole egg", amount: "1", measurement: "large" },
            { name: "Ezekiel bread", amount: "1", measurement: "slice" },
            { name: "Spinach", amount: "1", measurement: "cup" },
            { name: "Bell peppers", amount: "1/2", measurement: "cup" },
            { name: "Olive oil spray", amount: "1", measurement: "spray" },
            { name: "Salt and pepper", amount: "1/8", measurement: "tsp each" },
          ],
          prepTime: "5 minutes",
          cookTime: "8 minutes",
          instructions: [
            "Heat a non-stick pan over medium heat and spray with olive oil.",
            "Sauté chopped bell peppers for 2 minutes.",
            "Add spinach and cook until wilted, about 1 minute.",
            "Pour in egg whites and whole egg, season with salt and pepper.",
            "Scramble until fully cooked but still moist.",
            "Toast Ezekiel bread and serve with the egg scramble on top.",
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
            { name: "Greek yogurt", amount: "3/4", measurement: "cup" },
            { name: "Mixed berries", amount: "1/4", measurement: "cup" },
            { name: "Protein powder", amount: "1/2", measurement: "scoop" },
            { name: "Stevia", amount: "1", measurement: "packet" },
            { name: "Cinnamon", amount: "1/8", measurement: "tsp" },
          ],
          prepTime: "3 minutes",
          cookTime: "0 minutes",
          instructions: [
            "Add Greek yogurt to a bowl.",
            "Mix in protein powder until fully incorporated.",
            "Top with mixed berries.",
            "Sprinkle with cinnamon and stevia if desired for added sweetness.",
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
            { name: "Chicken breast", amount: "6", measurement: "oz" },
            { name: "Sweet potato", amount: "1", measurement: "small" },
            { name: "Green beans", amount: "1", measurement: "cup" },
            { name: "Olive oil", amount: "1/2", measurement: "tbsp" },
            { name: "Garlic powder", amount: "1/4", measurement: "tsp" },
            { name: "Paprika", amount: "1/4", measurement: "tsp" },
            { name: "Salt and pepper", amount: "1/8", measurement: "tsp each" },
            { name: "Lemon", amount: "1/4", measurement: "whole" },
          ],
          prepTime: "10 minutes",
          cookTime: "25 minutes",
          instructions: [
            "Preheat oven to 375°F.",
            "Season chicken breast with garlic powder, paprika, salt, and pepper.",
            "Heat olive oil in an oven-safe pan over medium-high heat.",
            "Sear chicken for 2-3 minutes per side until golden.",
            "Transfer pan to oven and bake for 15-18 minutes until chicken reaches 165°F internally.",
            "Meanwhile, pierce sweet potato with a fork and microwave for 5-6 minutes until tender.",
            "Steam green beans for 5 minutes until crisp-tender.",
            "Squeeze fresh lemon over chicken before serving.",
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
            { name: "Protein powder", amount: "1", measurement: "scoop" },
            { name: "Water", amount: "8", measurement: "oz" },
            { name: "Apple", amount: "1", measurement: "small" },
            { name: "Almonds", amount: "10", measurement: "whole" },
            { name: "Cinnamon", amount: "1/8", measurement: "tsp" },
          ],
          prepTime: "2 minutes",
          cookTime: "0 minutes",
          instructions: [
            "Mix protein powder with water in a shaker bottle until smooth.",
            "Slice apple and sprinkle with cinnamon if desired.",
            "Consume with almonds as a satisfying pre-workout snack.",
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
            { name: "Lean ground turkey", amount: "6", measurement: "oz" },
            { name: "Quinoa", amount: "1/2", measurement: "cup" },
            { name: "Zucchini", amount: "1", measurement: "cup" },
            { name: "Broccoli", amount: "1", measurement: "cup" },
            { name: "Olive oil", amount: "1/2", measurement: "tbsp" },
            { name: "Garlic", amount: "2", measurement: "cloves" },
            { name: "Onion", amount: "1/4", measurement: "cup" },
            { name: "Low-sodium soy sauce", amount: "1", measurement: "tsp" },
            { name: "Italian herbs", amount: "1/2", measurement: "tsp" },
          ],
          prepTime: "10 minutes",
          cookTime: "20 minutes",
          instructions: [
            "Cook quinoa according to package instructions.",
            "Heat olive oil in a large pan over medium heat.",
            "Add minced garlic and diced onion, sauté until fragrant.",
            "Add ground turkey and cook until no longer pink, breaking it up as it cooks.",
            "Season with Italian herbs, salt, and pepper.",
            "Add chopped zucchini and broccoli, cook for 5-7 minutes until vegetables are tender-crisp.",
            "Stir in cooked quinoa and low-sodium soy sauce.",
            "Cook for another 2 minutes to combine flavors.",
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
            { name: "Cottage cheese", amount: "1/2", measurement: "cup" },
            { name: "Casein protein", amount: "1/2", measurement: "scoop" },
            { name: "Cinnamon", amount: "1/8", measurement: "tsp" },
            { name: "Stevia", amount: "1/2", measurement: "packet" },
          ],
          prepTime: "2 minutes",
          cookTime: "0 minutes",
          instructions: [
            "Mix cottage cheese and casein protein powder in a bowl.",
            "Add stevia for sweetness if desired.",
            "Sprinkle with cinnamon.",
            "Consume 30-60 minutes before bedtime to support overnight recovery.",
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
                            <div className="space-y-4">
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
                                      {typeof ingredient === "string" ? (
                                        ingredient
                                      ) : (
                                        <span>
                                          {ingredient.name}{" "}
                                          <span className="text-muted-foreground">
                                            ({ingredient.amount}{" "}
                                            {ingredient.measurement})
                                          </span>
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {meal.prepTime && meal.cookTime && (
                                <div className="flex gap-4 text-sm">
                                  <div>
                                    <span className="font-medium">Prep:</span>{" "}
                                    <span className="text-muted-foreground">
                                      {meal.prepTime}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-medium">Cook:</span>{" "}
                                    <span className="text-muted-foreground">
                                      {meal.cookTime}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {meal.instructions &&
                                meal.instructions.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-medium mb-1">
                                      Instructions:
                                    </h4>
                                    <ol className="text-sm space-y-1 list-decimal list-inside">
                                      {meal.instructions.map(
                                        (instruction, idx) => (
                                          <li
                                            key={idx}
                                            className="text-muted-foreground"
                                          >
                                            {instruction}
                                          </li>
                                        ),
                                      )}
                                    </ol>
                                  </div>
                                )}
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
