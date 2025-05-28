SELECT 
    e.event_id,
    e.title,
    COUNT(s.session_id) AS total_sessions
FROM 
    Events e
JOIN 
    Sessions s ON e.event_id = s.event_id
GROUP BY 
    e.event_id, e.title
HAVING 
    COUNT(s.session_id) = (
        -- Subquery to find the maximum session count across all events
        SELECT 
            MAX(session_count)
        FROM (
            SELECT 
                event_id,
                COUNT(*) AS session_count
            FROM 
                Sessions
            GROUP BY 
                event_id
        ) AS session_counts
    );