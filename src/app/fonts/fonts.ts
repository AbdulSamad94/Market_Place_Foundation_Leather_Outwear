import localFont from "next/font/local";
export const integralCF = localFont({
    src: [
        {
            path: "./IntegralCF-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./IntegralCF-Bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-integral-cf",
});