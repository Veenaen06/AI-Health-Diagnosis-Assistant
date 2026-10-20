export interface PossibleCondition {
  condition: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface Diagnosis {
  possibleConditions: PossibleCondition[];
  recommendations: string[];
  whenToSeeDoctor: string;
}
