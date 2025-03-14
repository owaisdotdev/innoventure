export declare class BusinessPlanDto {
    description: string;
    industry: string;
}
export declare class InvestorPreferencesDto {
    sectors: string[];
    regions: string[];
    riskTolerance: string;
}
export declare class InvestorCriteriaDto {
    minInvestment: number;
    maxInvestment: number;
    investmentHorizon: string;
}
export declare class CreateInvestorDto {
    name: string;
    email: string;
    password: string;
    businessPlan: BusinessPlanDto;
    profileStatus: string;
    preferences: InvestorPreferencesDto;
    criteria: InvestorCriteriaDto;
}
