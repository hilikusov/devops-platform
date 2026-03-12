def calculate_recent_average(entries):
    if not entries:
        return None

    total = sum(entry.mood_score for entry in entries)
    return round(total / len(entries), 2)


def detect_trend(entries):
    if len(entries) < 2:
        return "stable"

    moods = [entry.mood_score for entry in entries]

    if moods[-1] > moods[0]:
        return "improving"
    elif moods[-1] < moods[0]:
        return "declining"
    return "stable"