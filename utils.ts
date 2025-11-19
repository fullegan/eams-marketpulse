
export interface QuarterInfo {
    currentQuarter: number;
    nextQuarter: number;
    currentYear: number;
    nextQuarterYear: number;
}

/**
 * Calculates the current quarter, next quarter, and their respective years.
 * Quarters are based on 13-week blocks.
 * Q1: weeks 1-13, Q2: 14-26, Q3: 27-39, Q4: 40-52
 */
export const getCurrentQuarterInfo = (): QuarterInfo => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekOfYear = Math.ceil((dayOfYear + startOfYear.getDay() + 1) / 7);

    const currentQuarter = Math.min(4, Math.ceil(weekOfYear / 13));
    const currentYear = now.getFullYear();

    let nextQuarter;
    let nextQuarterYear = currentYear;

    if (currentQuarter === 4) {
        nextQuarter = 1;
        nextQuarterYear = currentYear + 1;
    } else {
        nextQuarter = currentQuarter + 1;
    }

    return {
        currentQuarter,
        nextQuarter,
        currentYear,
        nextQuarterYear,
    };
};
