import { StartupService } from './startup.service';
import { CreateStartupDto } from '../dto/createStartup.dto';
import { UpdateStartupDto } from '../dto/updateStartup.dto';
import { Startup } from '../schemas/startup.schema';
export declare class StartupController {
    private readonly startupService;
    constructor(startupService: StartupService);
    createStartup(createStartupDto: CreateStartupDto): Promise<Startup>;
    getAllStartups(): Promise<Startup[]>;
    getStartupByEmail(email: string): Promise<Startup>;
    getByIndustry(industry: string): Promise<Startup[]>;
    getStartupById(id: string): Promise<Startup>;
    updateStartup(id: string, updateStartupDto: UpdateStartupDto): Promise<Startup>;
    deleteStartup(id: string): Promise<boolean>;
}
