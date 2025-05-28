SELECT e.title, AVG(f.rating) AS avg_rating, COUNT(f.feedback_id) AS total_feedback
FROM Events e
JOIN Feedback f ON f.event_id = e.event_id
GROUP BY e.event_id
ORDER BY avg_rating DESC;
