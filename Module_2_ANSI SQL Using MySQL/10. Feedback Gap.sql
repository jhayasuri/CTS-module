SELECT 
    e.event_id,
    e.title,
    COUNT(r.registration_id) AS total_registrations
FROM 
    Events e
JOIN 
    Registrations r ON e.event_id = r.event_id
LEFT JOIN 
    Feedback f ON e.event_id = f.event_id
WHERE 
    f.event_id IS NULL
GROUP BY 
    e.event_id, e.title
ORDER BY 
    total_registrations DESC;