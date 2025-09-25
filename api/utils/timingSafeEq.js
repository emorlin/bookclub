import crypto from "node:crypto";

/**
 * Säker jämförelse av två strängar, skyddar mot timing-attacker.
 */
const timingSafeEq = (a, b) => {
    try {
        const A = Buffer.from(String(a) ?? "");
        const B = Buffer.from(String(b) ?? "");
        if (A.length !== B.length) return false;
        return crypto.timingSafeEqual(A, B);
    } catch {
        return false;
    }
};

export default timingSafeEq;
