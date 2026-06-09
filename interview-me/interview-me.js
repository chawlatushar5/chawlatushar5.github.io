// Interview Me — chat UI logic.
// Talks to a Supabase Edge Function (see ../../supabase/functions/interview-me),
// which proxies to OpenAI and never exposes the API key to the browser.

(function () {
    "use strict";

    var config = window.INTERVIEW_ME_CONFIG || {};
    var chatWindow = document.getElementById("chat-window");
    var chatForm = document.getElementById("chat-form");
    var chatInput = document.getElementById("chat-input");
    var chatSubmit = document.getElementById("chat-submit");
    var suggestions = document.getElementById("suggested-questions");

    // Per-tab session id — lets the backend correlate a conversation and apply
    // basic per-session rate limiting without any login/cookies.
    var sessionId = (function () {
        var key = "interviewMeSessionId";
        var existing = window.sessionStorage.getItem(key);
        if (existing) return existing;
        var id = "im-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
        window.sessionStorage.setItem(key, id);
        return id;
    })();

    var history = []; // [{ role: "user"|"assistant", content: "..." }]
    var inFlight = false;

    function escapeHtml(str) {
        var div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    function scrollToBottom() {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function appendMessage(role, text) {
        var wrapper = document.createElement("div");
        wrapper.className = "im-message " + (
            role === "user" ? "im-message-user" :
            role === "error" ? "im-message-bot im-message-error" :
            "im-message-bot"
        );

        var author = document.createElement("span");
        author.className = "im-message-author";
        author.textContent = role === "user" ? "You" : "Assistant";

        var body = document.createElement("p");
        body.innerHTML = escapeHtml(text);

        wrapper.appendChild(author);
        wrapper.appendChild(body);
        chatWindow.appendChild(wrapper);
        scrollToBottom();
        return wrapper;
    }

    function appendTypingIndicator() {
        var wrapper = document.createElement("div");
        wrapper.className = "im-message im-message-bot im-typing-wrapper";

        var author = document.createElement("span");
        author.className = "im-message-author";
        author.textContent = "Assistant";

        var typing = document.createElement("p");
        typing.className = "im-typing";
        typing.innerHTML = "<span></span><span></span><span></span>";

        wrapper.appendChild(author);
        wrapper.appendChild(typing);
        chatWindow.appendChild(wrapper);
        scrollToBottom();
        return wrapper;
    }

    function setBusy(busy) {
        inFlight = busy;
        chatInput.disabled = busy;
        chatSubmit.disabled = busy;
    }

    function isConfigured() {
        return config.functionUrl && config.functionUrl.indexOf("REPLACE_WITH") !== 0
            && config.anonKey && config.anonKey.indexOf("REPLACE_WITH") !== 0;
    }

    function askQuestion(question) {
        question = (question || "").trim();
        if (!question || inFlight) return;

        appendMessage("user", question);
        history.push({ role: "user", content: question });
        chatInput.value = "";

        if (!isConfigured()) {
            appendMessage(
                "error",
                "This assistant isn't connected yet — config.js still has placeholder " +
                "values for the Supabase function URL/anon key. Once the Edge Function " +
                "is deployed (see todo.md), fill those in and this will come alive."
            );
            return;
        }

        setBusy(true);
        var typingEl = appendTypingIndicator();

        fetch(config.functionUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + config.anonKey,
                "apikey": config.anonKey
            },
            body: JSON.stringify({
                sessionId: sessionId,
                message: question,
                // Send recent history only — keeps the request small and the
                // server-side context budget predictable.
                history: history.slice(-8, -1)
            })
        })
            .then(function (res) {
                if (!res.ok) {
                    return res.json().catch(function () { return {}; }).then(function (body) {
                        throw new Error(body.error || ("Request failed (" + res.status + ")"));
                    });
                }
                return res.json();
            })
            .then(function (data) {
                typingEl.remove();
                var answer = (data && data.answer) ? data.answer.trim() : "";
                if (!answer) throw new Error("Empty response from assistant.");
                appendMessage("assistant", answer);
                history.push({ role: "assistant", content: answer });
            })
            .catch(function (err) {
                typingEl.remove();
                var message = (err && err.message) ? err.message : "Something went wrong.";
                if (/rate.?limit/i.test(message)) {
                    appendMessage(
                        "error",
                        "You've hit the question limit for now — give it a minute, or just " +
                        "email Tushar directly at chawla.tushar5@gmail.com."
                    );
                } else {
                    appendMessage(
                        "error",
                        "Sorry — I couldn't get an answer just now (" + message + "). " +
                        "Please try again, or email chawla.tushar5@gmail.com directly."
                    );
                }
            })
            .then(function () {
                setBusy(false);
                chatInput.focus();
            });
    }

    chatForm.addEventListener("submit", function (e) {
        e.preventDefault();
        askQuestion(chatInput.value);
    });

    suggestions.addEventListener("click", function (e) {
        var btn = e.target.closest(".im-suggestion");
        if (!btn) return;
        askQuestion(btn.getAttribute("data-question") || btn.textContent);
    });
})();
