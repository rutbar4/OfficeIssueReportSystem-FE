import { Employee } from './EmployeeModel';

export interface Comment {
  id: string;
  text: string;
  parentId: string | null;
  votes: number;
  time: Date;
  isUpVoted: boolean;
  employee: Employee;
  issueId: string;
};


export interface AddComment {
  text: string;
  time: Date;
  votes: number;
  parentId: string | null;
  issueId: string;
  employeeId: string;
};

