// Authentication service for handling user login, registration, and session management

export interface User {
  id: string;
  email: string;
  name: string;
  weight?: string;
  height?: string;
  goal?: "bulking" | "cutting";
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
}

// Mock user database for demo purposes
const MOCK_USERS: Record<string, User & { password: string }> = {
  user1: {
    id: "user1",
    email: "john@example.com",
    password: "password123",
    name: "John Fitness",
    weight: "185 lbs",
    height: "6'0\"",
    goal: "bulking",
  },
};

// In a real app, these functions would make API calls to a backend server
export const authService = {
  /**
   * Login with email and password
   */
  login: async ({ email, password }: AuthCredentials): Promise<User> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user by email
    const user = Object.values(MOCK_USERS).find((u) => u.email === email);

    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }

    // Store auth token in localStorage
    localStorage.setItem("authToken", `token-${user.id}`);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  /**
   * Register a new user
   */
  register: async ({ email, password, name }: RegisterData): Promise<User> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if email already exists
    if (Object.values(MOCK_USERS).some((u) => u.email === email)) {
      throw new Error("Email already in use");
    }

    // Create new user
    const newUserId = `user${Object.keys(MOCK_USERS).length + 1}`;
    const newUser: User & { password: string } = {
      id: newUserId,
      email,
      password,
      name,
      goal: "bulking", // Default goal
    };

    // Add to mock database
    MOCK_USERS[newUserId] = newUser;

    // Store auth token in localStorage
    localStorage.setItem("authToken", `token-${newUserId}`);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    // Remove auth token from localStorage
    localStorage.removeItem("authToken");
  },

  /**
   * Get the current authenticated user
   */
  getCurrentUser: async (): Promise<User | null> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const authToken = localStorage.getItem("authToken");
    if (!authToken) return null;

    // Extract user ID from token
    const userId = authToken.replace("token-", "");
    const user = MOCK_USERS[userId];

    if (!user) {
      localStorage.removeItem("authToken");
      return null;
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  /**
   * Update user profile
   */
  updateProfile: async (
    userId: string,
    userData: Partial<User>,
  ): Promise<User> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = MOCK_USERS[userId];
    if (!user) {
      throw new Error("User not found");
    }

    // Update user data
    const updatedUser = {
      ...user,
      ...userData,
    };

    MOCK_USERS[userId] = updatedUser;

    // Return user without password
    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },
};
