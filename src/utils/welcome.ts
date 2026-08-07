export function welcomeMessage() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Bom Dia";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Boa Tarde";
  } else {
    return "Bom Noite";
  }
}
