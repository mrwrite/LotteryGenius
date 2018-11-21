import { PowerWinners } from '../models/powerwinners';

export class PowerWinnerViewModel {
    id: number;
    ball1: string;
    ball2: string;
    ball3: string;
    ball4: string;
    ball5: string;
    powerball: string;
    powerplay: string;
    draw_date: Date;
    jackpot: string;
    picks: Array<PowerWinners>;
}