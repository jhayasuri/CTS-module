-- Get users who have not registered for any events in the last 90 days
SELECT 
    u.full_name,
    u.email,
    MAX(r.registration_date) AS last_registered_on
FROM Users u
LEFT JOIN Registrations r 
    ON u.user_id = r.user_id
GROUP BY u.user_id
HAVING 
    last_registered_on IS NULL 
    OR last_registered_on < CURDATE() - INTERVAL 90 DAY;
