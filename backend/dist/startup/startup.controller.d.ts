import { Startup } from '../schemas/startup.schema';
import { StartupService } from './startup.service';
import { UpdateStartupDto } from '../dto/updateStartup.dto';
export declare class StartupController {
    private readonly startupservice;
    constructor(startupservice: StartupService);
    getAllStartups(): Promise<Startup[]>;
    getStartupByEmail(email: string): Promise<Startup>;
    getByIndustry(industry: string): Promise<Startup[]>;
    getStartupById(id: string): Promise<Startup>;
    updateStartup(id: string, updatestartupDto: UpdateStartupDto): Promise<Startup>;
    deleteStartup(id: string): Promise<boolean>;
}
