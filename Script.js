const micButton = document.getElementById("mic");
const jarvisCore = document.querySelector(".jarvis-core");

function speak(text) {
  speechSynthesis.cancel();

  status.innerText = "🔊 JARVIS is speaking...";

  jarvisCore.classList.add("speaking");

  const voice = new SpeechSynthesisUtterance(text);

  voice.lang = "en-US";
  voice.rate = 1;

  voice.onend = () => {
    jarvisCore.classList.remove("speaking");
    status.innerText = "System Ready";
  };

  speechSynthesis.speak(voice);
}

micButton.addEventListener("click", () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    status.innerText =
      "Voice recognition is not supported.";

    speak(
      "Sorry, voice recognition is not supported."
    );

    return;
  }

  const recognition =
    new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  jarvisCore.classList.add("listening");

  recognition.start();

  recognition.onresult = (event) => {

    const command =
      event.results[0][0]
        .transcript
        .toLowerCase();

    status.innerText =
      "You said: " + command;
jarvisCore.classList.remove("listening");
if (command.includes("jarvis")) {

  speak("Yes, I am listening. How can I help you?");

} else if (command.includes("hello")) {

      speak(
        "Hello. I am Jarvis. How can I help you?"
      );
} else if (command.startsWith("search for")) {

  const search =
    command.replace("search for", "").trim();

  speak("Searching Google for " + search);

  window.open(
    "https://www.google.com/search?q=" +
    encodeURIComponent(search),
    "_blank"
  );

} else if (command.startsWith("search")) {

  const search =
    command.replace("search", "").trim();

  speak("Searching Google for " + search);

  window.open(
    "https://www.google.com/search?q=" +
    encodeURIComponent(search),
    "_blank"
  );

} else if (command.includes("time")) {

      const time =
        new Date().toLocaleTimeString();

      speak(
        "The current time is " + time
      );

    } else if (command.includes("date")) {

      const date =
        new Date().toDateString();

      speak(
        "Today is " + date
      );

    } else if (
      command.includes("who are you")
    ) {

      speak(
        "I am Jarvis, your personal virtual assistant."
      );

    } else if (
      command.includes("how are you")
    ) {

      speak(
        "I am working perfectly."
      );

    } else if (
      command.includes("open google")
    ) {

      speak("Opening Google.");

      window.open(
        "https://www.google.com",
        "_blank"
      );

    } else if (
      command.includes("open youtube")
    ) {

      speak("Opening YouTube.");

      window.open(
        "https://www.youtube.com",
        "_blank"
      );

    } else if (
      command.includes("tell me a joke") ||
      command.includes("joke")
    ) {

      speak(
        "Why did the computer go to the doctor? Because it had a virus."
      );

    } else if (
      command.includes("thank you")
    ) {

      speak(
        "You are welcome. I am always ready to help."
      );

    } else {

      
speak("Let me think about that.");

const voiceMessage = command;

fetch("https://jarvisos-6m2i.onrender.com/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: voiceMessage
  })
})
  .then(async (response) => {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed");
    }

    speak(data.reply);
  })
  .catch(() => {
    speak("Sorry, my AI brain is unavailable right now.");
  });
  
    }
  };

  recognition.onerror = () => {

    status.innerText =
      "Voice recognition failed. Try again.";

  };

});
function updateSystemInfo() {
  const now = new Date();

  document.getElementById("clock").innerText =
    "🕒 " + now.toLocaleTimeString();

  document.getElementById("date").innerText =
    "📅 " + now.toDateString();

  document.getElementById("network").innerText =
    navigator.onLine
      ? "📶 Online"
      : "📵 Offline";
}

updateSystemInfo();

setInterval(updateSystemInfo, 1000);

window.addEventListener(
  "online",
  updateSystemInfo
);

window.addEventListener(
  "offline",
  updateSystemInfo
);

if ("getBattery" in navigator) {

  navigator.getBattery().then(
    function (battery) {

      function updateBattery() {

        const percentage =
          Math.round(
            battery.level * 100
          );

        document
          .getElementById("battery")
          .innerText =
            "🔋 Battery: " +
            percentage +
            "%";
      }

      updateBattery();

      battery.addEventListener(
        "levelchange",
        updateBattery
      );
    }
  );

} else {

  document
    .getElementById("battery")
    .innerText =
      "🔋 Battery information unavailable.";

}
window.addEventListener("load", () => {

  setTimeout(() => {

    speak(
      "Jarvis operating system is online."
    );

  }, 1000);

});
