import { Driver } from "./Driver";  
import { Motorcycle } from "./Motorcycle";  

export interface Shift {
  id: number;           
  driver: Driver;      
  motorcycle: Motorcycle; 
  start_time: Date;      
  end_time: Date | null; 
  status: "active" | "completed"; 
  created_at: Date;      
}