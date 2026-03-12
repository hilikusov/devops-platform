from app.trends import calculate_recent_average, detect_trend


def generate_rule_based_insight(entry, recent_entries):
    recent_average = calculate_recent_average(recent_entries)
    trend = detect_trend(recent_entries)

    if entry.mood_score < 3:
        base_message = (
            "This entry suggests today may have felt difficult. "
            "A small reset like hydration, rest, fresh air, or a short walk may help."
        )
        tone = "supportive"

    elif entry.mood_score > 3:
        base_message = (
            "This entry reflects a steadier or more positive moment. "
            "Take a moment to notice what may have helped today."
        )
        tone = "encouraging"

    else:
        base_message = (
            "This entry suggests a more balanced or neutral day. "
            "Small, steady routines can help maintain that balance."
        )
        tone = "neutral"

    trend_message = ""

    if recent_average is not None:
        if recent_average < 3:
            trend_message = (
                " Your recent entries suggest this may be part of a harder stretch. "
                "Keeping things simple and reaching for support when needed could help."
            )
        elif recent_average > 3:
            trend_message = (
                " Your recent entries suggest a more positive pattern lately. "
                "That progress is worth recognizing."
            )

    direction_message = ""

    if trend == "declining":
        direction_message = " The recent pattern appears to be dipping slightly."
    elif trend == "improving":
        direction_message = " The recent pattern appears to be improving."

    message = f"{base_message}{trend_message}{direction_message}"

    return {
        "message": message,
        "tone": tone,
        "recent_average": recent_average,
        "trend": trend,
        "source": "rule_based",
    }