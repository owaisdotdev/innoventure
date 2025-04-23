export class CreateProposalDto {
  startupId: string;
  investorId: string; // Added by controller
  sentBy: 'startup' | 'investor';

  title: string;
  message: string;

  // Shared or role-specific
  investmentAmount?: number; // Investor sends this
  equityOffer?: number;       // Startup sends this
  equityInterest?: number;    // Investor sends this
  fundingRequired?: number;   // Startup sends this

  useOfFunds?: string;        // Startup
  milestones?: string;        // Both can send
  deliverables?: string;      // Optional

  valueAddition?: string;     // Investor
  relevantExperience?: string; // Investor

  attachment?: string;        // Both — pitch deck or portfolio URL

  startupName?: string;
  industry?: string;
  startupEmail?: string;
  pitchDeck?: string;
  description?: string;
}
