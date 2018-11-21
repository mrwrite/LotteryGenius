import { MegaWinners } from '../models/megawinners';

export class MegaWinnerViewModel {
    id: number;
    ball1: string;
    ball2: string;
    ball3: string;
    ball4: string;
    ball5: string;
    megaball: string;
    megaplier: string;
    draw_date: Date;
    jackpot: string;
    picks: Array<MegaWinners>;
}