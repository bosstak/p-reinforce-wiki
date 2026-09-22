export interface CalculatedLossResult {
    lossAmount: number; // Float형
    message: string;
    errorCode: string;
    isLossCalculated: boolean;
}