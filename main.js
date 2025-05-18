async function sendToGemini(question) {
    try {
      const API_KEY = "AIzaSyCokAdK_MSVEDK6y2dW-6snk6XsnkgeMng";
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  
      const response = await fetch(API_URL, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: question
            }]
          }]
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "Sorry, there was an error processing your request.";
    }
  }
  
  // Menangani form submission
  document.getElementById("aiForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const userInput = document.getElementById("userInput").value;
    const submitButton = document.getElementById("submit");
    const aiOutput = document.getElementById("aiOutput");
    
    if (!userInput.trim()) return;
    
    // Tampilkan loading state
    submitButton.disabled = true;
    submitButton.textContent = "Processing...";
    aiOutput.value = "Thinking...";
    
    try {
      const response = await sendToGemini(userInput);
      aiOutput.value = response;
    } catch (error) {
      aiOutput.value = "Error: " + error.message;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send it!";
    }
  });