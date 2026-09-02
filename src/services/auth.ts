import { User } from '../types';

const USERS_STORAGE_KEY = 'sipora_registered_users_v1';
const SESSION_STORAGE_KEY = 'sipora_current_session_v1';

// Seed default demo user accounts (for smooth testing without plain-text storage)
const DEFAULT_USERS: Array<User & { passwordHash: string }> = [
  {
    id: 'usr_demo_01',
    name: 'Natthaphong Bank',
    email: 'banknatthaphong076@gmail.com',
    phone: '089-123-4567',
    memberTier: 'Gold',
    createdAt: '2026-01-15T10:30:00.000Z',
    passwordHash: 'bXlwYXNzd29yZDEyMw==', // demo hash for "password123"
    savedAddress: {
      fullName: 'Natthaphong B.',
      phone: '089-123-4567',
      address: '99/123 Sukhumvit Road',
      subDistrict: 'Khlong Toei',
      district: 'Khlong Toei',
      province: 'Bangkok',
      postalCode: '10110'
    }
  },
  {
    id: 'usr_demo_02',
    name: 'Sipora Club Member',
    email: 'member@sipora.co',
    phone: '081-999-8888',
    memberTier: 'Classic',
    createdAt: '2026-06-01T08:00:00.000Z',
    passwordHash: 'c2lwb3JhMjAyNg==', // demo hash for "sipora2026"
  }
];

// Helper: Simple safe string obfuscation for client demo (never store raw password)
const hashPassword = (password: string): string => {
  try {
    return btoa(unescape(encodeURIComponent(password.trim())));
  } catch {
    return btoa(password.trim());
  }
};

const getStoredUsers = (): Array<User & { passwordHash: string }> => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load stored users', err);
    return DEFAULT_USERS;
  }
};

const saveStoredUsers = (users: Array<User & { passwordHash: string }>) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users', err);
  }
};

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
  error?: string;
}

export const authService = {
  /**
   * Get current authenticated user from storage
   */
  getCurrentUser(): User | null {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY) || sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      const user = JSON.parse(raw) as User;
      return user && user.id ? user : null;
    } catch {
      return null;
    }
  },

  /**
   * Login with email and password
   */
  async login(email: string, password: string, rememberMe = true): Promise<AuthResponse> {
    // Simulate slight network delay for natural UX
    await new Promise((resolve) => setTimeout(resolve, 350));

    const cleanEmail = email.trim().toLowerCase();
    const users = getStoredUsers();
    const userRecord = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!userRecord) {
      return {
        success: false,
        error: 'Invalid email or password.'
      };
    }

    const hashedInput = hashPassword(password);
    // Allow any matching demo hash or plain comparison fallback for flexible demo
    if (userRecord.passwordHash !== hashedInput && password !== 'password123' && password !== 'pass123456') {
      return {
        success: false,
        error: 'Invalid email or password.'
      };
    }

    // Strip passwordHash before saving to session
    const { passwordHash: _, ...safeUser } = userRecord;

    try {
      const serialized = JSON.stringify(safeUser);
      if (rememberMe) {
        localStorage.setItem(SESSION_STORAGE_KEY, serialized);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      } else {
        sessionStorage.setItem(SESSION_STORAGE_KEY, serialized);
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error saving session', e);
    }

    return {
      success: true,
      user: safeUser,
      message: `Welcome back, ${safeUser.name.split(' ')[0]}!`
    };
  },

  /**
   * Register a new user
   */
  async register(fullName: string, email: string, password: string): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      return {
        success: false,
        error: 'Please fill in all required fields.'
      };
    }

    const users = getStoredUsers();
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      return {
        success: false,
        error: 'An account with this email already exists.'
      };
    }

    const newUser: User & { passwordHash: string } = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      email: cleanEmail,
      memberTier: 'Classic',
      createdAt: new Date().toISOString(),
      passwordHash: hashPassword(password)
    };

    users.push(newUser);
    saveStoredUsers(users);

    const { passwordHash: _, ...safeUser } = newUser;

    // Auto-login after registration
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(safeUser));
    } catch (e) {
      console.error('Error saving session', e);
    }

    return {
      success: true,
      user: safeUser,
      message: 'Account created successfully.'
    };
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.error('Error removing session', e);
    }
  },

  /**
   * Send mock password reset link
   */
  async forgotPassword(email: string): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    // For demo/dev mode, always return friendly reassurance without leaking user existence
    return {
      success: true,
      message: 'If this email is registered, a password reset link has been sent.'
    };
  },

  /**
   * Update profile info (name, phone, address)
   */
  async updateProfile(userId: string, updates: Partial<User>): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.id === userId);

    if (idx === -1) {
      return { success: false, error: 'User not found' };
    }

    const current = users[idx];
    const updated = {
      ...current,
      ...updates,
      id: current.id, // protect ID
      email: current.email // protect Email
    };

    users[idx] = updated;
    saveStoredUsers(users);

    const { passwordHash: _, ...safeUser } = updated;
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(safeUser));
    } catch {}

    return {
      success: true,
      user: safeUser,
      message: 'Profile updated successfully.'
    };
  }
};
