export class CreateProposalDto {
  startupId: string;
  investorId: string; // Added by controller
  startupName: string;
  industry: string;
  investmentAmount: number;
  equityOffer: number;
  deliverables: string;
  milestones: string;
  sentBy?: string;
  startupEmail?: string;
  fundingRequired?: string;
  pitchDeck?: string;
  description?: string;
}
