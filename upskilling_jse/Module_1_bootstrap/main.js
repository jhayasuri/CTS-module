// main.js

// --- 1. JavaScript Basics & Setup ---
console.log("Welcome to the Community Portal"); // Log "Welcome to the Community Portal" using console.log() [cite: 35]

window.addEventListener('load', () => {
    // alert("Page is fully loaded!"); // Use an alert to notify when the page is fully loaded [cite: 35]
    // (Commented out to avoid repetitive alerts on refresh during development)
    fetchEventsFromMockAPI(); // Initial fetch on page load
});

// --- 5. Objects and Prototypes ---
// Define Event constructor or class
class Event {
    // Use default parameters in constructor for clarity [cite: 46]
    constructor(id, name, date, totalSeats, category, registeredSeats = 0, imageUrl = 'images/default_event.jpg') { // Default to a local default image
        this.id = id;
        // Use const for event name and date, let for seats (conceptually applied to properties) [cite: 36]
        this.name = name;
        this.date = date;
        this.totalSeats = totalSeats;
        this.category = category;
        this.registeredSeats = registeredSeats;
        this.imageUrl = imageUrl;
    }

    // Add checkAvailability() to prototype [cite: 41]
    checkAvailability() {
        return this.totalSeats - this.registeredSeats;
    }

    // Method to register a user
    registerUser() {
        if (this.checkAvailability() > 0) {
            this.registeredSeats++; // Use ++ or -- to manage seat count on registration [cite: 36]
            console.log(`Registered for "${this.name}". Seats left: ${this.checkAvailability()}`);
            return true;
        } else {
            console.log(`Cannot register for "${this.name}". No seats available.`);
            return false;
        }
    }
}

// Global array to manage all community events [cite: 42]
let communityEvents = [];
let nextEventId = 1;

// --- 9. Async JS, Promises, Async/Await ---
// Simulate fetching event data from a mock API [cite: 45]
const MOCK_API_URL = "http://mockapi.com/events"; // Placeholder URL

async function fetchEventsFromMockAPI() {
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = 'block'; // Rewrite using async/await and show loading spinner [cite: 45]

    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data structure, now using relative paths for local images
        const mockApiResponse = [            { id: 1, name: "Local Music Festival", date: "2025-06-15", totalSeats: 100, registeredSeats: 20, category: "Music", imageUrl: './event1.jpg' },

            { id: 2, name: "Community Baking Workshop", date: "2025-05-20", totalSeats: 30, registeredSeats: 30, category: "Workshop", imageUrl: './event2.jpg' }, // Past or Full Event

            { id: 3, name: "Tech Innovators Meetup", date: "2025-07-10", totalSeats: 50, registeredSeats: 10, category: "Technology", imageUrl: './event3.jpg' },

            { id: 4, name: "Local Charity Run", date: "2025-08-01", totalSeats: 200, registeredSeats: 150, category: "Sports", imageUrl: './event4.jpg' },

            { id: 5, name: "Creative Writing Session", date: "2025-06-25", totalSeats: 25, registeredSeats: 5, category: "Workshop", imageUrl: './event5.jpg' },

  { id: 6, name: "Art Exhibition Opening", date: "2025-07-20", totalSeats: 70, registeredSeats: 30, category: "Arts", imageUrl: './event6.jpg' }

 ];

        // Process data to create Event objects
        communityEvents = mockApiResponse.map(data => new Event(
            data.id, data.name, data.date, data.totalSeats, data.category, data.registeredSeats, data.imageUrl
        ));

        // Update nextEventId to be higher than any existing IDs
        nextEventId = Math.max(...communityEvents.map(e => e.id)) + 1;

        console.log("Events fetched:", communityEvents);
        displayEvents(); // Display events after fetching
    } catch (error) { // Use .then() and .catch() to handle results (conceptually covered by async/await try-catch) [cite: 45]
        console.error("Failed to fetch events:", error);
        const eventsContainer = document.getElementById('events-container');
        eventsContainer.innerHTML = '<p class="error-message">Failed to load events. Please try again later.</p>';
    } finally {
        loadingSpinner.style.display = 'none'; // Hide loading spinner
    }
}


