export class CreateProposalDto {
  startupId: string;
  investorId: string; // Added by controller
  startupName: string;
  industry: string;
  investmentAmount: number;
  equityOffer: number;
  deliverables: string;
  milestones: string;
}