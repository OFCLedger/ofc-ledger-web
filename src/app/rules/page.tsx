import type { Metadata } from "next";
import RulesNav from "@/components/RulesNav";

export const metadata: Metadata = {
  title: "OFC Rules — Open Face Chinese Poker Guide | OFC Ledger",
  description:
    "Complete rules for Open Face Chinese Poker (OFC) — Pineapple variant, scoring, royalties, Fantasy Land, and the special rules in OFC Ledger including Spades Multiplier and The Choice.",
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
          {/* ───── What is OFC? ───── */}
          <section id="what-is-ofc">
            <h1>Open Face Chinese Poker — Complete Rules Guide</h1>
            <h2>What is Open Face Chinese Poker?</h2>
            <p>
              Open Face Chinese Poker (OFC) is a card game for 2–4 players where each player
              builds three separate poker hands on a board — a <strong>top hand</strong> (3 cards),
              a <strong>middle hand</strong> (5 cards), and a <strong>bottom hand</strong> (5 cards).
            </p>
            <p>
              The core rule: your hands must be set in valid order. Bottom must be stronger than
              middle, and middle must be stronger than top. Break that order and you <strong>foul</strong> —
              your hand scores zero and you lose 6 points to each opponent.
            </p>
            <p>
              OFC Ledger supports two variants: <strong>Pineapple OFC</strong> (recommended)
              and <strong>Classic OFC</strong>.
            </p>
          </section>

          {/* ───── Pineapple OFC ───── */}
          <section id="pineapple-ofc">
            <h2>Pineapple OFC — How the Game Works</h2>
            <p>
              Pineapple is the most popular competitive variant and the one OFC Ledger is built around.
            </p>
            <p>
              <strong>Setup:</strong> Each player receives 5 cards face-up to start and places all 5 on
              their board immediately.
            </p>
            <p>
              <strong>Each subsequent round:</strong> You receive 3 cards, place 2 on your board, and
              discard 1 face-down.
            </p>
            <p>
              This continues until all 13 cards are placed.
            </p>
            <p>
              <strong>Total rounds:</strong> 5 + 2 + 2 + 2 + 2 = 13 cards across five rounds.
            </p>
            <p>
              In Classic OFC each player receives 1 card per turn — Pineapple gives you more cards and
              more decisions per turn, making it faster and more strategic.
            </p>
            <p>
              <strong>Turn order:</strong> Players take turns in order. The player who places last in
              round 1 goes first in round 2, rotating each round.
            </p>
            <p>
              <strong>Fouling:</strong> If your completed board is invalid, you foul. A fouled hand
              loses 6 points to each opponent and earns no royalties.
            </p>
          </section>

          {/* ───── The Board ───── */}
          <section id="the-board">
            <h2>The Board — Three Hands</h2>

            <h3>Bottom Hand (5 cards) — Strongest</h3>
            <p>
              Your strongest hand. Must be equal to or stronger than your middle hand. Standard poker
              rankings apply: high card, pair, two pair, trips, straight, flush, full house, quads,
              straight flush, royal flush.
            </p>

            <h3>Middle Hand (5 cards) — Medium</h3>
            <p>
              Must be stronger than your top hand and equal to or weaker than your bottom hand.
            </p>

            <h3>Top Hand (3 cards) — Weakest</h3>
            <p>
              Three cards only — no straights or flushes count. Valid hands: high card, pair, or three
              of a kind. This is where royalties get most valuable.
            </p>
          </section>

          {/* ───── Scoring & Royalties ───── */}
          <section id="scoring">
            <h2>Scoring &amp; Royalties</h2>
            <p>
              Each hand is scored row by row against every other player at the table. Each row you
              win gives you 1 point — and since OFC is a zero-sum game, every point you win is a
              point your opponent loses. Win 2 of 3 rows and you&apos;re up 1 point net against that
              opponent. Win all 3 rows and you scoop — that&apos;s worth 3 bonus points on top of the
              3 row points, for 6 points total against that player. It&apos;s also possible to tie
              individual rows, for example if both players have the same straight on the bottom.
              Tied rows cancel out and neither player scores that row.
            </p>
            <p>
              Points are then adjusted for royalties.
            </p>

            <h3>Royalty Table — Top Hand</h3>
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
                  <tr><td>Three 2s</td><td>+10</td></tr>
                  <tr><td>Three 3s</td><td>+11</td></tr>
                  <tr><td>Three 4s</td><td>+12</td></tr>
                  <tr><td>Three 5s</td><td>+13</td></tr>
                  <tr><td>Three 6s</td><td>+14</td></tr>
                  <tr><td>Three 7s</td><td>+15</td></tr>
                  <tr><td>Three 8s</td><td>+16</td></tr>
                  <tr><td>Three 9s</td><td>+17</td></tr>
                  <tr><td>Three 10s</td><td>+18</td></tr>
                  <tr><td>Three Jacks</td><td>+19</td></tr>
                  <tr><td>Three Queens</td><td>+20</td></tr>
                  <tr><td>Three Kings</td><td>+21</td></tr>
                  <tr><td>Three Aces</td><td>+22</td></tr>
                </tbody>
              </table>
            </div>

            <h3>Royalty Table — Middle Hand</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Hand</th><th>Points</th></tr>
                </thead>
                <tbody>
                  <tr><td>Three of a kind</td><td>+2</td></tr>
                  <tr><td>Straight</td><td>+4</td></tr>
                  <tr><td>Flush</td><td>+8</td></tr>
                  <tr><td>Full House</td><td>+12</td></tr>
                  <tr><td>Four of a kind</td><td>+20</td></tr>
                  <tr><td>Straight Flush</td><td>+30</td></tr>
                  <tr><td>Five of a kind (requires jokers)</td><td>+50</td></tr>
                  <tr><td>Royal Flush</td><td>+50</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Five of a kind and Royal Flush are both worth 50 points in the middle. Royal Flush
              beats Five of a kind if comparing hand strength, but royalty value is equal.
            </p>

            <h3>Royalty Table — Bottom Hand</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Hand</th><th>Points</th></tr>
                </thead>
                <tbody>
                  <tr><td>Straight</td><td>+2</td></tr>
                  <tr><td>Flush</td><td>+4</td></tr>
                  <tr><td>Full House</td><td>+6</td></tr>
                  <tr><td>Four of a kind</td><td>+10</td></tr>
                  <tr><td>Straight Flush</td><td>+15</td></tr>
                  <tr><td>Five of a kind (requires jokers)</td><td>+25</td></tr>
                  <tr><td>Royal Flush</td><td>+25</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Five of a kind and Royal Flush are both worth 25 points on the bottom. Royal Flush
              beats Five of a kind in hand strength, but royalty value is equal.
            </p>
          </section>

          {/* ───── Fantasy Land ───── */}
          <section id="fantasy-land">
            <h2>Fantasy Land</h2>
            <p>
              Fantasy Land (FL) is the most exciting mechanic in OFC. Qualify for Fantasy Land
              and you receive all your cards at once next hand — full information to build the
              perfect board.
            </p>

            <h3>Entering Fantasy Land</h3>
            <p>
              OFC Ledger supports three Fantasy Land modes:
            </p>
            <p>
              <strong>Classic Fantasy Land:</strong> Any pair of Queens or better on top qualifies —
              you receive 14 cards next hand.
            </p>
            <p>
              <strong>Progressive Fantasy Land</strong> (most common in competitive play):
            </p>
            <ul>
              <li><strong>Pair of Queens</strong> on top → 14 cards</li>
              <li><strong>Pair of Kings</strong> on top → 15 cards</li>
              <li><strong>Pair of Aces</strong> on top → 16 cards</li>
              <li><strong>Three of a kind</strong> on top → 17 cards</li>
            </ul>
            <p>
              <strong>Custom:</strong> You set the qualification thresholds yourself in the app settings.
            </p>
            <p>
              OFC Ledger defaults to Classic Fantasy Land.
            </p>

            <h3>While in Fantasy Land</h3>
            <ul>
              <li>You receive all cards at once and place them privately.</li>
              <li>Opponents see your cards face-down.</li>
              <li>Regular turn order is suspended — all Fantasy Land players place simultaneously.</li>
            </ul>

            <h3>Staying in Fantasy Land</h3>
            <ul>
              <li><strong>Three of a kind</strong> on top, OR</li>
              <li><strong>Four of a kind or better</strong> on bottom.</li>
            </ul>
            <p>
              Fouling in Fantasy Land still counts — you lose the hand and exit FL. The number
              of cards received (14–17) is shown as a badge in OFC Ledger&apos;s results screen.
            </p>
          </section>

          {/* ───── Special Rules ───── */}
          <section id="special-rules">
            <h2>Special Rules in OFC Ledger</h2>
            <p>
              These rules are optional and toggled in game settings. They were developed from
              house rules in the OFC community.
            </p>

            <h3>Spades Multiplier</h3>
            <p>
              When a player places the 2 of Spades on their board (not as a joker), their total
              net score for that hand is multiplied.
            </p>
            <ul>
              <li><strong>2♠ alone:</strong> ×2</li>
              <li><strong>2♠ + 3♠:</strong> ×4</li>
              <li><strong>2♠ + 3♠ + 4♠:</strong> ×8</li>
            </ul>
            <p>
              The multiplier applies to the full net result including royalties. If two players
              both hold spades multipliers, the higher multiplier applies — they do not stack.
            </p>

            <h3>The Choice</h3>
            <p>
              If you play the 2 of Spades and are not currently in Fantasy Land, you earn
              <strong> The Choice</strong> for your next hand. With The Choice active you may
              place either 1 or 3 cards instead of the normal 2 on a turn — but your total
              placements must balance to an even number over the round. You carry a debt that
              must be settled within the same hand.
            </p>
            <p>
              The Choice badge (TC) appears in the results screen when active.
              The Choice can only be earned when you play the 2 of Spades outside of Fantasy
              Land, and it can only be used the following hand if you are also not in Fantasy
              Land that hand — if you enter Fantasy Land, The Choice is forfeit.
            </p>

            <h3>Jokers</h3>
            <p>
              1–3 jokers can be added to the deck. When you place a joker on your board you
              declare which card it represents. Once confirmed the value is locked for that hand.
              If time runs out jokers are auto-defined as 2♥, 3♥, or 4♥.
            </p>
          </section>

          {/* ───── App Settings ───── */}
          <section id="settings">
            <h2>App Settings — Customize Your Game</h2>
            <p>
              OFC Ledger lets you configure the game to match how your crew plays. Settings are
              chosen when creating a new game.
            </p>
            <ul>
              <li><strong>Variant:</strong> Classic or Pineapple.</li>
              <li><strong>Fantasy Land mode:</strong> Classic (QQ+), Progressive (QQ=14, KK=15, AA=16, trips=17), or Custom.</li>
              <li><strong>Spades Multiplier:</strong> On or Off.</li>
              <li><strong>The Choice:</strong> On or Off.</li>
              <li><strong>Jokers:</strong> 0–3.</li>
              <li><strong>Turn timer:</strong> 5 minutes to 24 hours, or unlimited.</li>
              <li><strong>Match length:</strong> Optional. Set a fixed number of hands — for example challenge a friend to a 10-hand match — or leave open-ended.</li>
              <li><strong>Players:</strong> 2–4.</li>
            </ul>
          </section>

          {/* ───── Glossary ───── */}
          <section id="glossary">
            <h2>Glossary</h2>
            <ul>
              <li><strong>Foul</strong> — An invalid board where hand strength order is broken. Loses 6 points per opponent, no royalties earned.</li>
              <li><strong>Scoop</strong> — Winning all three rows against one opponent. Worth 3 points total including a 2-point scoop bonus.</li>
              <li><strong>Fantasy Land (FL)</strong> — Receiving all cards at once next hand after qualifying on the top row.</li>
              <li><strong>Royalties</strong> — Bonus points for strong hands, added after head-to-head row scoring.</li>
              <li><strong>The Choice (TC)</strong> — Earned by playing 2♠. Allows placing 1 or 3 cards on a turn instead of the normal 2.</li>
              <li><strong>Spades Multiplier</strong> — Multiplies your net score when you hold 2♠ and optionally 3♠ and 4♠.</li>
              <li><strong>Pineapple</strong> — OFC variant where you receive 3 cards per turn and discard 1.</li>
              <li><strong>Dead card</strong> — The discarded card in Pineapple, played face-down and not revealed.</li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}
