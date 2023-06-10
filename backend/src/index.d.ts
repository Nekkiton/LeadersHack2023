declare namespace Gb {
  export type Constraint = IsAgeBetweenConstraint | IsIncludedInConstraint;
  export type IsAgeBetweenConstraint = {
    operation: 'isAgeBetween';
    values: [number, number];
  };

  export type IsIncludedInConstraint = {
    operation: 'isIncludedIn';
    values: string[];
  };

  export type ModerationValidate = {
    constraint: Constraint;
    rejectionReason: string;
  };

  export type AutoScore = {
    constraint: Constraint;
    score: number;
  };
}
