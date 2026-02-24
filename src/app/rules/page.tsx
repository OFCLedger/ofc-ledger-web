import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules — OFC Ledger",
  description: "Learn how to play Open-Face Chinese Poker (OFC).",
};

export default function RulesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 prose-ofc">
      <h1>Open-Face Chinese Poker Rules</h1>
      <p>
        Open-Face Chinese Poker (OFC) is a turn-based poker variant where players set 13 cards
        across three hands — <strong>Top</strong> (3 cards), <strong>Middle</strong> (5 cards),
        and <strong>Bottom</strong> (5 cards) — aiming to beat their opponents row by row.
      </p>

      <h2>Game Overview</h2>
      <p>
        OFC is played with a standard 52-card deck, typically between 2–3 players.
        Unlike traditional poker, there is no betting — scoring is based on points.
        Each point has an agreed-upon monetary value.
      </p>

      <h2>Dealing</h2>
      <ul>
        <li>Each player receives <strong>5 cards face-up</strong> to start and must place them on their board.</li>
        <li>After the initial placement, players draw <strong>1 card at a time</strong> and place it on any open row.</li>
        <li>This continues until all 13 slots are filled.</li>
        <li>Cards cannot be moved once placed.</li>
      </ul>

      <h2>Setting Your Hands</h2>
      <p>
        The key rule: hands must be ranked in ascending order from top to bottom.
      </p>
      <ul>
        <li><strong>Bottom</strong> must be the strongest hand (or equal to Middle).</li>
        <li><strong>Middle</strong> must be stronger than (or equal to) Top.</li>
        <li><strong>Top</strong> is the weakest hand (only 3 cards — pairs and high cards matter most).</li>
      </ul>
      <p>
        If your hands are not in valid order, you <strong>foul</strong> (also called &quot;mis-set&quot;)
        and lose 6 points to each opponent.
      </p>

      <h2>Scoring</h2>
      <p>
        Players compare each row head-to-head. For each row you win, you earn <strong>+1 point</strong>;
        for each loss, <strong>−1 point</strong>.
      </p>
      <p>
        <strong>Scoop bonus:</strong> If you win all three rows against an opponent, you earn a
        <strong> +3 bonus</strong> (6 total instead of 3).
      </p>

      <h3>Royalties</h3>
      <p>
        Bonus points are awarded for premium hands in each row. Royalties are collected
        regardless of whether you win the row.
      </p>

      <h3>Bottom Royalties</h3>
      <table>
        <thead>
          <tr>
            <th>Hand</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Straight</td><td>+2</td></tr>
          <tr><td>Flush</td><td>+4</td></tr>
          <tr><td>Full House</td><td>+6</td></tr>
          <tr><td>Four of a Kind</td><td>+10</td></tr>
          <tr><td>Straight Flush</td><td>+15</td></tr>
          <tr><td>Royal Flush</td><td>+25</td></tr>
        </tbody>
      </table>

      <h3>Middle Royalties</h3>
      <table>
        <thead>
          <tr>
            <th>Hand</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Three of a Kind</td><td>+2</td></tr>
          <tr><td>Straight</td><td>+4</td></tr>
          <tr><td>Flush</td><td>+8</td></tr>
          <tr><td>Full House</td><td>+12</td></tr>
          <tr><td>Four of a Kind</td><td>+20</td></tr>
          <tr><td>Straight Flush</td><td>+30</td></tr>
          <tr><td>Royal Flush</td><td>+50</td></tr>
        </tbody>
      </table>

      <h3>Top Royalties</h3>
      <table>
        <thead>
          <tr>
            <th>Hand</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Pair of 6s</td><td>+1</td></tr>
          <tr><td>Pair of 7s</td><td>+2</td></tr>
          <tr><td>Pair of 8s</td><td>+3</td></tr>
          <tr><td>Pair of 9s</td><td>+4</td></tr>
          <tr><td>Pair of 10s</td><td>+5</td></tr>
          <tr><td>Pair of Jacks</td><td>+6</td></tr>
          <tr><td>Pair of Queens</td><td>+7</td></tr>
          <tr><td>Pair of Kings</td><td>+8</td></tr>
          <tr><td>Pair of Aces</td><td>+9</td></tr>
          <tr><td>Three of a Kind (2s–5s)</td><td>+10</td></tr>
          <tr><td>Three of a Kind (6s–Ks)</td><td>+10–17</td></tr>
          <tr><td>Three of a Kind (Aces)</td><td>+22</td></tr>
        </tbody>
      </table>

      <h2>Fantasy Land</h2>
      <p>
        If you place <strong>a pair of Queens or better</strong> on top (without fouling),
        you enter <strong>Fantasy Land</strong> on the next hand.
      </p>
      <ul>
        <li>In Fantasy Land, you receive all <strong>13 cards at once</strong> and set them face-down.</li>
        <li>Other players continue drawing one card at a time as normal.</li>
        <li>
          You <strong>stay in Fantasy Land</strong> if you make: Three of a Kind on Top,
          Full House+ on Middle, or Quads+ on Bottom.
        </li>
      </ul>

      <h2>Tips for Beginners</h2>
      <ul>
        <li>Avoid fouling at all costs — a foul costs you 6 points per opponent.</li>
        <li>Aim for Fantasy Land by placing strong pairs on top early.</li>
        <li>Pay attention to cards your opponents have placed — card counting matters.</li>
        <li>Balance risk and reward: chasing royalties is great, but not at the expense of fouling.</li>
      </ul>
    </main>
  );
}
