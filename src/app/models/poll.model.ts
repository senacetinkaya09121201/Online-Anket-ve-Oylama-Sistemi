export interface Poll {
  id?: string;
  question: string;
  options: string[];
  votes: number[];
  creatorId: string;
  createdAt: any;
}
