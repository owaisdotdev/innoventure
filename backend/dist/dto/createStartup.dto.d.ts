export declare class BusinessPlanDto {
    description: string;
    industry: string;
}
export declare class FydpDetailsDto {
    university: string;
    year: number;
    supervisorName: string;
    githubRepoUrl?: string;
    tags?: string[];
    remarks?: string;
}
export declare class CreateStartupDto {
    name: string;
    email: string;
    password: string;
    businessPlan: BusinessPlanDto;
    isFydp?: boolean;
    fydpDetails?: FydpDetailsDto;
}
