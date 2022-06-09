interface GenshinAward {
    name: string;
    amount: number;
}

export interface GenshinCode {
    code: string;
    expire_date: string;
    awards: GenshinAward[];
}
