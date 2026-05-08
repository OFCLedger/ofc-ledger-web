// ============================================================
// SHARED SCORING LOGIC — ported from OFC-Scorekeeper
// Source: supabase/functions/_shared/scoring.ts
// ============================================================

export interface Card {
    rank: string;
    suit: string;
    val: number;
}

export interface RowAnalysis {
    name: string;
    rankValue: number;
    royalties: number;
    cards: string[];
    pts: number;
}

export interface HandAnalysis {
    isFoul: boolean;
    foulReason: string | null;
    royalties: number;
    multiplier: number;
    bonusMessage: string | null;
    hasSpade2: boolean;
    fantasyQualifies: boolean;
    shootingTheMoon: boolean;
    details: {
        top: RowAnalysis;
        mid: RowAnalysis;
        bot: RowAnalysis;
    };
}

const RANKS_STR = "23456789TJQKA";

const SUIT_MAP: Record<string, string> = {
    's': 's', '\u2660': 's',
    'h': 'h', '\u2665': 'h',
    'd': 'd', '\u2666': 'd',
    'c': 'c', '\u2663': 'c'
};

export const parseCard = (cardStr: string): Card | null => {
    if (!cardStr || cardStr === "?" || cardStr === "JOKER" || cardStr.includes("JOKER")) return null;
    let clean = cardStr.trim();
    if (clean.length < 2) return null;
    let rankPart = "";
    let suitChar = "";
    if (clean.length > 2 && clean.endsWith('J') && SUIT_MAP[clean[clean.length - 2].toLowerCase()]) {
        suitChar = clean[clean.length - 2].toLowerCase();
        rankPart = clean.slice(0, -2).toUpperCase();
    } else {
        suitChar = clean.slice(-1).toLowerCase();
        rankPart = clean.slice(0, -1).toUpperCase();
        if (rankPart.length > 1 && rankPart.endsWith('J') && rankPart !== "JJ") {
            rankPart = rankPart.slice(0, -1);
        } else if (rankPart === "JJ") {
            rankPart = "J";
        }
    }
    const standardizedSuit = SUIT_MAP[suitChar];
    if (!standardizedSuit) return null;
    const rankIdx = RANKS_STR.indexOf(rankPart);
    if (rankIdx === -1) return null;
    return { rank: rankPart, suit: standardizedSuit, val: rankIdx + 2 };
};

export const parseRow = (row: string[]): Card[] => {
    return row.map(parseCard).filter((c): c is Card => c !== null);
};

export const calculateBonus = (allCardsRaw: string[], rulesEnabled: boolean) => {
    if (!rulesEnabled) {
        const parsedForCheck = allCardsRaw.map(parseCard);
        const naturalForCheck = parsedForCheck.filter((c, i) => {
            if (!c) return false;
            const r = allCardsRaw[i].trim();
            return !(r === "JOKER" || (r.length > 1 && r.endsWith('J') && r !== "JJ" && r !== "J"));
        });
        const has2sOnly = naturalForCheck.some(c => c!.rank === '2' && c!.suit === 's');
        return { mult: 1, label: null, hasSpade2: has2sOnly };
    }
    const parsedCards = allCardsRaw.map(parseCard);
    const naturalCards = parsedCards.filter((card, index) => {
        if (!card) return false;
        const raw = allCardsRaw[index].trim();
        const isLiteralJoker = raw === "JOKER";
        const isDefinedJoker = (raw.length > 1 && raw.endsWith('J') && raw !== "JJ" && raw !== "J");
        if (isLiteralJoker || isDefinedJoker) return false;
        return true;
    });
    const has2s = naturalCards.some(c => c!.rank === '2' && c!.suit === 's');
    const has3s = naturalCards.some(c => c!.rank === '3' && c!.suit === 's');
    const has4s = naturalCards.some(c => c!.rank === '4' && c!.suit === 's');
    if (!has2s) return { mult: 1, label: null, hasSpade2: false };
    if (has3s && has4s) return { mult: 8, label: "\u26602/3/4 (x8)", hasSpade2: true };
    if (has3s) return { mult: 4, label: "\u26602/3 (x4)", hasSpade2: true };
    return { mult: 2, label: "\u26602 (x2)", hasSpade2: true };
};

const BASE = 20;

