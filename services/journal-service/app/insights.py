def generate_rule_based_insight(entry, recent_entries):
    recent_scores = [e.mood_score for e in recent_entries if e.mood_score is not None]

    recent_average = None
    trend = "stable"

    if recent_scores:
        recent_average = round(sum(recent_scores) / len(recent_scores), 1)

    if len(recent_scores) >= 4:
        midpoint = len(recent_scores) // 2

        older = recent_scores[:midpoint]
        newer = recent_scores[midpoint:]

        older_avg = sum(older) / len(older)
        newer_avg = sum(newer) / len(newer)

        if newer_avg < older_avg - 0.3:
            trend = "declining"
        elif newer_avg > older_avg + 0.3:
            trend = "improving"
        else:
            trend = "stable"

    if entry.mood_score <= 2:
        tone = "supportive"
        message = (
            "This entry suggests today may have felt difficult. "
            "A small reset like hydration, rest, fresh air, or a short walk may help. "
            "Keeping things simple and reaching for support when needed could help."
        )

    elif entry.mood_score == 3:
        tone = "balanced"
        message = (
            "This reflection shows a balanced emotional state. "
            "Maintaining routines and noticing small positives may help preserve stability."
        )

    else:
        tone = "encouraging"
        message = (
            "This entry reflects a positive emotional state. "
            "Recognizing what contributed to this moment can help reinforce healthy patterns."
        )

    if recent_average is not None:
        if recent_average < 3:
            message += " The recent pattern appears to be dipping slightly."
        elif recent_average > 4:
            message += " Recent reflections suggest strong emotional consistency."

    return {
        "message": message,
        "tone": tone,
        "recent_average": recent_average,
        "trend": trend,
        "source": "rule_based"
    }