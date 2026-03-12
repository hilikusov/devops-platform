def generate_rule_based_insight(entry, recent_entries):
    recent_scores = [e.mood_score for e in recent_entries if e.mood_score is not None]

    recent_average = None
    trend = "stable"
    pattern = "neutral"

    if recent_scores:
        recent_average = round(sum(recent_scores) / len(recent_scores), 1)

    # Trend compares older half vs newer half
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

    # Pattern describes the overall recent state
    if recent_average is not None:
        if recent_average < 2.5:
            pattern = "persistently_low"
        elif recent_average > 3.8:
            pattern = "persistently_positive"
        elif 2.5 <= recent_average <= 3.8:
            pattern = "mixed"

    # Message generation
    if entry.mood_score <= 2:
        tone = "supportive"
        message = (
            "This entry suggests today may have felt difficult. "
            "A small reset like hydration, rest, fresh air, or a short walk may help."
        )
    elif entry.mood_score == 3:
        tone = "balanced"
        message = (
            "This reflection shows a more balanced emotional state. "
            "Maintaining steady routines may help preserve that balance."
        )
    else:
        tone = "encouraging"
        message = (
            "This entry reflects a more positive emotional state. "
            "Noticing what helped today may reinforce healthy patterns."
        )

    # Add context from recent pattern
    if pattern == "persistently_low":
        message += (
            " Your recent entries suggest this has been a hard stretch rather than a one-off moment."
        )
    elif pattern == "persistently_positive":
        message += (
            " Your recent entries suggest a more positive pattern lately, which is worth recognizing."
        )
    elif pattern == "mixed":
        message += (
            " Your recent entries suggest some fluctuation, which can be useful to keep noticing over time."
        )

    # Add direction wording
    if trend == "declining":
        message += " The recent direction appears to be dipping."
    elif trend == "improving":
        message += " The recent direction appears to be improving."
    else:
        message += " The recent direction appears relatively steady."

    return {
        "message": message,
        "tone": tone,
        "recent_average": recent_average,
        "trend": trend,
        "pattern": pattern,
        "source": "rule_based"
    }