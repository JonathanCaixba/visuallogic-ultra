import { EventCenterShell } from "@/features/events/components/event-center-shell";
import { salesforceAgentforceClient } from "@/lib/salesforce/mock-salesforce-client";

export default async function EventsPage() {
  const events = await salesforceAgentforceClient.getEvents();
  return <EventCenterShell events={events} />;
}
