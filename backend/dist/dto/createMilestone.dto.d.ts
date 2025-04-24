import { Types } from 'mongoose';
export declare class CreateMilestoneDto {
    startupId: string | Types.ObjectId;
    title: string;
    description: string;
    dueDate: Date;
    amountToBeReleased: number;
    status: string;
    associatedSmartContractId?: string;
    proposalId: string;
}
