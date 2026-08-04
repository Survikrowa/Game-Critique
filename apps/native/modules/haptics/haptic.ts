import * as Haptics from "expo-haptics";

export const haptic = {
  /** Lekkie stuknięcie — tap, wybór listy */
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),

  /** Średnie — potwierdzenie akcji, zmiana filtra */
  medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),

  /** Mocne — destrukcyjne akcje (usuń, odrzuć) */
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),

  /** Sukces — zapis, dodanie gry */
  success: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),

  /** Błąd — walidacja, niepowodzenie */
  error: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),

  /** Ostrzeżenie — potwierdzenie usunięcia */
  warning: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
};
