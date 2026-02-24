import type { Metadata } from "next";
import RulesNav from "@/components/RulesNav";

export const metadata: Metadata = {
  title: "Rules — OFC Ledger",
  description: "Learn how to play Open-Face Chinese Poker (OFC).",
};

export default function RulesPage() {
  return (
    <>
      {/* Mobile: sticky horizontal nav at page top level */}
      <RulesNav variant="mobile" />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-16 lg:flex lg:gap-10">
        {/* Desktop: sticky sidebar */}
        <aside className="hidden shrink-0 lg:block lg:w-48">
          <RulesNav variant="desktop" />
        </aside>

        <main className="min-w-0 flex-1 prose-ofc">
          <h1>Open-Face Chinese Poker Rules</h1>

          {/* ───── What is OFC? ───── */}
          <section id="what-is-ofc">
            <h2>What is OFC?</h2>
            <p>
              Open-Face Chinese Poker (OFC) is a turn-based poker variant where players set 13 cards
              across three hands — <strong>Top</strong> (3 cards), <strong>Middle</strong> (5 cards),
              and <strong>Bottom</strong> (5 cards) — aiming to beat their opponents row by row.
            </p>
            <p>
              OFC is played with a standard 52-card deck, typically between 2–3 players.
              Unlike traditional poker, there is no betting — scoring is based on points.
              Each point has an agreed-upon monetary value.
            </p>

            <h3>Dealing</h3>
            <ul>
              <li>Each player receives <strong>5 cards face-up</strong> to start and must place them on their board.</li>
              <li>After the initial placement, players draw <strong>1 card at a time</strong> and place it on any open row.</li>
              <li>This continues until all 13 slots are filled.</li>
              <li>Cards cannot be moved once placed.</li>
            </ul>

            <h3>Setting Your Hands</h3>
            <p>
              Hands must be ranked in ascending order from top to bottom:
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
          </section>

          {/* ───── Game Variants ───── */}
          <section id="game-variants">
            <h2>Game Variants</h2>

            <h3>Regular OFC</h3>
            <p>
              The standard game described above. Players receive 5 cards initially, then draw one at a time.
              Standard scoring with royalties and Fantasy Land.
            </p>

            <h3>Pineapple OFC</h3>
            <p>
              The most popular variant. After the initial 5-card placement, players draw <strong>3 cards</strong> at
              a time, place 2, and discard 1. This creates more action and bigger hands.
            </p>
            <ul>
              <li>Fantasy Land in Pineapple: you receive <strong>14 cards</strong> (place 13, discard 1).</li>
              <li>Entry requirement is the same: pair of Queens or better on top.</li>
            </ul>

            <h3>Progressive Pineapple</h3>
            <p>
              A variant where the first draw after the initial 5 cards is 2 cards (place 1, discard 1),
              followed by 3-card draws (place 2, discard 1) for the remaining rounds.
            </p>
          </section>

          {/* ───── Scoring ───── */}
          <section id="scoring">
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
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Hand</th><th>Points</th></tr>
                </thead>
                <tbody>
                  <tr><td>Straight</td><td>+2</td></tr>
                  <tr><td>Flush</td><td>+4</td></tr>
                  <tr><td>Full House</td><td>+6</td></tr>
                  <tr><td>Four of a Kind</td><td>+10</td></tr>
                  <tr><td>Straight Flush</td><td>+15</td></tr>
                  <tr><td>Five of a Kind</td><td>+25</td></tr>
                  <tr><td>Royal Flush</td><td>+25</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Middle Royalties</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Hand</th><th>Points</th></tr>
                </thead>
                <tbody>
                  <tr><td>Three of a Kind</td><td>+2</td></tr>
                  <tr><td>Straight</td><td>+4</td></tr>
                  <tr><td>Flush</td><td>+8</td></tr>
                  <tr><td>Full House</td><td>+12</td></tr>
                  <tr><td>Four of a Kind</td><td>+20</td></tr>
                  <tr><td>Straight Flush</td><td>+30</td></tr>
                  <tr><td>Five of a Kind</td><td>+50</td></tr>
                  <tr><td>Royal Flush</td><td>+50</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Top Royalties — Pairs</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Hand</th><th>Points</th></tr>
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
                </tbody>
              </table>
            </div>

            <h3>Top Royalties — Trips</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Hand</th><th>Points</th></tr>
                </thead>
                <tbody>
                  <tr><td>Trips 2s</td><td>+10</td></tr>
                  <tr><td>Trips 3s</td><td>+11</td></tr>
                  <tr><td>Trips 4s</td><td>+12</td></tr>
                  <tr><td>Trips 5s</td><td>+13</td></tr>
                  <tr><td>Trips 6s</td><td>+14</td></tr>
                  <tr><td>Trips 7s</td><td>+15</td></tr>
                  <tr><td>Trips 8s</td><td>+16</td></tr>
                  <tr><td>Trips 9s</td><td>+17</td></tr>
                  <tr><td>Trips 10s</td><td>+18</td></tr>
                  <tr><td>Trips Jacks</td><td>+19</td></tr>
                  <tr><td>Trips Queens</td><td>+20</td></tr>
                  <tr><td>Trips Kings</td><td>+21</td></tr>
                  <tr><td>Trips Aces</td><td>+22</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ───── Fantasy Land ───── */}
          <section id="fantasy-land">
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
                Full House or better on Middle, or Quads or better on Bottom.
              </li>
            </ul>

            <h3>Pineapple Fantasy Land</h3>
            <p>
              In Pineapple OFC, Fantasy Land gives you <strong>14 cards</strong> — set 13 and
              discard 1. The stay requirements are the same as regular OFC.
            </p>
          </section>

          {/* ───── Optional Rules ───── */}
          <section id="optional-rules">
            <h2>Optional Rules</h2>

            <h3>Progressive Fantasy Land</h3>
            <p>
              Some games award <strong>15 cards</strong> in Fantasy Land for stronger qualifying
              hands (e.g., KK+ on top), and <strong>16 cards</strong> for AA+ on top. Players
              discard extra cards down to 13.
            </p>

            <h3>Joker Variant</h3>
            <p>
              A Joker is added to the deck and acts as a wild card. The Joker can complete
              any hand but scores as an Ace-high for non-made hands.
            </p>

            <h3>2–3 Player Adjustments</h3>
            <ul>
              <li><strong>2 players:</strong> Standard rules, each player uses 13 of 52 cards.</li>
              <li><strong>3 players:</strong> Standard rules, but card counting becomes more important as 39 of 52 cards are in play.</li>
            </ul>
          </section>

          {/* ───── Glossary ───── */}
          <section id="glossary">
            <h2>Glossary</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Term</th><th>Definition</th></tr>
                </thead>
                <tbody>
                  <tr><td><strong>Foul / Mis-set</strong></td><td>When your hands are not in valid ascending order. Costs 6 points per opponent.</td></tr>
                  <tr><td><strong>Royalty</strong></td><td>Bonus points for premium hands placed in a specific row.</td></tr>
                  <tr><td><strong>Scoop</strong></td><td>Winning all three rows against an opponent (+3 bonus).</td></tr>
                  <tr><td><strong>Fantasy Land</strong></td><td>Receiving all 13 (or 14) cards at once after qualifying with QQ+ on top.</td></tr>
                  <tr><td><strong>Pineapple</strong></td><td>Variant where you draw 3, place 2, discard 1 after the initial deal.</td></tr>
                  <tr><td><strong>Stay / Re-Fantasy</strong></td><td>Remaining in Fantasy Land by meeting the stay requirements.</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