const getScore = (categoryTier: number, ranks: number[]) => {
    let score = categoryTier * 100000000;
    for (let i = 0; i < ranks.length; i++) {
        score += ranks[i] * Math.pow(BASE, 5 - i);
    }
    return score;
};

export const evaluate5CardHand = (cards: Card[]): { name: string, rankValue: number, royalties: number } => {
    if (cards.length === 0) return { name: "-", rankValue: 0, royalties: 0 };
    const sorted = [...cards].sort((a, b) => b.val - a.val);
    const vals = sorted.map(c => c.val);
    const suits = sorted.map(c => c.suit);
    const isFull = cards.length === 5;
    const isFlush = isFull && suits.every(s => s === suits[0]);
    let isStraight = false;
    let isWheel = false;
    if (isFull) {
        isStraight = true;
        for (let i = 0; i < 4; i++) { if (vals[i] - vals[i + 1] !== 1) isStraight = false; }
        if (!isStraight && vals[0] === 14 && vals[1] === 5 && vals[2] === 4 && vals[3] === 3 && vals[4] === 2) {
            isStraight = true;
            isWheel = true;
        }
    }
    const counts: Record<number, number> = {};
    vals.forEach(v => counts[v] = (counts[v] || 0) + 1);
    const uniqueVals = Object.keys(counts).map(Number).sort((a, b) => {
        const countDiff = counts[b] - counts[a];
        if (countDiff !== 0) return countDiff;
        return b - a;
    });
    const p1 = uniqueVals[0];
    const p2 = uniqueVals[1];
    const getKickers = (exclude: number[]) => vals.filter(v => !exclude.includes(v));
    const isRoyal = isFlush && isStraight && !isWheel && vals[0] === 14;
    if (isRoyal) return { name: "Royal Flush", rankValue: getScore(11, [14]), royalties: 25 };
    if (counts[p1] === 5) return { name: `5 of a Kind (${RANKS_STR[p1 - 2]}s)`, rankValue: getScore(10, [p1]), royalties: 25 };
    if (isFlush && isStraight) {
        const high = isWheel ? 5 : vals[0];
        return { name: "Straight Flush", rankValue: getScore(9, [high]), royalties: 15 };
    }
    if (counts[p1] === 4) {
        const kickers = getKickers([p1]);
        return { name: `Quads ${RANKS_STR[p1 - 2]}s`, rankValue: getScore(8, [p1, ...kickers]), royalties: 10 };
    }
    if (counts[p1] === 3 && counts[p2] === 2) {
        return { name: `Full House`, rankValue: getScore(7, [p1, p2]), royalties: 6 };
    }
    if (isFlush) return { name: `Flush`, rankValue: getScore(6, vals), royalties: 4 };
    if (isStraight) {
        const high = isWheel ? 5 : vals[0];
        return { name: `Straight`, rankValue: getScore(5, [high]), royalties: 2 };
    }
    if (counts[p1] === 3) {
        const kickers = getKickers([p1]);
        return { name: `Trips ${RANKS_STR[p1 - 2]}s`, rankValue: getScore(4, [p1, ...kickers]), royalties: 0 };
    }
    if (counts[p1] === 2 && counts[p2] === 2) {
        const kickers = getKickers([p1, p2]);
        return { name: `Two Pair`, rankValue: getScore(3, [p1, p2, ...kickers]), royalties: 0 };
    }
    if (counts[p1] === 2) {
        const kickers = getKickers([p1]);
        return { name: `Pair ${RANKS_STR[p1 - 2]}s`, rankValue: getScore(2, [p1, ...kickers]), royalties: 0 };
    }
    return { name: `High Card`, rankValue: getScore(1, vals), royalties: 0 };
};

export const evaluate3CardHand = (cards: Card[]): { name: string, rankValue: number, royalties: number } => {
    if (cards.length === 0) return { name: "-", rankValue: 0, royalties: 0 };
    const sorted = [...cards].sort((a, b) => b.val - a.val);
    const vals = sorted.map(c => c.val);
    if (vals.length === 3 && vals[0] === vals[1] && vals[1] === vals[2]) {
        const pts = 10 + (vals[0] - 2);
        return { name: `Trips ${sorted[0].rank}s`, rankValue: getScore(4, [vals[0]]), royalties: pts };
    }
    if (vals.length >= 2 && (vals[0] === vals[1] || (vals.length === 3 && vals[1] === vals[2]))) {
        const pairVal = vals[0] === vals[1] ? vals[0] : vals[1];
        const kicker = vals.length === 3 && vals[0] === vals[1] ? vals[2] : vals[0];
        let pts = 0;
        if (pairVal >= 6) pts = pairVal - 5;
        return { name: `Pair ${pairVal > 9 ? RANKS_STR[pairVal - 2] : pairVal}s`, rankValue: getScore(2, [pairVal, kicker]), royalties: pts };
    }
    return { name: "High Card", rankValue: getScore(1, vals), royalties: 0 };
};