// --- 4. Functions, Scope, Closures, Higher-Order Functions ---

// Use closure to track total registrations for a category [cite: 39]
const createCategoryRegistrationTracker = () => {
    const categoryRegistrations = {}; // This 'categoryRegistrations' is part of the closure

    return (category, count = 1) => {
        categoryRegistrations[category] = (categoryRegistrations[category] || 0) + count;
        console.log(`Total registrations for ${category}: ${categoryRegistrations[category]}`);
        return categoryRegistrations[category];
    };
};
const trackCategoryRegistrations = createCategoryRegistrationTracker();


// Create addEvent() function [cite: 39]
function addEvent(name, date, totalSeats, category, imageUrl = 'images/default_event.jpg') { // Add imageUrl as parameter
    const newEvent = new Event(nextEventId++, name, date, totalSeats, category, 0, imageUrl);
    communityEvents.push(newEvent); // Add new events using .push() [cite: 42]
    console.log(`Event "${newEvent.name}" added successfully.`);
    displayEvents(); // Refresh event display
    return newEvent;
}

// Create registerUser() function - simplified, actual registration done via Event method
// This function orchestrates the registration process and error handling.
async function registerUser(eventName, userName, userEmail) {
    const registrationMessage = document.getElementById('registration-message');
    registrationMessage.textContent = ''; // Clear previous messages
    registrationMessage.className = '';

    // --- FIX: Get error message span elements ---
    const eventNameError = document.getElementById('eventNameError');
    const userNameError = document.getElementById('userNameError');
    const userEmailError = document.getElementById('userEmailError');

    // --- FIX: Clear previous error styles and messages ---
    eventNameError.textContent = "";
    userNameError.textContent = "";
    userEmailError.textContent = "";
    eventNameError.classList.remove('error-message');
    userNameError.classList.remove('error-message');
    userEmailError.classList.remove('error-message');


    // Validate inputs and show errors inline [cite: 48]
    let isValid = true;
    if (!eventName) {
        eventNameError.textContent = "Event name is required.";
        eventNameError.classList.add('error-message');
        isValid = false;
    }
    if (!userName) {
        userNameError.textContent = "Your name is required.";
        userNameError.classList.add('error-message');
        isValid = false;
    }
    if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
        userEmailError.textContent = "A valid email is required.";
        userEmailError.classList.add('error-message');
        isValid = false;
    }

    if (!isValid) {
        return false;
    }

    try {
        // Wrap registration logic in try-catch to handle errors [cite: 37]
        // Use destructuring to extract event details (conceptually, accessing object properties) [cite: 46]
        const eventToRegister = communityEvents.find(event => event.name.toLowerCase() === eventName.toLowerCase());

        if (!eventToRegister) {
            throw new Error(`Event "${eventName}" not found.`);
        }

        if (eventToRegister.checkAvailability() <= 0) {
            throw new Error(`Registration failed for "${eventName}". No seats available.`);
        }

        // Use setTimeout() to simulate a delayed response [cite: 49]
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Use fetch() to POST user data to a mock API (simulated) [cite: 49]
        // In a real app, you'd use fetch() to send data to a backend
        const mockResponse = { success: true, message: "Registration successful!" };
        // const response = await fetch('http://mockapi.com/register', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ eventId: eventToRegister.id, userName, userEmail })
        // });
        // const data = await response.json();

        if (mockResponse.success) {
            eventToRegister.registerUser(); // Register the user if mock API call is successful
            trackCategoryRegistrations(eventToRegister.category); // Use closure to track registrations [cite: 39]
            registrationMessage.textContent = `Successfully registered for "${eventToRegister.name}"!`;
            registrationMessage.classList.add('success-message'); // Show success/failure message after submission [cite: 49]
            displayEvents(); // Update UI when user registers or cancels [cite: 43]
            return true;
        } else {
            throw new Error(mockResponse.message || "Registration failed.");
        }
    } catch (error) {
        console.error("Registration process error:", error); // Log form submission steps and check fetch request payload [cite: 51]
        registrationMessage.textContent = `Error: ${error.message}`;
        registrationMessage.classList.add('error-message'); // Show success/failure message after submission [cite: 49]
        return false;
    }
}


