interface GenshinAward {
	name: string;
	amount: number;
}

export interface GenshinCode {
	id: string;
	code: string;
	expire_date: string;
	awards: GenshinAward[];
	image: string;
}
