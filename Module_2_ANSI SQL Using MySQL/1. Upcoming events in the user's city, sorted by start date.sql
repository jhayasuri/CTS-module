SELECT u.full_name, e.title, e.city, e.start_date
FROM Users u
JOIN Registrations r ON u.user_id = r.user_id
JOIN Events e ON e.event_id = r.event_id
WHERE e.status = 'upcoming' AND u.city = e.city
ORDER BY e.start_date;