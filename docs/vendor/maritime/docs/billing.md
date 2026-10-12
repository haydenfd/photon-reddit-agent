> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/billing

# Billing & plans

One subscription, a set number of agents, flat prices for extras. No meters, no hourly rates: how
much your agents run never changes the bill.

## Plans

A plan includes a number of agents; every agent gets the same base allocation (2 GB RAM, 5 GB SSD,
auto-sleep when idle). Sleeping agents keep their full state and count toward the included number,
not toward any extra charge.

| Plan | Price | Included machines | Awake at once | Extra machine |
| --- | --- | --- | --- | --- |
| **Free** | $0 | 3 | 1 | Upgrade to add more |
| **Starter** | $20/mo | 20 | 5 | $1.50/mo |
| **Growth** | $100/mo | 100 | 25 | $1.25/mo |
| **Scale** | $500/mo | 500 | 60 | $1.00/mo |

A **machine** is one micro-VM, and the plan does not care which kind. An agent is a machine, and so
is a [Computer](https://maritime.sh/docs/computers), the persistent Linux desktop your model drives
over MCP. A $20 plan therefore holds 20 agents, 20 Computers, or any mix of the two. Computers need
a paid plan; the free plan runs agents. **Awake at once** is how many may run at the same time;
sleeping machines are free and do not count, and a wake past the limit answers 429 with a retry
hint rather than running slowly.

The subscription is charged when you subscribe and on each monthly renewal. The two kinds of extras
bill differently: **extra machines** are flat monthly slots (prorated to the cycle end when you
first buy one; a slot stays bought, and billed, through the end of the cycle even if you delete the
agent), while **add-ons** (extra RAM, extra SSD, always-on) are counted per day of use and billed
in arrears on the next invoice, so an add-on that only existed for a week costs a quarter of its
monthly price. Canceling keeps the plan through the paid period, then drops the account to the
free tier.

## Add-ons

Add-ons are flat per-agent monthly prices, set per agent at creation or resized later from the
agent's settings. Self-serve ceilings are 8 GB RAM and 100 GB SSD per agent.

| Add-on | Unit | Starter | Growth | Scale |
| --- | --- | --- | --- | --- |
| **Extra RAM** | per GB above the base 2 GB | $3/mo | $2.50/mo | $2/mo |
| **Extra SSD** | per 5 GB above the base 5 GB | $2/mo | $1.50/mo | $1/mo |
| **Always-on** | per agent, opts out of auto-sleep | $20/mo | $20/mo | $20/mo |

Always-on is for agents that must react in milliseconds, around the clock; everything else sleeps
when idle at no cost. Sleeping is not unreachability: any request to a public agent URL, webhook,
or trigger wakes the agent automatically (about a second), so most public web agents do not need
always-on. The API reports which mode an agent is in as `sleepPolicy` (the legacy `tier` field is
a retired label and does not reflect sleep behavior).

## Estimate your bill

Drag the sliders; the calculator picks the cheapest plan and itemizes the estimate from the tables
above. The Billing page in the dashboard is authoritative.

*Interactive calculator (web page only): sliders for Agents, Always-on agents (the rest auto-sleep
free), Extra RAM (GB above the 2 GB base, across agents), and Extra SSD (5 GB units above the 5 GB
base). Up to 3 agents with the base allocation runs free, forever. Add a fourth agent or any add-on
and the calculator picks the cheapest paid plan. Cheapest plan picked automatically. Hosting only;
model calls draw on separate prepaid AI credits, and nothing here is usage-metered.*

## Free tier

Free accounts get 3 agents forever, and one of them can be awake at a time. Base allocation only: no add-ons,
no extra agents. It exists so you can genuinely build and test before paying, not as a trial that
expires.

## AI credits (model calls)

Model calls are separate from hosting. Agents created without your own key route through the
Maritime proxy and draw down prepaid **AI credits** at provider list price; buy more from the
Billing page, and each purchase gets a Stripe receipt. New accounts start with a **$5 welcome
credit**; the unspent part expires 30 days after signup, while credits you buy never expire. Bring
your own `OPENAI_API_KEY` on any agent and that pool is never touched: you pay your provider
directly.

## Failed payments

If a renewal charge fails you get a 14-day grace period (with email reminders) during which
everything keeps running. After that, agents are put to sleep with their state preserved until
payment succeeds, and unpaid add-on days are settled automatically on the next successful charge.

## Watching spend

The Billing page reads as a statement: the next charge and its date, the card on file, the AI
credits left, and then the plan. It shows the machines used against the included number, and the
add-ons in use with their per-day rate. Computers appear in that same machine count, because they
are machines. Every invoice, with a PDF receipt, is listed at the bottom. Plan changes and
cancellations start on the Billing page and finish on Stripe, which shows the exact amount before
anything is charged.
