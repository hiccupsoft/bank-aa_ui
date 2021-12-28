export const useConvertNumberToString = (n?: number) => {
    if (!n) return "";
    if (Math.abs(n) < 1) return n;
    return String(n).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};