export const analyzeHand = (
    handData: { top: string[], middle: string[], bottom: string[] },
    spadesBonusActive: boolean = false
): HandAnalysis => {
    const allRaw = [...handData.top, ...handData.middle, ...handData.bottom];
    const topCards = parseRow(handData.top);
    const midCards = parseRow(handData.middle);
    const botCards = parseRow(handData.bottom);
    const { mult, label, hasSpade2 } = calculateBonus(allRaw, spadesBonusActive);
    const result: HandAnalysis = {
        isFoul: false, foulReason: null, royalties: 0,
        multiplier: mult, bonusMessage: label, hasSpade2,
        fantasyQualifies: false,
        shootingTheMoon: false,
        details: {
            top: { name: "", rankValue: 0, royalties: 0, cards: handData.top, pts: 0 },
            mid: { name: "", rankValue: 0, royalties: 0, cards: handData.middle, pts: 0 },
            bot: { name: "", rankValue: 0, royalties: 0, cards: handData.bottom, pts: 0 }
        }
    };
    if (allRaw.some(c => c === "JOKER")) {
        result.isFoul = true;
        result.foulReason = "Define Joker!";
        return result;
    }
    const topEval = evaluate3CardHand(topCards);
    const midEval = evaluate5CardHand(midCards);
    const botEval = evaluate5CardHand(botCards);
    let midRoyalties = 0;
    if (midEval.name === "Royal Flush") midRoyalties = 50;
    else if (midEval.name.startsWith("5 of a Kind")) midRoyalties = 50;
    else if (midEval.name.startsWith("Straight Flush")) midRoyalties = 30;
    else if (midEval.name.startsWith("Quads")) midRoyalties = 20;
    else if (midEval.name.startsWith("Full House")) midRoyalties = 12;
    else if (midEval.name.startsWith("Flush")) midRoyalties = 8;
    else if (midEval.name.startsWith("Straight")) midRoyalties = 4;
    else if (midEval.name.startsWith("Trips")) midRoyalties = 2;
    const botRoyalties = botEval.royalties;
    if (midEval.rankValue < topEval.rankValue) { result.isFoul = true; result.foulReason = "TOP > MID"; }
    if (botEval.rankValue < midEval.rankValue) { result.isFoul = true; result.foulReason = "MID > BOT"; }
    if (!result.isFoul) {
        result.royalties = topEval.royalties + midRoyalties + botRoyalties;
        const sortedTop = [...topCards].sort((a, b) => b.val - a.val);
        if (sortedTop.length === 3) {
            const v0 = sortedTop[0].val;
            const v1 = sortedTop[1].val;
            const v2 = sortedTop[2].val;
            if (v0 === v1 && v1 === v2) { result.fantasyQualifies = true; }
            else {
                if (v0 === v1 && v0 >= 12) result.fantasyQualifies = true;
                else if (v1 === v2 && v1 >= 12) result.fantasyQualifies = true;
            }
        }
    }
    // STM detection
    if (!result.isFoul) {
        const flushStraightNames = ['Flush', 'Straight', 'Straight Flush', 'Royal Flush'];
        if (botEval.name === 'High Card' && !flushStraightNames.includes(midEval.name)) {
            const botVals = parseRow(handData.bottom).map(c => c.val);
            if (botVals.length === 5 && Math.max(...botVals) <= 11) {
                result.shootingTheMoon = true;
            }
        }
    }
    result.details.top = { ...topEval, cards: handData.top, pts: topEval.royalties };
    result.details.mid = { ...midEval, cards: handData.middle, royalties: midRoyalties, pts: midRoyalties };
    result.details.bot = { ...botEval, cards: handData.bottom, pts: botRoyalties };
    return result;
};
