import Link from "next/link";
import {
  automationHighlights,
  nodesByName,
  stageSections,
  workflow,
} from "@/data/workflow";

export default function Home() {
  const totalNodes = workflow.nodes.length;
  const totalConnections = Object.values(workflow.connections).reduce(
    (count, outputs) =>
      count +
      outputs.main.reduce(
        (sum, connections) => sum + connections.length,
        0,
      ),
    0,
  );

  const formatNodeType = (type: string) =>
    type
      .replace("n8n-nodes-base.", "")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-12">
        <section className="grid gap-10 rounded-3xl border border-slate-800 bg-slate-900/40 p-10 shadow-[0_0_80px_-40px_rgba(15,23,42,0.8)] lg:grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Y Tiffin Service · n8n Automation
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Production-grade workflow for orchestrating every tiffin order
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Import this workflow into n8n to capture orders in real time,
              route them to the right prep team, and keep your kitchen, delivery
              riders, and customers in sync.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/workflow.json"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-emerald-300"
              >
                Download workflow.json
              </Link>
              <a
                href="#workflow-map"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"
              >
                Explore the flow
              </a>
            </div>
          </div>
          <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Nodes
              </p>
              <p className="text-3xl font-semibold text-white">{totalNodes}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Connections
              </p>
              <p className="text-3xl font-semibold text-white">
                {totalConnections}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Timezone
              </p>
              <p className="text-lg text-slate-200">
                {workflow.settings?.timezone ?? "UTC"}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-3" id="highlights">
          {automationHighlights.map((highlight) => (
            <article
              key={highlight.title}
              className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <h2 className="text-lg font-semibold text-white">
                {highlight.title}
              </h2>
              <p className="text-sm text-slate-300">{highlight.body}</p>
            </article>
          ))}
        </section>

        <section
          id="workflow-map"
          className="grid gap-10 rounded-3xl border border-slate-800 bg-slate-900/40 p-10"
        >
          <header className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold text-white">
              Order journey snapshots
            </h2>
            <p className="max-w-3xl text-base text-slate-300">
              Each stage combines several n8n nodes. Import the JSON and plug in
              your credentials (Slack, Google Sheets, SMTP) to go live.
            </p>
          </header>
          <div className="grid gap-8 lg:grid-cols-3">
            {stageSections.map((stage) => (
              <article
                key={stage.id}
                className="flex flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-6"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-slate-300">{stage.description}</p>
                </div>
                <ul className="space-y-3 text-sm">
                  {stage.nodeNames.map((name) => {
                    const node = nodesByName.get(name);
                    if (!node) return null;
                    return (
                      <li
                        key={name}
                        className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3"
                      >
                        <span className="font-medium text-white">{name}</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-emerald-400">
                          {formatNodeType(node.type)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/25 p-10">
          <header className="space-y-3">
            <h2 className="text-2xl font-semibold text-white">Node catalog</h2>
            <p className="text-sm text-slate-300">
              Reference of all nodes bundled in the export, grouped by their
              runtime roles.
            </p>
          </header>
          <div className="grid gap-4 text-sm md:grid-cols-2 xl:grid-cols-3">
            {workflow.nodes.map((node) => (
              <article
                key={node.id}
                className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Node #{node.id}
                  </span>
                  <span className="text-xs text-slate-400">
                    v{node.typeVersion}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {node.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">
                  {formatNodeType(node.type)}
                </p>
                <div className="mt-2 space-y-1 text-xs text-slate-400">
                  {Object.entries(node.parameters)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <p key={key}>
                        <span className="text-slate-500">{key}: </span>
                        <span className="text-slate-100">
                          {typeof value === "object"
                            ? Array.isArray(value)
                              ? value.length
                              : "set"
                            : String(value)}
                        </span>
                      </p>
                    ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/50 via-slate-900/20 to-slate-900/70 p-10 text-slate-200">
          <h2 className="text-2xl font-semibold text-white">
            Import instructions
          </h2>
          <ol className="space-y-3 text-sm text-slate-300">
            <li>
              1. Download the packaged workflow JSON and drag it into n8n via
              the import dialog.
            </li>
            <li>
              2. Configure credentials for Slack, Google Sheets, and email under
              n8n&apos;s Credentials panel.
            </li>
            <li>
              3. Replace the sample customer API endpoint with your real source,
              or remove the node if not needed.
            </li>
            <li>
              4. Publish the workflow and pair it with your live ordering
              frontend or WhatsApp bot.
            </li>
          </ol>
        </section>
      </main>
    </div>
  );
}
