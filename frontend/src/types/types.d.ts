export interface Worker {
  id: string
  name: string
  created_at: number
}

export interface Shift {
  id: string
  workerId: string
  start: number
  end: number
  createdAt: number
}

export interface CreateShiftInput {
  workerId: string;
  start: string; // ISO 8601 datetime string
  end: string;   // ISO 8601 datetime string
}

export interface UpdateShiftInput {
  shiftId: string;
  updates: {
    start: number; // epoch timestamp in milliseconds
    end: number;   // epoch timestamp in milliseconds
  };
}