// Pass callbacks to filter functions for dynamic search [cite: 39]
function filterEventsByCategory(events, category, callback) {
    // Use spread operator to clone event list before filtering [cite: 47]
    const eventsToFilter = [...events];
    if (category === "All") {
        return callback(eventsToFilter);
    }
    // Use .filter() to show only music events (or any category) [cite: 42]
    const filtered = eventsToFilter.filter(event => event.category === category);
    return callback(filtered);
}


// --- 7. DOM Manipulation & 3. Conditionals, Loops ---
function displayEvents(events = communityEvents) {
    const eventsContainer = document.getElementById('events-container'); // Access DOM elements using querySelector() (or getElementById) [cite: 43]
    eventsContainer.innerHTML = ''; // Clear existing content

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date for comparison

    // Use .map() to format display cards (e.g., "Workshop on Baking") [cite: 42]
    const eventCardsHTML = events.map(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);

        const isPastEvent = eventDate < today;
        const isFullEvent = event.checkAvailability() <= 0;

        // Use if-else to hide past or full events [cite: 37]
        if (isPastEvent || isFullEvent) {
            return ''; // Don't display these events
        }

        const availableSeats = event.checkAvailability();
        const registerButtonText = availableSeats > 0 ? "Register" : "Full";
        const isButtonDisabled = availableSeats <= 0;

        // Create and append event cards using createElement() (conceptually via innerHTML) [cite: 43]
        // Concatenate event info using template literals [cite: 36]
        return `
            <div class="col animate__animated animate__fadeInUp animate__delay-0.2s">
                <div class="card h-100 shadow-sm event-card">
                    <img src="${event.imageUrl}" class="card-img-top" alt="${event.name}">
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title">${event.name}</h3>
                        <p class="card-text"><strong>Date:</strong> ${event.date}</p>
                        <p class="card-text"><strong>Category:</strong> ${event.category}</p>
                        <p class="card-text"><strong>Seats:</strong> ${availableSeats} / ${event.totalSeats}</p>
                        <button onclick="handleEventRegistrationUI(${event.id})" class="btn mt-auto btn-custom-card" ${isButtonDisabled ? 'disabled' : ''}>
                            ${registerButtonText}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join(''); // Join array of HTML strings into a single string

    if (eventCardsHTML === '') {
        eventsContainer.innerHTML = '<div class="col-12"><p class="text-center text-muted fs-5 py-4">No upcoming events available matching your criteria. Check back soon!</p></div>';
    } else {
        eventsContainer.innerHTML = eventCardsHTML;
    }

    // List object keys and values using Object.entries() [cite: 41]
    // For demonstration, logging first displayed event's properties
    if (events.length > 0) {
        console.log("\nProperties of the first displayed event:");
        Object.entries(events[0]).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    }
}


// --- 8. Event Handling ---

// Use onchange to filter events by category [cite: 44]
function filterEvents() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;

    filterEventsByCategory(communityEvents, selectedCategory, (filteredList) => {
        displayEvents(filteredList);
        console.log(`Filtered by category: ${selectedCategory}`);
    });
}

// Use keydown to allow quick search by name [cite: 44]
function handleSearchKeydown(event) {
    if (event.key === 'Enter') {
        const searchTerm = event.target.value.toLowerCase();
        const filteredByName = communityEvents.filter(event => event.name.toLowerCase().includes(searchTerm));
        displayEvents(filteredByName);
        console.log(`Searched for: "${searchTerm}"`);
    }
}

// Handle event registration button click (onclick) [cite: 44]
function handleEventRegistrationUI(eventId) {
    const eventNameInput = document.getElementById('registerEventName');
    const eventToRegister = communityEvents.find(event => event.id === eventId);
    if (eventToRegister) {
        eventNameInput.value = eventToRegister.name;
        // Optionally, scroll to the registration form
        document.getElementById('registration-form-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}


// --- 11. Working with Forms ---
const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
    registrationForm.addEventListener('submit', async function(event) { // Use submit for form submission
        event.preventDefault(); // Prevent default form behavior using event.preventDefault() [cite: 48]

        // Capture name, email, and selected event using form.elements (conceptually, by direct ID access) [cite: 48]
        const eventName = document.getElementById('registerEventName').value;
        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;

        // Validate inputs and show errors inline - handled by registerUser function [cite: 48]
        await registerUser(eventName, userName, userEmail);

        // Update UI when user registers or cancels - handled by displayEvents() call inside registerUser [cite: 43]
        // Show success/failure message after submission - handled by registerUser function [cite: 49]
    });
}

const addEventForm = document.getElementById('add-event-form');
if (addEventForm) {
    addEventForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newEventName = document.getElementById('newEventName').value;
        const newEventDate = document.getElementById('newEventDate').value;
        const newEventSeats = parseInt(document.getElementById('newEventSeats').value);
        const newEventCategory = document.getElementById('newEventCategory').value;
        const addEventMessage = document.getElementById('add-event-message');

        // You'll need to manually manage image paths for newly added events
        // For demonstration, we'll use a generic placeholder or you can hardcode one
        // For a real app, you'd likely have an image upload or selection mechanism
        const imageUrl = `images/default_event.jpg`; // Use a generic local image for newly added events

        if (!newEventName || !newEventDate || isNaN(newEventSeats) || newEventSeats <= 0 || !newEventCategory) {
            addEventMessage.textContent = "Please fill all fields correctly.";
            addEventMessage.classList.add('error-message');
            return;
        }

        const added = addEvent(newEventName, newEventDate, newEventSeats, newEventCategory, imageUrl);
        if (added) {
            addEventMessage.textContent = `"${added.name}" added successfully!`;
            addEventMessage.classList.add('success-message');
            addEventForm.reset(); // Clear form
        } else {
            addEventMessage.textContent = "Failed to add event.";
            addEventMessage.classList.add('error-message');
        }
    });
}

// --- 13. Debugging and Testing ---
/*
    Task: Use Chrome Dev Tools Console and Network tab; Add breakpoints and inspect variables;
    Log form submission steps and check fetch request payload. [cite: 51]

    Explanation: These are practices performed by a developer during development, not code to be written.
    - Console: `console.log()`, `console.error()`, `console.warn()` are used throughout this code example.
    - Network tab: When fetch() or AJAX calls are made, the Network tab shows requests and responses.
    - Breakpoints: Can be set directly in the browser's developer tools on any line of JavaScript code. [cite: 51]
      Execution will pause at that line, allowing inspection of variable values and step-through debugging.
*/

// --- 14. jQuery and JS Frameworks ---
/*
    Task: Use $('#registerBtn').click(...) to handle click events; Use .fadeIn() and .fadeOut() for event cards; [cite: 52]
    Mention one benefit of moving to frameworks like React or Vue. [cite: 52]

    Explanation: To use jQuery, you would need to include the jQuery library in your HTML.
    Since the problem statement didn't specify allowing external libraries (other than the tools),
    I'll provide a conceptual example if jQuery was loaded.
*/

/*
// If jQuery was included in HTML (e.g., <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>)
$(document).ready(function() {
    // Example: Using jQuery for click event [cite: 52]
    $('#registerBtn').click(function() {
        console.log("jQuery detected: Register button clicked!");
        // The actual registration logic is handled by the native JS form submit listener
    });

    // Example: Using .fadeIn() and .fadeOut() for event cards [cite: 52]
    // This would typically be used for dynamic content loading/unloading
    // For instance, when filtering, you might fade out old cards and fade in new ones.
    // Here, just a conceptual example:
    const showEventCardsWithEffect = () => {
        $('.event-card').hide().fadeIn(800);
    };

    // Call this after initial display or filtering
    // showEventCardsWithEffect();
});
*/

// Benefit of moving to frameworks like React or Vue: [cite: 52]
// One significant benefit is **Declarative UI and Component-Based Architecture**.
// Frameworks like React or Vue allow developers to build complex UIs using small, isolated, and reusable components.
// This approach simplifies UI development, makes code more predictable, and significantly improves maintainability and scalability
// compared to direct, imperative DOM manipulation for large applications. They also offer efficient ways to
// manage application state and automatically update the UI when data changes, reducing manual DOM updates.