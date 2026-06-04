"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentThinkingTimeline } from "@/features/command-center/components/agent-thinking-timeline";
import { AgentService } from "@/services/agent.service";
import { useCommandCenterStore } from "@/stores/command-center-store";

const promptExamples = [
  "Show closed opportunities this quarter",
  "Support operations overview",
  "Generate executive intelligence dashboard"
];

export function CommandCenterShell() {
  const router = useRouter();
  const prompt = useCommandCenterStore((state) => state.prompt);
  const tasks = useCommandCenterStore((state) => state.tasks);
  const isGenerating = useCommandCenterStore((state) => state.isGenerating);
  const setPrompt = useCommandCenterStore((state) => state.setPrompt);
  const startGeneration = useCommandCenterStore((state) => state.startGeneration);
  const updateTaskStatus = useCommandCenterStore((state) => state.updateTaskStatus);
  const completeGeneration = useCommandCenterStore((state) => state.completeGeneration);
  const [error, setError] = useState<string | undefined>();
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestPrompt = prompt.trim();

    if (!requestPrompt || isGenerating) {
      return;
    }

    setError(undefined);
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];

    try {
  const response = await AgentService.generateDashboard(requestPrompt);

  startGeneration(response.tasks);

  response.tasks.forEach((task, index) => {
    const runningTimer = window.setTimeout(
      () => updateTaskStatus(task.id, "running"),
      index * 850
    );

    const completedTimer = window.setTimeout(
      () => updateTaskStatus(task.id, "completed"),
      index * 850 + 620
    );

    timers.current.push(runningTimer);
    timers.current.push(completedTimer);
  });

  window.setTimeout(() => {
    completeGeneration(response.dashboardId);
    router.push(`/dashboard/${response.dashboardId}`);
  }, response.tasks.length * 850 + 1000);

} catch {
  setError("Command request could not be prepared.");
}
  };

  return (
    <section className="min-h-full p-4 md:p-6">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="dashboard-surface min-h-[420px] p-5 md:p-6">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1.5">
              <Bot className="h-3.5 w-3.5" aria-hidden="true" />
              Salesforce Agentforce
            </Badge>
            <Badge variant="outline">Public Demo</Badge>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold md:text-4xl">AI Command Center</h1>
            <p className="mt-3 text-base text-muted-foreground">
              Salesforce remains the orchestration layer. VisualLogic Ultra renders the dashboard experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 max-w-4xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Show closed opportunities this quarter"
                className="h-12 text-base"
                disabled={isGenerating}
              />
              <Button type="submit" size="lg" disabled={!prompt.trim() || isGenerating} className="sm:w-36">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Generate
              </Button>
            </div>
            {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {promptExamples.map((example) => (
              <Button
                key={example}
                type="button"
                variant="subtle"
                size="sm"
                onClick={() => setPrompt(example)}
                disabled={isGenerating}
              >
                {example}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            ))}
          </div>
        </div>

        <AgentThinkingTimeline tasks={tasks} />
      </div>
    </section>
  );
}
