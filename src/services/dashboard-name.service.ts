export function getDashboardName(prompt: string): string {
  const text = prompt.toLowerCase();

  if (
    text.includes("support") ||
    text.includes("case") ||
    text.includes("sla")
  ) {
    return "Support Operations Dashboard";
  }

  if (
    text.includes("executive") ||
    text.includes("overview") ||
    text.includes("summary")
  ) {
    return "Executive Overview Dashboard";
  }

  if (
    text.includes("insight") ||
    text.includes("risk") ||
    text.includes("prediction")
  ) {
    return "Executive Intelligence Dashboard";
  }

  if (
    text.includes("revenue") ||
    text.includes("sales") ||
    text.includes("opportunity") ||
    text.includes("pipeline")
  ) {
    return "Sales Performance Dashboard";
  }

  if (text.includes("account") || text.includes("accounts")) {
    return "Account Intelligence Dashboard";
  }

  if (
    text.includes("revenue") ||
    text.includes("sales") ||
    text.includes("opportunity") ||
    text.includes("opportunities") ||
    text.includes("oportunidad") ||
    text.includes("oportunidades") ||
    text.includes("pipeline")
  ) {
    return "Sales Performance Dashboard";
  }

  if (
    text.includes("account") ||
    text.includes("accounts") ||
    text.includes("cuenta") ||
    text.includes("cuentas")
  ) {
    return "Account Intelligence Dashboard";
  }

  if (
    text.includes("support") ||
    text.includes("case") ||
    text.includes("cases") ||
    text.includes("caso") ||
    text.includes("casos") ||
    text.includes("sla")
  ) {
    return "Support Operations Dashboard";
  }

  return "Custom Dashboard";
}
